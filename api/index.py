from flask import Flask
from flask_cors import CORS
import requests
import urllib.parse
import sys

app = Flask(__name__)
CORS(app)

# response = requests.get('https://library.mills.edu/data.json')
# data = response.json()

@app.route("/api/newbooks", methods=["GET"])
def get_all_todo_items():
    response = requests.get('https://library.mills.edu/data.json')
    data = response.json()
    return data

@app.route("/api/newbooks/<subj>", methods=["GET"])
def get_todo_item(subj):
    response = requests.get('https://library.mills.edu/data-all.json')
    data = response.json()
    subject = urllib.parse.unquote(subj)
    books = ([book for book in data if book["subject"] == subject], None)
    if books:
        return books
    return {"error": "Books item not found"}, 404

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}
    # return data

if __name__ == "__main__":
    app.run()