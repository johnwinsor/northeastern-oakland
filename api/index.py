from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import urllib.parse
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)
urlDateFormat = '%Y-%m-%d'
recDateFormat = '%Y-%m-%d'

@app.route("/api/newbooks", methods=["GET"])
def get_books():
    
    with app.open_resource('static/dataset.json') as f:
        d = json.load(f)
        
    data = d['items'][0 : 500]
    
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
    
    with app.open_resource('static/dataset.json') as f:
        data = json.load(f)
    
    library = urllib.parse.unquote(lib)
    
    if library == "all":
        if subj:
            subject = urllib.parse.unquote(subj)
            books = [book for book in data['items'] if book["ReportingCode"] == subject]
        else:
            books = data['items'][0 : 500]
    else:
        if subj:
            subject = urllib.parse.unquote(subj)
            bks = [book for book in data['items'] if (book["LibraryName"] == library) or (book["LibraryName"] is None)]
            books = [book for book in bks if book["ReportingCode"] == subject]
        else:
            books = [book for book in data['items'] if book["LibraryName"] == library]
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, urlDateFormat)
        b = [bk for bk in books if datetime.strptime(bk["SortDate"] , recDateFormat) > date_obj]
    else:
        b = books
        
    return jsonify(b)

@app.route("/api/appspace", methods=["GET"])
def get_books_monitor():
    
    with app.open_resource('static/dataset.json') as f:
        d = json.load(f)
        
    data = d['items'][0 : 100]
    
    books = [book for book in data if book["LibraryName"] == "F.W. Olin Library"]
    # app.logger.warning(books)
    
    # date_limiter = datetime.now() - timedelta(days=90, hours=0)
    # app.logger.warning(date_limiter)
    # b = [bk for bk in books if datetime.strptime(bk["SortDate"] , urlDateFormat) > date_limiter]
    # app.logger.warning(books[1]["recDate"])

    return jsonify(books)

@app.route("/api/subjects", methods=["GET"])
def get_subjects():
    
    with app.open_resource('static/dataset.json') as f:
        data = json.load(f)
    
    subjects = [ sub['ReportingCode'] for sub in data['items'] ]
    subjects = list(set(subjects))

    return jsonify(subjects)

@app.route("/api/libraries", methods=["GET"])
def get_libraries():
    
    with app.open_resource('static/dataset.json') as f:
        data = json.load(f)
    
    libraries = [ lib['LibraryName'] for lib in data['items'] ]
    libraries = list(set(libraries))

    return jsonify(libraries)

@app.route("/api/feed", methods=["GET"])
def get_feed():
    
    with app.open_resource('static/dataset.json') as f:
        d = json.load(f)
    
    data = d['items'][0 : 100]
    for pol in data:
        pol['id'] = pol.pop('POL')
        
    for coverurl in data:
        coverurl['image'] = coverurl.pop('coverurl')
        coverurl['image'] = coverurl['image'][0]
        
    for Title in data:
        Title['title'] = Title.pop('Title')
    
    feed = {}
    feed["version"] = "https://jsonfeed.org/version/1.1"
    feed["items"] = data
    feed["title"] = "My Feed"
    
    return jsonify(feed)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == "__main__":
    app.run()