#!/usr/bin/env python3

import sys
import requests
import json
import time
import xmltodict
import operator
import re
import env

googleKey = env.googleKey
almaKey = env.almaKey
records = sys.argv[1]

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
    print(f"Checking cover image URL: {coverurl}")
    try:
        coverurlResponse = requests.get(coverurl, allow_redirects=True)

        if coverurlResponse.history:
            final_redirect = coverurlResponse.history[-1]
            final_headers = final_redirect.headers
            imageURL = final_headers["location"]
            imageURLResponse = requests.get(imageURL, stream=True)
            raw_content = imageURLResponse.raw.read()
            image_size = len(raw_content)
            print(f"IMAGE-SIZE(OL): {image_size}")
        else:
            image_size = coverurlResponse.headers.get("Content-Length")
            print(f"IMAGE-SIZE(Google): {image_size}")
            if image_size is None:
                imageURLResponse = requests.get(imageURL, stream=True)
                raw_content = imageURLResponse.raw.read()
                image_size = len(raw_content)
                print(f"IMAGE-SIZE(none): {image_size}")
        return image_size
    except:
        print(f"ERROR getting Cover image size: {coverurl}")
        return None

def checkOpenLibraryCover(isbn):
    openLibMetadataUrl = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json"
    print(f"Getting response from {openLibMetadataUrl}")
    try: 
        response = requests.get(openLibMetadataUrl)
        response.raise_for_status()
    except requests.exceptions.HTTPError as errh: 
        print("HTTP Error") 
        print(errh.args[0]) 
    except requests.exceptions.ReadTimeout as errrt: 
        print("Time out") 
    except requests.exceptions.ConnectionError as conerr: 
        print("Connection error") 
    except requests.exceptions.RequestException as errex: 
        print("Exception request") 
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
    print(f"Getting response from {googleUrl}")
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
    if 'imageLinks' in googleBook['items'][0]['volumeInfo']:
        smallThumbnail = googleBook['items'][0]['volumeInfo']['imageLinks']['smallThumbnail']
        googleSmallThumbnail = re.sub("http:", "https:", smallThumbnail)
        googleSmallThumbnailImageSize = getImageSize(googleSmallThumbnail)
        if int(googleSmallThumbnailImageSize) == 246264:
            return None
        if int(googleSmallThumbnailImageSize) > 10000:
            return (googleSmallThumbnail, googleSmallThumbnailImageSize)
        else:
            googleBigCover = getGoogleBigCover(googleSmallThumbnail)
            googleBigCoverImageSize = getImageSize(googleBigCover)
            if int(googleBigCoverImageSize) == 246264:
                return None
            if int(googleBigCoverImageSize) > 10000:
                return (googleBigCover, googleBigCoverImageSize)
            else:
                return None
    else:
        print("No Google image links found")
        return None

def getAnalyticsJson():
# <sawx:expr xsi:type="sawx:comparison" op="greater"
#     xmlns:saw="com.siebel.analytics.web/report/v1.1" 
#     xmlns:sawx="com.siebel.analytics.web/expression/v1.1" 
#     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
#     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
# >
#     <sawx:expr xsi:type="sawx:sqlExpression">"Funds Expenditure"."MMS Id"</sawx:expr>
#     <sawx:expr xsi:type="xsd:string">9952423549901401</sawx:expr>
# </sawx:expr>

    lastRecord = "9952428352701401"

    # Process Delta
    almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooksApp&limit={records}&apikey={almaKey}&filter=%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Acomparison%22%20op%3D%22greater%22%0A%20%20%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Funds%20Expenditure%22.%22MMS%20Id%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3E{lastRecord}%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E"
    
    # Process Full Dataset
    # almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooksApp&limit={records}&apikey={almaKey}"
    booksJson = []
    IsFinished = False
    while not IsFinished:
        print(f"Getting {almaUrl}")
        response = requests.get(almaUrl)
        if response.status_code == 200:
            my_dict = xmltodict.parse(response.content)
            try:
                rows = my_dict['report']['QueryResult']['ResultXml']['rowset']['Row']
                if not isinstance(rows, list):
                    # raise ValueError("Expected a list of dictionaries")
                    rows = [rows]
                for row in rows:
                    book = {}
                    book['mmsId'] = row['Column12']
                    if row['Column17'] != "0000-00-00":
                        sortDate = row['Column17']
                    else:
                        sortDate = row['Column15']
                    book['SortDate'] = sortDate
                    book['AcquisitionMethodDescription'] = row['Column1']
                    book['AcquisitionMethod'] = row['Column2']
                    book['AuthorContributor'] = row['Column3']
                    book['Author'] = row['Column4']
                    book['FiscalPeriodDescription'] = row['Column5']
                    book['Format'] = row['Column6']
                    book['FundCode'] = row['Column7']
                    book['FundName'] = row['Column8']
                    book['FundType'] = row['Column9']
                    
                    isbns = row['Column10']
                    isbn13 = getIsbn13(isbns)
                    book['isbn13'] = isbn13
                    
                    book['ISBNS'] = row['Column10']
                    book['MaterialType'] = row['Column11']
                    book['ParentFundName'] = row['Column13']
                    book['POLineCreationDateFilter'] = row['Column14']
                    book['POLineCreationDate'] = row['Column15']
                    book['POLineTypeName'] = row['Column16']
                    book['ReceivingDate'] = row['Column17']
                    book['ReceivingStatus'] = row['Column18']
                    book['ReportingCode'] = row['Column19']
                    book['SourceType'] = row['Column20']
                    book['StatusActive'] = row['Column21']
                    book['Status'] = row['Column22']
                    title = titlecase(row['Column23'])
                    book['Title'] = title
                    book['VendorName'] = row['Column24']
                    book['CampusName'] = row['Column25']
                    book['LibraryName'] = row['Column26']
                    book['LocationCode'] = row['Column27']
                    book['LocationName'] = row['Column28']
                    book['PermanentCallNumber'] = row['Column29']
                    booksJson.append(book)
            except KeyError:
                print("No new records")
            Finished = my_dict['report']['QueryResult']['IsFinished']
            if(Finished == "true"):
                IsFinished = True
            print(f"Finished: {IsFinished}")
            try:
                ResumptionToken = my_dict['report']['QueryResult']['ResumptionToken']
            except:
                print(f"Using existing resumption token: {ResumptionToken}")
            almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?token={ResumptionToken}&limit=25&apikey=l8xx5852c9867ab64264901d17af13574837"
    return booksJson
            
def main():
    analyticsJson = getAnalyticsJson()
    dataLength = len(analyticsJson)
    print(f"Found {dataLength} records in Analytics report")
    newBooks = []
    counter = 1
    hits = 0
    misses = 0
    for book in analyticsJson:
        print("------------------------------------")
        print(counter)
        counter+=1
        if book['isbn13']:
            print(book['isbn13'])
            print(book['Title'])
            time.sleep(1)
            googleBook = getGoogleBook(book['isbn13'])
            if 'items' in googleBook:
                if 'description' in googleBook['items'][0]['volumeInfo']:
                    summary = googleBook['items'][0]['volumeInfo']['description']
                    print("Found Google book summary")
                    book['summary'] = summary
                else:
                    print("No Google book summary available")
                    book['summary'] = "No summary."
                if 'imageLinks' in googleBook['items'][0]['volumeInfo']:
                    googleCover = getGoogleCover(googleBook)
                    if googleCover:
                        print(f"Using Google book cover: {googleCover}")
                        book['coverurl'] = googleCover
                    else:
                        print(f"No suitable Google book cover found")
                        openLibraryCover = checkOpenLibraryCover(book['isbn13'])
                        if openLibraryCover:
                            print(f"Using Open Library book cover: {openLibraryCover}")
                            book['coverurl'] = openLibraryCover
                        else:
                            print("No suitable Open Library book cover found")
                            print("Skipping title")
                            missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99'}
                            newBooks.append(missingbook)
                            misses += 1
                            continue      
                else:
                    print(f"No Google image links found")
                    openLibraryCover = checkOpenLibraryCover(book['isbn13'])
                    if openLibraryCover:
                        print(f"Using Open Library book cover: {openLibraryCover}")
                        book['coverurl'] = openLibraryCover
                    else:
                        print(f"No suitable Open Library book cover found")
                        print("Skipping title")
                        missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99'}
                        newBooks.append(missingbook)
                        misses += 1
                        continue
                hits += 1
                newBooks.append(book)
            else:
                print('NO GOOGLE METADATA')
                print("Skipping title")
                missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99'}
                newBooks.append(missingbook)
                misses += 1
                continue
        else:
            print("No ISBN13")
            print(book['Title'])
            missingbook = {'mmsId': book['mmsId'], 'isbn13': book['isbn13'], 'SortDate': '9999-99-99'}
            newBooks.append(missingbook)
            misses += 1
            print("Skipping title")
    
    cleanNewBooks = replace_null_with_empty_string(newBooks)
    filteredBooks = [d for d in cleanNewBooks if d['SortDate'] != '0000-00-00'] 
    sortedNewBooks = sorted(filteredBooks, key=operator.itemgetter('SortDate'), reverse=True)
    with open('newbooks.json', "w") as j:
        json.dump(sortedNewBooks, j, indent=4)
    print("------------------------------------")
    print("newbooks.json written")
    print(f"Matched {hits} titles with usable covers")
    print(f"Unable to match {misses} titles with usable covers")
    

if __name__ == "__main__":
    main()