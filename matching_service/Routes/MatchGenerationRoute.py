from flask import request, jsonify
from bson.objectid import ObjectId
from Database.Models.User import User
from Routes.Helpers.MatchGenerationHelpers import buildFilterObject, compare

def suggestedMatches():
    try:
        userID = request.get_json()["user_id"]
    except:
        return jsonify({"message": "Something went wrong parsing the 'user_id'."}), 400
    try:
        num_of_users = request.get_json()["num_of_users"]
        if num_of_users > 40:
            num_of_users = 40
    except:
        num_of_users = 40

    try:
        primaryUser = User.objects().get(pk = ObjectId(userID))
        if primaryUser == None:
            return jsonify({"message": f'Could not find user with id = {userID}.'}), 400
    except Exception as err:
        return jsonify({"message": f'Error finding user with id = {userID}.'}), 500
    
    filterObject = buildFilterObject(request.get_json(), primaryUser)
    pipeline = [{"$match": filterObject}, {"$sample": { "size": 200 }}]
    randUsersDicts = User.list_serialize(User.aggregate(pipeline))

    similarity_scores = compare(primaryUser.serialize(), randUsersDicts)
    sortedUsers = sorted(similarity_scores, key=lambda x: x["similarity_score"], reverse=True)[:num_of_users]

    jsonUsers = jsonify(sortedUsers)
    return jsonUsers