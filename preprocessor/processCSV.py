#!/usr/bin/env python3

# USAGE: ./processCSV.py AllNewBooks.csv ../api/static/newbooks.json

import sys
import os
import requests
import json
import time
import re
import csv

import env
googleKey = env.googleKey

csvIN = sys.argv[1]
jsonOUT = sys.argv[2]

print(f"Writing data to {jsonOUT}")

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
    response = requests.get(openLibMetadataUrl)
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
        r"[A-Za-z]+('[A-Za-z]+)?",
        lambda word: word.group(0).capitalize(),
        s)

def getSummary(isbn):
    googleUrl = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}&key={googleKey}"
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
        print(f"Checking googleSmallThumbnail size {googleSmallThumbnail}")
        # googleSmallThumbnailResponse = requests.get(googleSmallThumbnail, allow_redirects=True)
        # googleSmallThumbnailImageSize = googleSmallThumbnailResponse.headers.get("Content-Length")
        googleSmallThumbnailImageSize = getImageSize(googleSmallThumbnail)
        print(f"googleSmallThumbnailImageSize - {googleSmallThumbnailImageSize}")
        
        print(f"Checking for zoomed cover")
        googleBigCover = getGoogleBigCover(googleSmallThumbnail)
        print(f"Checking googleBigCover size from {googleBigCover}")
        # googleBigCoverResponse = requests.get(googleBigCover, allow_redirects=True)
        # googleBigCoverImageSize = googleBigCoverResponse.headers.get("Content-Length")
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
                return googleBigCover
    else:
        print("No Google image links found")
        return None
    
def getBooks():
    print("Opening current data file...")
    
    with open(jsonOUT) as json_file:
        jsonData = json.load(json_file)
        dataLength = len(jsonData)
        print(f"Found {dataLength} existing records")
        
        newCount = 0
        existingCount = 0
        
        with open(csvIN, mode='r', encoding='utf-8-sig') as csv_file:
            rows = csv.DictReader(csv_file)
            for row in rows:
                print("---------------------------")
                print(row)
                time.sleep(1)
                book = {}
                
                mmsId = row['MMS Id']
                if any(dictionary.get('mmsId') == mmsId for dictionary in jsonData):
                    print(f"{mmsId } FOUND IN DATA - SKIPPING TITLE")
                    existingCount += 1
                    continue
                else:
                    print(f"{mmsId} NOT FOUND IN DATA")
                
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
                
                if 'Author' in row:
                    author = row['Author']
                    author = titlecase(author)
                else:
                    author = ""
                book['author'] = author
                
                recStatus = row['Receiving Status']
                book['recStatus'] = recStatus
                
                creationDate = row['PO Line Creation Date']
                book['recDate'] = creationDate
                
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
                            print(f"Open library cover too small")
                            continue
                    else:
                        print("NO OPEN LIBRARY COVER - Checking Google Books...")
                        googleCover = getGoogleCover(googleBook)
                        if googleCover is None:
                            print(f"No Google cover - Skipping title")
                            continue
                        else:
                            print(f"Using Google Cover: {googleCover}")
                            book['coverurl'] = googleCover
                else:
                    print("NO OPEN LIBRARY METADATA - Checking Google Books...")
                    googleCover = getGoogleCover(googleBook)
                    if googleCover is None:
                        print(f"No Google cover - Skipping title")
                        continue
                    else:
                        print(f"Using Google Cover: {googleCover}")
                        book['coverurl'] = googleCover
                print("Adding book to data file...")
                jsonData.append(book)
                newCount = newCount + 1
            
        return jsonData, newCount, existingCount, dataLength
    
jsonOut, count, existingCount, dataLength = getBooks()

print("---------------------------")
print("---------------------------")
print(f"Initial size of {jsonOUT}: {dataLength}")
print(f"Found {existingCount} book(s) already in {jsonOUT}.")
print(f"Appending {count} new book(s) to {jsonOUT}.")
newCount = dataLength + count
print(f"New size of {jsonOUT}: {newCount}")

print(f"Writing to new JSON file")
with open(jsonOUT, "w") as j:
    json.dump(jsonOut, j, indent=4)

print("---------------------------")
print('DONE')
