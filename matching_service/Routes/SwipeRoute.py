from flask import request, jsonify, Response
from Routes.Helpers.MatchGenerationHelpers import getArgument
from Database.Models.Swipe import Swipe
from Database.Models.Match import Match
import sys
# Request Format
# {
#   primaryUserID: String,
#   targetUserID: String,
#   like: Boolean
# }

def swipe():
    bodyJson = request.get_json()
    saved_swipe = None
    if not ("primaryUserID" in bodyJson and "targetUserID" in bodyJson and "like" in bodyJson):
        return jsonify({"message": "Could not parse field."}), 400
    try:
        saved_swipe = Swipe(**bodyJson).save()
    except Exception as err:
        print(err)
        return jsonify({"message": "Something went wrong saving the swipe."}), 500
    try:
        if Swipe.objects(primaryUserID = saved_swipe["targetUserID"], targetUserID=saved_swipe["primaryUserID"]).first() != None and Swipe.objects(primaryUserID = saved_swipe["targetUserID"], targetUserID=saved_swipe["primaryUserID"]).get().like and saved_swipe.like:
            Match(User_1_ID=saved_swipe["targetUserID"], User_2_ID=saved_swipe["primaryUserID"]).save()
    except Exception as err:
        print(err, file=sys.stderr)
        return jsonify({"message": "Something went wrong saving the Match."}), 500
    return Response("Success!", status=200)
