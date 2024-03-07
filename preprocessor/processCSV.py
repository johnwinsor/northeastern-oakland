#!/usr/bin/env python3

# WEEKLY USAGE: ./processCSV.py AllNewBooks.csv newbooksAll.json > logs/out-yyyymmdd.txt
# Rescan books that were missing covers previously: ./processCSV.py AllNewBooks.csv ../api/static/newbooks.json > logs/out-yyyymmdd.txt
# Rescan all books: ./processCSV.py AllNewBooks.csv rescan.json > logs/out-yyyymmdd.txt
# move the resulting newbooks.json file to api/static overwriting the existing file.

import sys
import os
import operator
import requests
import json
import time
import re
import csv

import env
googleKey = env.googleKey

csvIN = sys.argv[1]
oldJsonFile = sys.argv[2]

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
    

def checkOpenLibImage(isbn):
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
            return data[key]
        else:
            return None
    else:
        return None
    
def titlecase(s):
    return re.sub(
        r"(\S)+((\S)+)?",
        lambda word: word.group(0).capitalize(),
        s)

def getSummary(isbn):
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
        print(googleBook['items'][0]['volumeInfo']['imageLinks'])
        smallThumbnail = googleBook['items'][0]['volumeInfo']['imageLinks']['smallThumbnail']
        googleSmallThumbnail = re.sub("http:", "https:", smallThumbnail)
        print(f"Checking googleSmallThumbnail size {googleSmallThumbnail}")
        googleSmallThumbnailImageSize = getImageSize(googleSmallThumbnail)
        print(f"googleSmallThumbnailImageSize - {googleSmallThumbnailImageSize}")
        
        print(f"Checking for zoomed cover")
        googleBigCover = getGoogleBigCover(googleSmallThumbnail)
        print(f"Checking googleBigCover size from {googleBigCover}")
        googleBigCoverImageSize = getImageSize(googleBigCover)
        print(f"googleBigCoverImageSize - {googleBigCoverImageSize}")
        if int(googleBigCoverImageSize) > 150000:
            print("LARGE GOOGLE PLACEHOLDER IMAGE Found - Falling back to small thumbnail")
            if int(googleSmallThumbnailImageSize) < 15000:
                print("Google SmallThumbnailImageSize image too small")
                return None
            else:
                return googleSmallThumbnail
        elif int(googleBigCoverImageSize) == 9103:
            print("FOUND 'image not available' GOOGLE PLACEHOLDER IMAGE Found - Falling back to small thumbnail")
            if int(googleSmallThumbnailImageSize) < 15000:
                print("Google SmallThumbnailImageSize image too small")
                return None
            else:
                return googleSmallThumbnail
        elif int(googleBigCoverImageSize) < int(googleSmallThumbnailImageSize):
            print("Small Thumbnail larger than Big Cover - Falling back to Small Thumbnail")
            if int(googleSmallThumbnailImageSize) < 15000:
                print("Google SmallThumbnailImageSize image too small")
                return None
            else:
                return googleSmallThumbnail
        else:
            print("Using Zoomed Google Cover")
            if int(googleBigCoverImageSize) < 15000:
                print("Google BigCoverImageSize image too small")
                return None
            else:
                print(f"Returning {googleBigCover}")
                return googleBigCover
    else:
        print("No Google image links found")
        return None
    
def getBooks():
    with open(oldJsonFile) as json_file:
        jsonData = json.load(json_file)
        dataLength = len(jsonData)
        print(f"Found {dataLength} seen records")
        
        csvCount = 0
        dupes = 0
        processed = 0
        newbooks = 0
        seenAdded = 0
        
        print(f"Opening incoming data feed: {csvIN}")
        with open(csvIN, mode='r', encoding='utf-8-sig') as csv_file:
            rows = csv.DictReader(csv_file)
            for row in rows:
                csvCount = csvCount + 1
                book = {}
                missingBook = {}
                
                mmsId = row['MMS Id']
                if any(dictionary.get('mmsId') == mmsId for dictionary in jsonData):
                    dupes += 1
                    continue
                else:
                    print("---------------------------")
                    print(f"{mmsId} NOT FOUND IN DATA - Processing title...")
                    processed += 1
                
                time.sleep(1)
                
                book['mmsId'] = mmsId
                
                isbn = row['ISBN13']
                book['isbn'] = isbn
                
                # isbns = row['ISBN']
                # match = re.match(r'.*(9\d{12})', isbns)
                # isbn = match.groups()[0]
                # print(isbn)
                # book['isbn'] = isbn
                
                title = row['Title']
                title = titlecase(title)
                title = re.sub("\/", "", title)
                print(title)
                book['title'] = title
                
                if(len(row['Author']) == 0):
                    if(len(row['Author (contributor)']) == 0):
                        author = ""
                    else:
                        author = row['Author (contributor)']
                else:
                    author = row['Author']
                book['author'] = author
                
                receivingStatus = row['Receiving Status']
                book['receivingStatus'] = receivingStatus
                
                receivingDate = row['Receiving Date (Latest in POL)']
                book['receivingDate'] = receivingDate
                
                creationDate = row['PO Line Creation Date']
                book['recDate'] = creationDate
                
                activationDate = row['Portfolio Activation Date']
                book['activationDate'] = activationDate
                
                campus = row['Campus Name']
                book['campus'] = campus
                
                library = row['Library Name']
                book['library'] = library
                
                location = row['Location Name']
                book['location'] = location
                
                callno = row['Permanent Call Number']
                book['callNo'] = callno
                
                subject = row['Reporting Code - 1st']
                book['subject'] = subject
                
                format = row['Format']
                book['format'] = format
                
                print("Getting book summary Google books API metadata...")
                googleBook = getSummary(isbn)

                try:
                    if 'description' in googleBook['items'][0]['volumeInfo']:
                        summary = googleBook['items'][0]['volumeInfo']['description']
                        print("Found Google book summary")
                        book['summary'] = summary
                    else:
                        print("No Google book summary available")
                        book['summary'] = "No summary."
                except:
                    print("Error encountered parsing Google Metadata")
                    print(json.dumps(googleBook, indent=4))
                    missingBook['mmsId'] = mmsId
                    print(f"NO METADATA - Adding {missingBook} to seen books")
                    jsonData.append(missingBook)
                    seenAdded += 1
                    continue
                
                print(f"Checking Open Library cover API for {isbn}")
                hasOpenLibrary = checkOpenLibImage(isbn)
                
                if hasOpenLibrary:
                    if 'thumbnail_url' in hasOpenLibrary:
                        coverurl = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
                        imagesize = getImageSize(coverurl)
                        if imagesize:
                            print(f"Using OpenLibrary Cover: {coverurl}")
                            book['coverurl'] = coverurl
                        else:
                            print(f"Open library cover too small - Checking Google Books...")
                            googleCover = getGoogleCover(googleBook)
                            print(f"267 - {googleCover}")
                            if googleCover is None:
                                print(f"No Google cover - Skipping title")
                                missingBook['mmsId'] = mmsId
                                print(missingBook)
                                jsonData.append(missingBook)
                                seenAdded += 1
                                continue
                            else:
                                print(f"Using Google Cover: {googleCover}")
                                book['coverurl'] = googleCover
                    else:
                        print("NO OPEN LIBRARY COVER - Checking Google Books...")
                        googleCover = getGoogleCover(googleBook)
                        print(f"277 - {googleCover}")
                        if googleCover is None:
                            print(f"No Google cover - Skipping title")
                            missingBook['mmsId'] = mmsId
                            print(missingBook)
                            jsonData.append(missingBook)
                            seenAdded += 1
                            continue
                        else:
                            print(f"Using Google Cover: {googleCover}")
                            book['coverurl'] = googleCover
                else:
                    print("NO OPEN LIBRARY METADATA - Checking Google Books...")
                    googleCover = getGoogleCover(googleBook)
                    print(f"291 - {googleCover}")
                    if googleCover is None:
                        print(f"No Google cover - Skipping title")
                        missingBook['mmsId'] = mmsId
                        print(missingBook)
                        jsonData.append(missingBook)
                        seenAdded += 1
                        continue
                    else:
                        print(f"Using Google Cover: {googleCover}")
                        book['coverurl'] = googleCover
                print("Adding book to data file...")
                jsonData.append(book)
                newbooks += 1
            
        return jsonData, csvCount, dupes, dataLength, processed, newbooks, seenAdded
    
newJsonOut, csvCount, dupes, dataLength, processed, newbooks, seenAdded = getBooks()

print("---------------------------")
print("----------FINISHED---------")
print("---------------------------")
print(f"Size of incoming data feed ({csvIN}): {csvCount}")
print(f"Size of comparison file ({oldJsonFile}): {dataLength}")
print(f"Found {dupes} book(s) already in {oldJsonFile}.")
print(f"Processed {processed} unseen books in new data feed.")
print(f"Added {newbooks} covers to live data.")
print(f"Added {seenAdded} partial records (MmsIDs) to seen data.")

print("---------------------------")
print(f"Writing seen data amd filtered live data to new JSON files...")

sortedNewJsonOut = sorted(newJsonOut, key=operator.itemgetter('mmsId'), reverse=True)
filteredNewJsonOut = [book for book in sortedNewJsonOut if len(book) > 1]

with open('newbooksAll.json', "w") as j:
    json.dump(sortedNewJsonOut, j, indent=4)
    print("newbooksAll.json written")
    
# with open('../api/static/newbooks.json', "w") as j:
#     json.dump(filteredNewJsonOut, j, indent=4)

with open('newbooks.json', "w") as j:
    json.dump(filteredNewJsonOut, j, indent=4)
    print("newbooks.json written")

print('DONE')
