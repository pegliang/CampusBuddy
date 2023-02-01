from flask import Flask
from pymongo import MongoClient
import os

client = MongoClient(os.getenv("DATABASE_URL"))
def suggestedMatches():
    return "Suggested Matches"