npm install
npm run dev

1. Configure .env.local
2. Configure /preprocessor/env.py
3. Enhance Analytics data and setup api endpoint
   - Run apiEndpoint.py
     - Start in /preprocessor
       - Full Set
         - `python update_dataset.py`
       - Partial Set (send last MMS ID as filter)
