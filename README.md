npm install
npm run dev

1. Start the local development server
   - `npm run dev`
   - Go to the New Books page or Monitor page for the before view
     - http://localhost:3000/newbooks
     - http://localhost:3000/appspace
2. Get data in csv format from Alma Analytics
   - Use Analytics dv workbook AllNewBooks
   - /@Catalog/users/he_15651436950001401_1401_d_na03.alma.exlibrisgroup.com/AllNewBooks
   - Make sure the "Receiving Status=Yes" filter is enabled
   - Export as "AllNewBooks.csv"
   - Rename the existing AllNewBooks.csv to AllNewBooksOLD.csv
   - Move AllNewBooks.csv from Downloads to "projects/northeastern-oakland/preprocessor"
3. Run preprocessor from "projects/northeastern-oakland/preprocessor"
   - WEEKLY USAGE: ./processCSV.py AllNewBooks.csv newbooksAll.json > logs/out-yyyymmdd.txt
   - Rescan books that were missing covers previously: ./processCSV.py AllNewBooks.csv ../api/static/newbooks.json > logs/out-yyyymmdd.txt
   - Rescan all books: ./processCSV.py AllNewBooks.csv rescan.json > logs/out-yyyymmdd.txt
   - `./processCSV.py AllNewBooks.csv newbooksAll.json > logs/out-YYYYMMDD.txt`
     - newbooksAll.json is your comparison set
   - Will output 2 data files and a log file
     - newbooksAll.json
     - newbooks.json
     - logs/out-YYYYMMDD.txt
   - move the resulting newbooks.json file to api/static overwriting the existing file.