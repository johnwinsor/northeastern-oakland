Clone Repo
- `cd northeastern-oakland`

Python Environment (Mac OS)
- Pyenv
  - brew install pyenv
  - `pyenv install 3.12.3`
  - `pyenv global 3.12.3`
- Pipenv
  - brew install pipenv
  - `pipenv install`
    - Will install project dependencies in Pipfile
  - `pipenv shell`
    - Run scripts in the pipenv environment

Environment Variables
- /env.local
  - GOOGLE_KEY=THIS IS OPTIONAL - Google API does not require it and will rate limit you if you use it.
  - HOST_BASE_URL=http://127.0.0.1:3000
- /preprocessor/env.py
  - path = "../api/static/newbooks.json"
  - googleKey = ""
  - almaKey = ""

Next JS + Flask
- `npm install`
  - Will install node modules
- `npm run dev`

Enhance Analytics data and setup api endpoint
   - Run apiEndpoint.py
     - Start in /preprocessor
       - Full Set
         - `python update_dataset.py`
       - Partial Set (send last MMS ID as filter)
