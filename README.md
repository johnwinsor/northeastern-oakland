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
   - Run update_dataset.py
     - Start in /preprocessor
       - Full Set
         - `python update_dataset.py`
       - Weekly Partial Set (send last MMS ID as filter)
         - `python update_dataset.py`
     - Check output logfile in logs/
   - Check local dev site for changes
     - cd back to the site root
     - `npm run dev`
     - http://localhost:3000/newbooks
       - The new books just processed should show up in the center of the carousel.
   - Add and commit changes to repo then push to Github
     - `git add .`
     - `git commit -m "weekly update."`
     - `git push`
   - Check Vercel site deploy
   - Update librarystage
     - ssh jwinsor@144.91.2.73
     - cd /var/www/projects/northeastern-oakland
     - Pull repo from remote
       - `git pull`
     - https://librarystage.mills.edu/newbooks
       - Check for newly processed books.
   - Optional rebult static site files and restart servers
     - `npm run build`
     - `pm2 restart northeastern-oakland`
     - `pm2 restart Flask`
