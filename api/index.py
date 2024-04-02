from flask import Flask, request, jsonify
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
    
    with app.open_resource('static/newbooks.json') as f:
        d = json.load(f)
        
    data = d[0 : 50]
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, urlDateFormat)
        books = [book for book in data if datetime.strptime(book["SortDate"], recDateFormat) > date_obj]
    else:
        books = data
    return jsonify(books)

@app.route("/api/newbooks/<lib>", defaults={'subj': None}, methods=["GET"])
@app.route("/api/newbooks/<lib>/<subj>", methods=["GET"])
def get_books_library(lib, subj):
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    library = urllib.parse.unquote(lib)
    
    if library == "all":
        if subj:
            subject = urllib.parse.unquote(subj)
            books = [book for book in data if book["ReportingCode"] == subject]
        else:
            books = data
    else:
        if subj:
            subject = urllib.parse.unquote(subj)
            bks = [book for book in data if (book["LibraryName"] == library) or (book["LibraryName"] is None)]
            books = [book for book in bks if book["ReportingCode"] == subject]
        else:
            books = [book for book in data if book["LibraryName"] == library]
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, urlDateFormat)
        b = [bk for bk in books if datetime.strptime(bk["SortDate"] , recDateFormat) > date_obj]
    else:
        b = books
        
    return jsonify(b)

@app.route("/api/appspace", methods=["GET"])
def get_books_monitor():
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    books = [book for book in data if book["LibraryName"] == "F.W. Olin Library"]
    # app.logger.warning(books)
    
    date_limiter = datetime.now() - timedelta(days=90, hours=0)
    app.logger.warning(date_limiter)
    b = [bk for bk in books if datetime.strptime(bk["SortDate"] , urlDateFormat) > date_limiter]
    # app.logger.warning(books[1]["recDate"])

    return jsonify(b)

@app.route("/api/subjects", methods=["GET"])
def get_subjects():
    
    with app.open_resource('static/newbooks.json') as f:
        data = json.load(f)
    
    subjects = [ sub['ReportingCode'] for sub in data ]
    subjects = list(set(subjects))

    return jsonify(subjects)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == "__main__":
    app.run()