from flask import Flask
from Routes.MatchGenerationRoute import suggestedMatches
from Routes.SwipeRoute import swipe
from Routes.ConversationRoute import getConversations
import os
from mongoengine import connect

app = Flask(__name__)
app.add_url_rule("/getSuggestedMatches", "getSuggestedMatches", suggestedMatches, methods = ["GET"])
app.add_url_rule("/swipe", "swipe", swipe, methods=["POST"])
app.add_url_rule("/getConversations", "getConversations", getConversations, methods = ["GET"])
if __name__ == "__main__":
    connect(host=os.getenv("DATABASE_URL"))
    app.run(port = 8080, host = "0.0.0.0")