from flask import request, Response, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from User import User
import pandas as pd
import numpy as np

client = MongoClient(os.getenv("DATABASE_URL"))
db = client.campusbuddy
users = db.users

def suggestedMatches():

    try:
        userID = request.get_json()["user_id"]
    except:
        return Response(jsonify({"message": "Something went wrong parsing the 'user_id'."}), status=400, mimetype='application/json')
    try:
        num_of_users = request.get_json()["num_of_users"]
        if num_of_users > 40:
            num_of_users = 40
    except:
        num_of_users = 40

    try:
        userDoc = users.find_one({"_id": ObjectId(userID)})

        if userDoc == None:
            return Response(jsonify({"message": f'Could not find user with id = {userID}.'}), status=400, mimetype='application/json')
    except:
        return Response(jsonify({"message": f'Error finding user with id = {userID}.'}), status=500, mimetype='application/json')
    
    randUsers = users.aggregate([{"$sample": { "size": 200 }}])
    randUsersDicts = []

    for doc in randUsers:
        randUsersDicts.append(User(doc).serialize())
    
    df = pd.DataFrame(randUsersDicts)

    similarity_scores = compare(User(userDoc).serialize(), df).to_dict('records')
    sortedUsers = sorted(similarity_scores, key=lambda x: x["similarity_score"], reverse=True)[:num_of_users]

    jsonUsers = jsonify(sortedUsers)
    return jsonUsers

def compare(target, df):

    new_df = df.copy()
    new_df["club_similarity"] = df.apply(lambda x: len(np.intersect1d(x['clubs'], target['clubs'])), axis = 1)
    max = new_df["club_similarity"].abs().max()
    new_df["club_similarity"] = new_df["club_similarity"]/(max if max != 0 else 1) # Normalizing

    new_df["same_college"] = df.apply(lambda x: 1 if x['college_name'] == target['college_name'] else 0, axis = 1)

    new_df["courses_similarity"] = df.apply(lambda x: len(np.intersect1d(x['courses'], target['courses'])), axis = 1)
    max = new_df["courses_similarity"].abs().max()
    new_df["courses_similarity"] = new_df["courses_similarity"] / (max if max != 0 else 1) # Normalizing

    new_df["interests_similarity"] = df.apply(lambda x: len(np.intersect1d(x['interests'], target['interests'])), axis = 1)
    max = new_df["interests_similarity"].abs().max()
    new_df["interests_similarity"] = new_df["interests_similarity"]/(max if max != 0 else 1) # Normalizing


    new_df["majors_similarity"] = df.apply(lambda x: len(np.intersect1d(x['majors'], target['majors'])), axis = 1)
    max = new_df["majors_similarity"].abs().max()
    new_df["majors_similarity"] = new_df["majors_similarity"]/(max if max != 0 else 1) # Normalizing

    new_df["minors_similarity"] = df.apply(lambda x: len(np.intersect1d(x['minors'], target['minors'])), axis = 1)
    max = new_df["minors_similarity"].abs().max() 
    new_df["minors_similarity"] = new_df["minors_similarity"]/ (max if max != 0 else 1) # Normalizing

    new_df["gpa_similarity"] = df.apply(lambda x: (4.0 - abs(x["gpa"] - target['gpa']))/4.0, axis = 1)
    new_df["year_similarity"] = df.apply(lambda x: (10.0 - abs(x["year"] - target['year']))/10.0, axis = 1)

    new_df["similarity_score"] = (new_df["club_similarity"] + new_df["same_college"] + new_df["courses_similarity"] + new_df["interests_similarity"] + new_df["majors_similarity"] + new_df["minors_similarity"] + new_df["gpa_similarity"] + new_df["year_similarity"])/8.0
    new_df = new_df.drop(columns=["club_similarity", "same_college", "courses_similarity", "interests_similarity", "majors_similarity", "minors_similarity", "gpa_similarity", "year_similarity"])
    return new_df