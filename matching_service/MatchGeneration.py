from flask import request, Response, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from User import User
import pandas as pd
import numpy as np
from mongoengine import *

connect(host=os.getenv("DATABASE_URL"))
client = MongoClient(os.getenv("DATABASE_URL"))
db = client.campusbuddy
users = db.users

def getArgument(name, body):
    value = None
    try:
        value = body[name]
    except:
        return None
    return value

def buildFilterObject(body, userObject):
    fil = {}
    if getArgument("same_college", body):
        fil["college_name"] = userObject.college_name
    if getArgument("filter_by_clubs", body) != None and len(getArgument("filter_by_clubs", body)) > 0:
        fil["clubs"] = {
            "$in": getArgument("filter_by_clubs", body)
        }
    if getArgument("filter_by_interests", body) != None and len(getArgument("filter_by_interests", body)) > 0:
        fil["interests"] = {
            "$in": getArgument("filter_by_interests", body)
        }
    if getArgument("filter_by_major", body) != None and len(getArgument("filter_by_major", body)) > 0:
        fil["majors"] = {
            "$in": getArgument("filter_by_major", body)
        }
    if getArgument("filter_by_minor", body) != None and len(getArgument("filter_by_minor", body)) > 0:
        fil["minors"] = {
            "$in": getArgument("filter_by_minor", body)
        }
    gpaLimiter = {}
    if getArgument("filter_by_max_GPA", body) != None:
        gpaLimiter["$lte"] = getArgument("filter_by_max_GPA", body)
    if getArgument("filter_by_min_GPA", body) != None:
        gpaLimiter["$gte"] = getArgument("filter_by_min_GPA", body)
    if len(gpaLimiter) > 0:
        fil["gpa"] = gpaLimiter

    yearLimiter = {}
    if getArgument("filter_by_max_year", body) != None:
        yearLimiter["$lte"] = getArgument("filter_by_max_year", body)
    if getArgument("filter_by_min_year", body) != None:
        yearLimiter["$gte"] = getArgument("filter_by_min_year", body)
    if len(yearLimiter) > 0:
        fil["year"] = yearLimiter
    
    return fil

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
    
    filterObject = buildFilterObject(request.get_json(), User(userDoc))
    pipeline = [{"$match": filterObject}, {"$sample": { "size": 200 }}]
    randUsers = users.aggregate(pipeline=pipeline)
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