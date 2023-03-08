from flask import request, jsonify, Response
from Helpers.MatchGenerationHelpers import getArgument
from Database.Models.Swipe import Swipe
# Request Format
# {
#   primaryUserID: String,
#   targetUserID: String,
#   like: Boolean
# }

def swipe():
    bodyJson = request.get_json()
    if not ("primaryUserID" in bodyJson and "targetUserID" in bodyJson and "like" in bodyJson):
        return jsonify({"message": "Could not parse field."}), 400
    try:
        Swipe(**bodyJson).save()
    except Exception as err:
        print(err)
        return jsonify({"message": "Something went wrong saving the swipe."}), 500
    return Response("Success!", status=200)
