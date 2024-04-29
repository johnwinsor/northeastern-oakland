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
   - Method 2 (apiEndpoint.py)
     - Start in /preprocessor
       - Full Set
         - `python apiEndpoint.py > logs/20240415-full.txt`
       - Partial Set (send last MMS ID as filter)
3. Commit changes and push to Github
4. Deploy to librarystage
   - ssh
   - `cd /var/www/projects/northeastern-oakland`
   - `git pull`
   - `npm run build`
   - `pm2 restart library`
   - `pm2 restart Flask`

Front End Applications

1. New Books Carousel
2. Library Monitor - Appspace
3. Libguides
   - https://northeastern.libapps.com/libguides/admin_c.php?g=1382992



<sawx:expr xsi:type="sawx:comparison" op="greater"
    xmlns:saw="com.siebel.analytics.web/report/v1.1" 
    xmlns:sawx="com.siebel.analytics.web/expression/v1.1" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
>
   <sawx:expr xsi:type="sawx:sqlExpression">"Funds Expenditure"."MMS Id"</sawx:expr>
   <sawx:expr xsi:type="xsd:string">9952423549901401</sawx:expr>
 </sawx:expr>

<sawx:expr xsi:type="sawx:comparison" op="greater"
  xmlns:saw="com.siebel.analytics.web/report/v1.1" 
  xmlns:sawx="com.siebel.analytics.web/expression/v1.1" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
>
  <sawx:expr xsi:type="sawx:sqlExpression">"Funds Expenditure"."PO Line Reference"</sawx:expr>
  <sawx:expr xsi:type="xsd:string">POL-143700</sawx:expr>
</sawx:expr>

https://www.urlencoder.org/

<sawx:expr xsi:type="sawx:list" op="in"
  xmlns:saw="com.siebel.analytics.web/report/v1.1" 
  xmlns:sawx="com.siebel.analytics.web/expression/v1.1" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
>
   <sawx:expr xsi:type="sawx:sqlExpression">"Funds Expenditure"."PO Line Reference"</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143680</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143701</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143704</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143622</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143623</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143625</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143677</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143678</sawx:expr>
   <sawx:expr xsi:type="xsd:string">POL-143679</sawx:expr>
</sawx:expr>

%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Alist%22%20op%3D%22in%22%0A%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Funds%20Expenditure%22.%22PO%20Line%20Reference%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143680%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143701%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143704%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143622%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143623%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143625%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143677%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143678%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143679%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E

https://api-na.hosted.exlibrisgroup.com/almaws/v1/analytics/reports?path=%2Fshared%2FNortheastern%20University%2FJohnShared%2FAPI%2FAcq-Analysis-Missing-Covers&limit=25&apikey={APIKEY}&filter=%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3Alist%22%20op%3D%22in%22%0A%20%20xmlns%3Asaw%3D%22com.siebel.analytics.web%2Freport%2Fv1.1%22%20%0A%20%20xmlns%3Asawx%3D%22com.siebel.analytics.web%2Fexpression%2Fv1.1%22%20%0A%20%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20%0A%20%20xmlns%3Axsd%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%22%0A%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22sawx%3AsqlExpression%22%3E%22Funds%20Expenditure%22.%22PO%20Line%20Reference%22%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143680%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143701%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143704%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143622%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143623%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143625%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143677%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143678%3C%2Fsawx%3Aexpr%3E%0A%20%20%20%3Csawx%3Aexpr%20xsi%3Atype%3D%22xsd%3Astring%22%3EPOL-143679%3C%2Fsawx%3Aexpr%3E%0A%3C%2Fsawx%3Aexpr%3E