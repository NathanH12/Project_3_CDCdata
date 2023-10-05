#Importing dependencies 

from flask import Flask, jsonify, request
#from flask_cors import CORS
from flask_pymongo import PyMongo
import json
#import pymongo
from bson import ObjectId
# from pymongo import MongoClient

#connecting to the MongoDB server and creating the Flask
#conn = 'mongodb://localhost:27017'
app = Flask(__name__)
#CORS(app)
app.config['MONGO_URI'] = "mongodb://localhost:27017/Project_3"
#client = MongoClient("mongodb://localhost:27017/")
mongo = PyMongo(app)

#Listing available routes 

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/Disease<br/>"
        f"/test_db_connection"
    )

@app.route('/Disease',methods=['GET'])
def Disease():
    collection=mongo.db.Disease_db
    data=list(collection.find())
    return jsonify(data)

#Testing API connection to database
#/test_db_connection

@app.route('/test_db_connection')
def test_db_connection():
    try:
        # Try to fetch a document from the collection
        result = mongo.db.Disease_db.find_one()
        if result:
            print(result)
            return "Database connection is successful!"
            
        else:
            return "Failed to retrieve data from the database."
    except Exception as e:
        return f"Error connecting to the database: {str(e)}", 500  # Internal Server Error
    
if __name__ == '__main__':
    app.run(debug=True)

