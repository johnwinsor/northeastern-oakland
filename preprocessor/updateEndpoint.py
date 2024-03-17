#!/usr/bin/env python3

import sys
import requests
import json
import time
import xmltodict
import pprint
import operator
import re
import env

googleKey = env.googleKey
almaKey = env.almaKey
records = sys.argv[1]

def getIsbn13(isbns):
    try:
        match = re.match(r'.*(9\d{12})', isbns)
        isbn13 = match.groups()[0]
    except:
        isbn13 = ''
        
    return isbn13
    

def titlecase(s):
    return re.sub(
        r"(\S)+((\S)+)?",
        lambda word: word.group(0).capitalize(),
        s)

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

def getAnalyticsJson():
    booksJson = []
    almaUrl = f"https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooksApp&limit={records}&apikey={almaKey}"
    print(almaUrl)
    response = requests.get(almaUrl)
    if response.status_code == 200:
        my_dict = xmltodict.parse(response.content)
        rows = my_dict['report']['QueryResult']['ResultXml']['rowset']['Row']
        for row in rows:
            book = {}
            book['PortfolioActivationDate'] = row['Column1']
            book['AcquisitionMethodDescription'] = row['Column2']
            book['AcquisitionMethod'] = row['Column3']
            book['AuthorContributor'] = row['Column4']
            book['Author'] = row['Column5']
            book['FiscalPeriodDescription'] = row['Column6']
            book['Format'] = row['Column7']
            book['FundCode'] = row['Column8']
            book['FundName'] = row['Column9']
            book['FundType'] = row['Column10']
            
            isbns = row['Column11']
            isbn13 = getIsbn13(isbns)
            print(isbn13)
            book['isbn13'] = isbn13
            
            
            book['ISBNS'] = row['Column11']
            book['MaterialType'] = row['Column12']
            book['mmsId'] = row['Column13']
            book['ParentFundName'] = row['Column14']
            book['POLineCreationDateFilter'] = row['Column15']
            book['POLineCreationDate'] = row['Column16']
            book['POLineTypeName'] = row['Column17']
            book['ReceivingDate'] = row['Column18']
            book['ReceivingStatus'] = row['Column19']
            book['ReportingCode'] = row['Column20']
            book['SourceType'] = row['Column21']
            book['StatusActive'] = row['Column22']
            book['Status'] = row['Column23']
            title = titlecase(row['Column24'])
            book['Title'] = title
            book['VendorName'] = row['Column25']
            book['CampusName'] = row['Column26']
            book['ItemCreationDate'] = row['Column27']
            book['LibraryName'] = row['Column28']
            book['LocationCode'] = row['Column29']
            book['LocationName'] = row['Column30']
            book['MaterialType'] = row['Column31']
            book['PermanentCallNumber'] = row['Column32']
            booksJson.append(book)
        return booksJson
            
def main():
    analyticsJson = getAnalyticsJson()
    for book in analyticsJson:
        print(book['isbn13'])
        time.sleep(1)
        googleBook = getGoogleBook(book['isbn13'])
        pprint.pprint(googleBook)
    
    
    
    sortedNewBooks = sorted(analyticsJson, key=operator.itemgetter('mmsId'), reverse=True)
    # pprint.pprint(newbooks)
    with open('newbooks1.json', "w") as j:
        json.dump(sortedNewBooks, j, indent=4)
    print("newbooks.json written")

if __name__ == "__main__":
    main()