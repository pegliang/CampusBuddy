from flask import Flask
from MatchGeneration import suggestedMatches

app = Flask(__name__)
app.add_url_rule("/getSuggestedMatches", "getSuggestedMatches", suggestedMatches, methods = ["GET"])

if __name__ == "__main__":
    app.run(port = 8080, host = "0.0.0.0")