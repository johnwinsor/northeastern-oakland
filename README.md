npm install
npm run dev

jq -r '[.[] | select(.SortDate!="9999-99-99")]' newbooks.json > ../api/static/newbooks.json
jq -r '[.[] | select(.SortDate=="9999-99-99")]' newbooks.json > seenbooks.json

1. Start the local development server
   - `npm run dev`
   - Go to the New Books page or Monitor page for the before view
     - http://localhost:3000/newbooks
     - http://localhost:3000/appspace
2. Enhance Analytics data and setup api endpoint
   - Method 1 - Export Data from Analytics as CSV
      - Get data in csv format from Alma Analytics
         - Use Analytics dv workbook AllNewBooks
         - /@Catalog/users/he_15651436950001401_1401_d_na03.alma.exlibrisgroup.com/AllNewBooks
         - Make sure the "Receiving Status=Yes" filter is enabled
         - Export as "AllNewBooks.csv", It will download as a csv file to the local Downloads directory.
         - Move AllNewBooks.csv from Downloads to "projects/northeastern-oakland/preprocessor"
           - `mv ~/Downloads/AllNewBooks.csv ~/projects/northeastern-oakland/preprocessor`
      - Run preprocessor from "projects/northeastern-oakland/preprocessor"
        - WEEKLY USAGE: `./processCSV.py AllNewBooks.csv allBooksSeen.json > logs/out-YYYYMMDD.txt `
        - Rescan books that were missing covers previously: `./processCSV.py AllNewBooks.csv ../api/static/newbooks.json > logs/out-yyyymmdd.txt`
        - Rescan all books: `./processCSV.py AllNewBooks.csv rescan.json > logs/out-yyyymmdd.txt`
          - `./processCSV.py AllNewBooks.csv allBooksSeen.json > logs/out-YYYYMMDD.txt `
          - allBooksSeen.json is your comparison set in this example
        - Will output 2 data files and a log file
          - newbooksAll.json
          - newbooks.json
          - logs/out-YYYYMMDD.txt
        - move the resulting newbooks.json file to api/static overwriting the existing file.
   - Method 2 (updateEndpoint.py)
     - Create or Edit Dataset
       - NewBooksDataset ('HE_15651436950001401_1401_D_na03.alma.exlibrisgroup.com'.'NewBooksDataset')
     - Get Data from Analutics API and enhance it in one step
       - NewBooksApp Analytics Analysis
       - https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooksApp&limit=25&col_names=true&apikey=APIKEY
3. Commit changes and push to Github
4. Deploy to librarystage
   - ssh 
   - git pull
   - npm run build
   - pm2 restart library
   - pm2 restart Flask

Front End Applications

1. New Books Carousel
2. Library Monitor - Appspace
3. Libguides
   - https://northeastern.libapps.com/libguides/admin_c.php?g=1382992