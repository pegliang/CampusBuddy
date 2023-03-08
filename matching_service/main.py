from flask import Flask
from Routes.MatchGenerationRoute import suggestedMatches
import os
from mongoengine import connect

app = Flask(__name__)
app.add_url_rule("/getSuggestedMatches", "getSuggestedMatches", suggestedMatches, methods = ["GET"])

if __name__ == "__main__":
    connect(host=os.getenv("DATABASE_URL"))
    app.run(port = 8080, host = "0.0.0.0")