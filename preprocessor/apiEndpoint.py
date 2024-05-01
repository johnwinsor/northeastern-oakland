#!/usr/bin/env python3

import sys
import requests
import json
import time
import xmltodict
import operator
import re
import env
from pathlib import Path
import logging
from datetime import datetime
from tqdm import tqdm
from time import sleep

now = datetime.now()
logging.basicConfig(filename='logs/api.log', filemode='a', format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S', level=logging.INFO)
logging.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
logging.info(f"START OF LOG FOR {now}")
logging.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

googleKey = env.googleKey
almaKey = env.almaKey
# records = sys.argv[1]
records = 25
    

def replace_null_with_empty_string(obj):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if value is None:
                obj[key] = ""
            else:
                replace_null_with_empty_string(value)
    elif isinstance(obj, list):
        for item in obj:
            replace_null_with_empty_string(item)
    return obj

def getIsbn13(isbns):
    try:
        match = re.match(r'.*(9\d{12})', isbns)
        isbn13 = match.groups()[0]
    except:
        isbn13 = None
        
    return isbn13
    

def titlecase(s):
    return re.sub(
        r"(\S)+((\S)+)?",
        lambda word: word.group(0).capitalize(),
        s)

def getImageSize(coverurl):
    logging.info(f"Checking cover image URL: {coverurl}")
    try:
        coverurlResponse = requests.get(coverurl, allow_redirects=True)

        if coverurlResponse.history:
            final_redirect = coverurlResponse.history[-1]
            final_headers = final_redirect.headers
            imageURL = final_headers["location"]
            imageURLResponse = requests.get(imageURL, stream=True)
            raw_content = imageURLResponse.raw.read()
            image_size = len(raw_content)
            logging.info(f"IMAGE-SIZE(OL): {image_size}")
        else:
            image_size = coverurlResponse.headers.get("Content-Length")
            logging.info(f"IMAGE-SIZE(Google): {image_size}")
            if image_size is None:
                imageURLResponse = requests.get(imageURL, stream=True)
                raw_content = imageURLResponse.raw.read()
                image_size = len(raw_content)
                logging.info(f"IMAGE-SIZE(none): {image_size}")
        return image_size
    except:
        logging.info(f"ERROR getting Cover image size: {coverurl}")
        return None

def checkOpenLibraryCover(isbn):
    openLibMetadataUrl = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json"
    logging.info(f"Getting response from {openLibMetadataUrl}")
    try: 
        response = requests.get(openLibMetadataUrl)
        response.raise_for_status()
    except requests.exceptions.HTTPError as errh: 
        logging.info("HTTP Error") 
        logging.info(errh.args[0]) 
    except requests.exceptions.ReadTimeout as errrt: 
        logging.info("Time out") 
    except requests.exceptions.ConnectionError as conerr: 
        logging.info("Connection error") 
    except requests.exceptions.RequestException as errex: 
        logging.info("Exception request") 
    if response.status_code == 200:
        data = response.json()
        key = f"ISBN:{isbn}"
        if key in data:
            coverurl = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
            imageSize = getImageSize(coverurl)
            if imageSize:
                if int(imageSize) > 10000:
                    return (coverurl, imageSize)
                else:
                    return None
            else:
                return None
        else:
            return None
    else:
        return None

def getGoogleBook(isbn):
    # googleUrl = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}&key={googleKey}"
    googleUrl = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}"
    logging.info(f"Getting response from {googleUrl}")
    response = requests.get(googleUrl)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return None

def getGoogleBigCover(url):
    zoomed = re.sub("zoom=5", "zoom=10", url)
    uncurled = re.sub("&edge=curl", "", zoomed)
    https = re.sub("http:", "https:", uncurled)
    return https

def getGoogleCover(googleBook):
    googleItem = googleBook['items'][0]
    if 'imageLinks' in googleItem['volumeInfo']:
        smallThumbnail = googleItem['volumeInfo']['imageLinks']['smallThumbnail']
        googleSmallThumbnail = re.sub("http:", "https:", smallThumbnail)
        googleSmallThumbnailImageSize = getImageSize(googleSmallThumbnail)
        logging.info(f"Getting Google Small Thumbnail book cover...")
        if int(googleSmallThumbnailImageSize) == 246264:
            logging.info(f"Found UNUSABLE image for {googleSmallThumbnail}")
            return None
        if int(googleSmallThumbnailImageSize) > 10000:
            logging.info(f"Found Usable Google Small Thumbnail book cover")
            return (googleSmallThumbnail, googleSmallThumbnailImageSize)
        else:
            logging.info(f"Trying Zoomed Google book cover...")
            googleBigCover = getGoogleBigCover(googleSmallThumbnail)
            googleBigCoverImageSize = getImageSize(googleBigCover)
            if int(googleBigCoverImageSize) == 246264:
                logging.info(f"Found UNUSABLE image for {googleSmallThumbnail}")
                return None
            if int(googleBigCoverImageSize) > 10000:
                logging.info(f"Found Usable Google Zoomed Thumbnail book cover")
                return (googleBigCover, googleBigCoverImageSize)
            else:
                return None
    else:
        logging.info("No Google image links found")
        return None

def mapRow(row):
    book = {}
    book['POL'] = row['Column15']
    book['mmsId'] = row['Column13']
    if row['Column9'] == "E":
        sortDate = row['Column14']
    else:
        sortDate = row['Column18']
    book['SortDate'] = sortDate
    book['AccessModel'] = row['Column1']
    book['AcquisitionMethod'] = row['Column6']
    book['AuthorContributor'] = row['Column7']
    book['Author'] = row['Column8']
    book['Format'] = row['Column9']
    
    isbns = row['Column10']
    isbn13 = getIsbn13(isbns)
    book['isbn13'] = isbn13
    
    book['ISBNS'] = row['Column10']
    book['MaterialType'] = row['Column12']
    book['POLineTypeName'] = row['Column17']
    book['ReceivingDate'] = row['Column18']
    book['PortfolioActivationDate'] = row['Column4']
    book['ExpPortfolioActivationDate'] = row['Column5']
    book['ReportingCode'] = row['Column20']
    title = titlecase(row['Column22'])
    book['Title'] = title
    POtitle = titlecase(row['Column16'])
    book['POtitle'] = POtitle
    book['VendorName'] = row['Column23']
    book['LibraryName'] = row['Column11']
    book['Description'] = row['Column25']
    book['LocationName'] = row['Column26']
    book['TemporaryLocationName'] = row['Column29']
    book['PermanentCallNumber'] = row['Column27']
    book['TitleCreationDate'] = row['Column14']
    book['Barcode'] = row['Column24']
    book['PhysicalItemId'] = row['Column28']
    return book

def getAnalyticsJson(latestPOL):
    # Process Delta
    almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FAcq-Analysis&limit={records}&apikey={almaKey}&filter=%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Acomparison%22%20op%3D%22greater%22%0A%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Funds%20Expenditure%22.%22PO%20Line%20Reference%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3E{latestPOL}%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E"
    
    # Process Full Dataset
    # almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FAcq-Analysis&limit={records}&apikey={almaKey}"
    print(f"Getting Analytics Report Data after {latestPOL}...")
    booksJson = []
    IsFinished = False
    while not IsFinished:
        response = requests.get(almaUrl)
        if response.status_code == 200:
            my_dict = xmltodict.parse(response.content)
            try:
                rows = my_dict['report']['QueryResult']['ResultXml']['rowset']['Row']
            except KeyError:
                print("No new records")
                return booksJson
            if not isinstance(rows, list):
                rows = [rows]
            for row in rows:
                book = mapRow(row)
                booksJson.append(book)
            Finished = my_dict['report']['QueryResult']['IsFinished']
            if(Finished == "true"):
                IsFinished = True
                print("Finished getting Analytics data")
                print("-------------------------------")
            else:
                try:
                    ResumptionToken = my_dict['report']['QueryResult']['ResumptionToken']
                    print(f"Found resumption token. Paginating API...")
                except:
                    print(f"Paginating API...")
                almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?token={ResumptionToken}&limit=25&apikey=l8xx5852c9867ab64264901d17af13574837"
        else:
            print(f"ERROR GETTING ANALYTICS API - {almaUrl}")
    return booksJson
            
def main():
    print("getting Latest POL processed...")
    f = open("lastRecord.txt", "r")
    latestPOL = f.read()
    print(f"Latest POL: {latestPOL}")
    
    analyticsJson = getAnalyticsJson(latestPOL)
    if analyticsJson:
        newLatestPOL = analyticsJson[0]['POL']
    else:
        newLatestPOL = latestPOL
    
    print(f"Number of Books to Process before unreceived books added: {len(analyticsJson)}")
    
    print(f"Refreshing Analytics Report Data for unreceived books...")
    with open('notReceivedBooks.json', 'r') as NotReceivedBooksJson:
        notReceivedBooks = json.load(NotReceivedBooksJson)
    pols = []
    for b in notReceivedBooks:
        if (datetime.strptime(b['TitleCreationDate'], '%Y-%m-%d') > datetime.strptime('2024-02-01', '%Y-%m-%d')):
            pols.append(b['POL'])
    pols.sort()
    print(f"Found {len(pols)} recently ordered unreceived books. Checking if they have been received...")
    lowestUnreceivedPOL = pols[0]
    
    unreceivedJson = getAnalyticsJson(lowestUnreceivedPOL)
    
    print("adding newly received books to analyticsJson")
    if unreceivedJson:
        newReceivedCount = 0
        for book in unreceivedJson:
            if book['POL'] in pols:
                if book['SortDate'] != '0000-00-00':
                    analyticsJson.append(book)
                    newReceivedCount += 1
                else:
                    newNotReceivedBooks = [i for i in notReceivedBooks if not (i['POL'] == book['POL'])]
                    newNotReceivedBooksCount = len(newNotReceivedBooks)
        print(f"Found {newReceivedCount} newly received books to add to analyticsJson")
        print(f"Writing {newNotReceivedBooksCount} Unreceived Books back to notReceivedBooks.json...")
        with open('notReceivedBooks.json', "w") as f:
            json.dump(newNotReceivedBooks, f, indent=4)
            
    else:
        print("No unreceived books found")
    print(f"Number of Books to Process after unreceived books added: {len(analyticsJson)}")

    if analyticsJson:
        analyticsDataLength = len(analyticsJson)
        print(f"Attempting to match {analyticsDataLength} new titles from Analytics report with enhanced metadata.")
        newBooks = []
        counter = 0
        hits = 0
        misses = 0
        dupes = 0
        nr = 0
        
        print(f"Opening Existing Dataset...")
        with open('../api/static/newbooks.json', 'r') as seenBooksJson:
            seenBooks = json.load(seenBooksJson)
            
        seenDataCount = len(seenBooks)
        print(f"Existing Dataset has {seenDataCount} enhanced records")
        
        with open('notReceivedBooks.json', 'r') as startNotReceivedBooksJson:
            startNotReceivedBooks = json.load(startNotReceivedBooksJson)
        startNotReceivedBooksCount = len(startNotReceivedBooks)
            
        with open('missingCovers.json', 'r') as startMissingCoversJson:
            startMissingCovers = json.load(startMissingCoversJson)
        startMissingCoversCount = len(startMissingCovers)
        
        print("Starting matching process...")
        for book in tqdm(analyticsJson):
            sleep(0.5)
            counter+=1
            logging.warning("------------------------------------------------------------")
            logging.critical(counter)
            pol = book['POL']
            logging.info(pol)
            logging.info(book['Title'])
            if any(d.get('POL') == pol for d in seenBooks):
                logging.info("FOUND BOOK in SEEN DATA")
                dupes += 1
                startNotReceivedBooks = [i for i in startNotReceivedBooks if not (i['POL'] == book['POL'])]
                continue
            if book['SortDate'] == '0000-00-00':
                logging.info("BOOK NOT YET RECEIVED")
                nr += 1
                if any(d.get('POL') == pol for d in startNotReceivedBooks):
                    logging.info("BOOK ALREADY IN NOT RECEIVED FILE")
                else:
                    logging.info("APPENDING BOOK TO NOT RECEIVED FILE")
                    startNotReceivedBooks.append(book)
                continue
            try:
                isbn13 = book['isbn13']
                logging.info(isbn13)
                googleBook = getGoogleBook(book['isbn13'])
                try:
                    googleItem = googleBook['items'][0]
                    if 'description' in googleItem['volumeInfo']:
                        summary = googleItem['volumeInfo']['description']
                        logging.info("Found Google book summary")
                        book['summary'] = summary
                    else:
                        logging.info("No Google book summary available")
                        book['summary'] = "No summary."
                    if 'imageLinks' in googleItem['volumeInfo']:
                        googleCover = getGoogleCover(googleBook)
                        if googleCover:
                            logging.info(f"Using Google book cover: {googleCover}")
                            book['coverurl'] = googleCover
                        else:
                            logging.info(f"No suitable Google book cover found")
                            openLibraryCover = checkOpenLibraryCover(book['isbn13'])
                            if openLibraryCover:
                                logging.info(f"Using Open Library book cover: {openLibraryCover}")
                                book['coverurl'] = openLibraryCover
                            else:
                                logging.info("No suitable Open Library book cover found")
                                logging.info("Skipping title")
                                # missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99', 'error': 'No suitable book cover found'}
                                if any(d.get('POL') == pol for d in startMissingCovers):
                                    logging.info("BOOK ALREADY IN NOT MISSING COVERS FILE")
                                else:
                                    logging.info("ADDING BOOK MISSING COVERS FILE")
                                    startMissingCovers.append(book)
                                misses += 1
                                continue      
                    else:
                        logging.info(f"No Google image links found")
                        openLibraryCover = checkOpenLibraryCover(book['isbn13'])
                        if openLibraryCover:
                            logging.info(f"Using Open Library book cover: {openLibraryCover}")
                            book['coverurl'] = openLibraryCover
                        else:
                            logging.info(f"No suitable Open Library book cover found")
                            logging.info("Skipping title")
                            # missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99', 'error': 'No suitable book cover found'}
                            if any(d.get('POL') == pol for d in startMissingCovers):
                                logging.info("BOOK ALREADY IN NOT MISSING COVERS FILE")
                            else:
                                logging.info("ADDING BOOK MISSING COVERS FILE")
                                startMissingCovers.append(book)
                            misses += 1
                            continue
                    hits += 1
                    newBooks.append(book)
                except:
                    logging.info('NO GOOGLE METADATA')
                    logging.info("Skipping title")
                    # missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99', 'error': 'NO GOOGLE METADATA'}
                    if any(d.get('POL') == pol for d in startMissingCovers):
                        logging.info("BOOK ALREADY IN NOT MISSING COVERS FILE")
                    else:
                        logging.info("ADDING BOOK MISSING COVERS FILE")
                        startMissingCovers.append(book)
                    misses += 1
                    continue
            except:
                logging.info("No ISBN13")
                # missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99', 'error': 'No ISBN13'}
                if any(d.get('POL') == pol for d in startMissingCovers):
                    logging.info("BOOK ALREADY IN NOT MISSING COVERS FILE")
                else:
                    logging.info("ADDING BOOK TO MISSING COVERS FILE")
                    startMissingCovers.append(book)
                misses += 1
                logging.info("Skipping title")

        cleanNewBooks = replace_null_with_empty_string(newBooks)
        newBooksCount = len(newBooks)
        
        print(f"Found {dupes} titles already in Dataset...")
        print(f"Matched {newBooksCount} titles with usable covers. Appending to Dataset...")
        
        for b in cleanNewBooks:
            seenBooks.append(b)
            
        print(f"Sorting Dataset...")
        sortedSeenBooks = sorted(seenBooks, key=operator.itemgetter('SortDate'), reverse=True)
        sortedSeenBooksCount = len(sortedSeenBooks)
        
        print(f"New Dataset size: {sortedSeenBooksCount}")

        print(f"Writing New Dataset to tempNewbooks.json...")
        with open('newbooksTemp.json', "w") as nb:
            json.dump(sortedSeenBooks, nb, indent=4)
        
        sortedNewBooks = sorted(cleanNewBooks, key=operator.itemgetter('SortDate'), reverse=True)
        sortedNewBooksCount = len(sortedNewBooks)
        
        logging.info(f"Writing {newBooksCount} New Books Matched to newFoundBooks.json...")
        with open('newFoundBooks.json', "w") as f:
            json.dump(sortedNewBooks, f, indent=4)
        
        endMissingCoversCount = len(startMissingCovers)
        print(f"Writing {endMissingCoversCount} Unmatched Books to missingCovers.json...")
        with open('missingCovers.json', "w") as f:
            json.dump(startMissingCovers, f, indent=4)
        print(f"Titles in missingCovers.json changed from {startMissingCoversCount} to {endMissingCoversCount}")
            
        endNotReceivedBooksCount = len(startNotReceivedBooks)
        print(f"Writing {endNotReceivedBooksCount} Non-Received Books to notReceivedBooks.json...")
        with open('notReceivedBooks.json', "w") as f:
            json.dump(startNotReceivedBooks, f, indent=4)
        print(f"Titles in notReceivedBooks.json changed from {startNotReceivedBooksCount} to {endNotReceivedBooksCount}")
        
        
        logging.info("------------------------------------")
        logging.info(f"Found {dupes} titles in existing dataset")
        logging.info(f"Matched {sortedNewBooksCount} titles with usable covers. Adding to Dataset and writing to newbooks.json.")
        logging.info(f"New Dataset size: {sortedSeenBooksCount}")
        logging.info(f"{nr} titles not yet received and skipped")
        logging.info(f"Unable to match {misses} titles with usable covers")
            
        print(f"Moving new dataset to API directory...")
        currentPath = Path.cwd()
        source = currentPath / f"newbooksTemp.json"
        dest = currentPath.parent / f"api/static/"
        oldfile = dest / f"newbooks.json"
        oldfile.replace(f"{dest}/newbooks.json.bak")
        source.replace(f"{dest}/newbooks.json")
        print(f"Last POL Processed: {newLatestPOL}. Writing to lastRecord.txt")
        
        f = open("lastRecord.txt", "w")
        f.write(newLatestPOL)
        f.close()
        print("DONE")
    else:
        print("DONE")

if __name__ == "__main__":
    main()