from flask import Flask
from pymongo import MongoClient
import os

client = MongoClient(os.getenv("DATABASE_URL"))
db = client.campusbuddy
users = db.users

def suggestedMatches():
    return "Suggested Matches"