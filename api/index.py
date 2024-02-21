from flask import Flask, request, url_for
from flask_cors import CORS
import requests
import urllib.parse
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)
urlDateFormat = '%Y-%m-%d'
recDateFormat = '%m/%d/%Y'

@app.route("/api/newbooks", methods=["GET"])
def get_books():
    # response = requests.get('https://library.mills.edu/data.json')
    
    # response = requests.get('http://localhost:3000/newbooks.json')
    # data = response.json()
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, urlDateFormat)
        books = ([book for book in data if datetime.strptime(book["recDate"], recDateFormat) > date_obj], None)
    else:
        books = data
    return books

@app.route("/api/appspace", methods=["GET"])
def get_books_monitor():
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    books = [book for book in data if book["library"] == "F.W. Olin Library"]
    
    date_limiter = datetime.now() - timedelta(days=90, hours=0)
    b = ([bk for bk in books if datetime.strptime(bk["recDate"] , recDateFormat) > date_limiter], None)
    # app.logger.warning(books[1]["recDate"])

    return b

@app.route("/api/libguides", defaults={'subj': None}, methods=["GET"])
@app.route("/api/libguides/<subj>", methods=["GET"])
def get_books_libguides(subj):
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    if subj:
        books = [book for book in data if book["subject"] == subj]
    else:
        books = data

    return books

@app.route("/api/subjects", methods=["GET"])
def get_subjects():
    # response = requests.get('http://localhost:3000/newbooks.json')
    # data = response.json()
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    subjects = [ sub['subject'] for sub in data ]
    subjects = list(set(subjects))

    return subjects

@app.route("/api/newbooks/<lib>", defaults={'subj': None}, methods=["GET"])
@app.route("/api/newbooks/<lib>/<subj>", methods=["GET"])
def get_books_library(lib, subj):
    # response = requests.get('http://localhost:3000/newbooks.json')
    # data = response.json()
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    library = urllib.parse.unquote(lib)
    
    if library == "Global Campus":
        if subj:
            subject = urllib.parse.unquote(subj)
            books = [book for book in data if book["subject"] == subject]
        else:
            books = data
    else:
        if subj:
            subject = urllib.parse.unquote(subj)
            bks = [book for book in data if (book["library"] == library) or (book["library"] is None)]
            books = [book for book in bks if book["subject"] == subject]
        else:
            books = [book for book in data if book["library"] == library]
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, urlDateFormat)
        b = ([bk for bk in books if datetime.strptime(bk["recDate"] , recDateFormat) > date_obj], None)
    else:
        b = books
        
    return b

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == "__main__":
    app.run()