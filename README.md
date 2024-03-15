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
   - Export as "AllNewBooks.csv", It will download as a csv file to the local Downloads directory.
   - Move AllNewBooks.csv from Downloads to "projects/northeastern-oakland/preprocessor"
     - `mv ~/Downloads/AllNewBooks.csv ~/projects/northeastern-oakland/preprocessor`
3. Get Data from API
   - https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FNewBooksApp&limit=25&col_names=true&apikey=l8xx5852c9867ab64264901d17af13574837
4. Run preprocessor from "projects/northeastern-oakland/preprocessor"
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
5. Commit changes and push to Github
6. Deploy to librarystage
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