from flask import Flask, request
from flask_cors import CORS
import requests
import urllib.parse
from datetime import datetime

app = Flask(__name__)
CORS(app)
date_format = '%Y-%m-%d'

@app.route("/api/newbooks", methods=["GET"])
def get_books():
    response = requests.get('https://library.mills.edu/data.json')
    data = response.json()
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, date_format)
        books = ([book for book in data if datetime.strptime(book["recDate"], date_format) > date_obj], None)
    else:
        books = data
    return books

@app.route("/api/newbooks/<subj>", methods=["GET"])
def get_books_subject(subj):
    subject = urllib.parse.unquote(subj)
    response = requests.get('https://library.mills.edu/data-all.json')
    data = response.json()
    
    books = [book for book in data if book["subject"] == subject]
    
    if 'date' in request.args:
        date_limiter = request.args.get('date')
        date_obj = datetime.strptime(date_limiter, date_format)
        b = ([bk for bk in books if datetime.strptime(bk["recDate"] , date_format) > date_obj], None)
    else:
        b = books
        
    return b

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

if __name__ == "__main__":
    app.run()