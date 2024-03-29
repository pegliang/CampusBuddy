from flask import request, jsonify
from bson.objectid import ObjectId
from Database.Models.User import User
from Routes.Helpers.MatchGenerationHelpers import buildFilterObject, compare
import sys

def suggestedMatches():
    try:
        if not ("user_id" in request.args):
            return jsonify({"message": "Could not parse field."}), 400
        else:
            userID = request.args.get("user_id")
    except:
        return jsonify({"message": "Something went wrong parsing the 'user_id'."}), 400
    try:
        num_of_users = request.args.get("num_of_users")
        if num_of_users > 40:
            num_of_users = 40
    except:
        num_of_users = 40
    # Ignore users where the following is true:
    # If there exists a row in the swipes database where primaryUser = user requesting and 
    # targetUser = user
    try:
        primaryUser = User.objects().get(pk = ObjectId(userID))
        if primaryUser == None:
            return jsonify({"message": f'Could not find user with id = {userID}.'}), 400
    except Exception as err:
        return jsonify({"message": f'Error finding user with id = {userID}.'}), 500
    
    filterObject = buildFilterObject(request.args, primaryUser)
    ignoreSeenUsers = {
        "$lookup": {
            "from": "swipes",
            "let": { "targetUser": {
            "$toString": "$_id" 
        }},
            "pipeline": [
                {
                "$match": {
                    "$expr": {
                    "$and": [
                        { "$eq": ["$primaryUserID", userID] },
                        { "$eq": ["$targetUserID", "$$targetUser"] },
                    ],
                    },
                },
                },
            ],
            "as": "matchedSwipes",
        },
    }
    pipeline = [ignoreSeenUsers, 
                {"$match": {
                    "matchedSwipes": {"$eq": []}}},
                {"$match": filterObject},
                {"$sample": { "size": 200 }}, 
                {"$project": {
                    "matchedSwipes": 0,
                }}
                ]
    print(User.aggregate(pipeline=pipeline), file=sys.stderr)
    randUsersDicts = User.list_serialize(User.aggregate(pipeline))
    similarity_scores = compare(primaryUser.serialize(), randUsersDicts)
    sortedUsers = sorted(similarity_scores, key=lambda x: x["similarity_score"], reverse=True)[:num_of_users]

    jsonUsers = jsonify(sortedUsers)
    return jsonUsers

