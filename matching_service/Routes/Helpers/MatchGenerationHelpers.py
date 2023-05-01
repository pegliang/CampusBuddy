import pandas as pd
import numpy as np

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

    fil["_id"] = {"$ne": userObject.pk}

    return fil

def compare(target, userDicts):
    # target is the user we are creating matches for
    # userDicts is the available users
    df = pd.DataFrame(userDicts)
    def checkNull(callback, val1, val2, defaultReturnVal):
        if val1 is None or val2 is None:
            return defaultReturnVal
        else:
            return callback(val1, val2)
    
    new_df = df.copy()
    new_df["club_similarity"] = df.apply(lambda x: len(checkNull(np.intersect1d, x['clubs'], target['clubs'], 0)), axis = 1)
    max = new_df["club_similarity"].abs().max()
    new_df["club_similarity"] = new_df["club_similarity"]/(max if max != 0 else 1) # Normalizing

    new_df["same_college"] = df.apply(lambda x: 1 if checkNull(lambda c1,c2: c1 == c2, x['college_name'], target['college_name'], False) else 0, axis = 1)

    new_df["courses_similarity"] = df.apply(lambda x: len(checkNull(np.intersect1d, x['courses'], target['courses'], 0)), axis = 1)
    max = new_df["courses_similarity"].abs().max()
    new_df["courses_similarity"] = new_df["courses_similarity"] / (max if max != 0 else 1) # Normalizing

    new_df["interests_similarity"] = df.apply(lambda x: len(checkNull(np.intersect1d, x['interests'], target['interests'], 0)), axis = 1)
    max = new_df["interests_similarity"].abs().max()
    new_df["interests_similarity"] = new_df["interests_similarity"]/(max if max != 0 else 1) # Normalizing


    new_df["majors_similarity"] = df.apply(lambda x: len(checkNull(np.intersect1d, x['majors'], target['majors'], 0)), axis = 1)
    max = new_df["majors_similarity"].abs().max()
    new_df["majors_similarity"] = new_df["majors_similarity"]/(max if max != 0 else 1) # Normalizing

    new_df["minors_similarity"] = df.apply(lambda x: len(checkNull(np.intersect1d, x['minors'], target['minors'], 0)), axis = 1)
    max = new_df["minors_similarity"].abs().max() 
    new_df["minors_similarity"] = new_df["minors_similarity"]/ (max if max != 0 else 1) # Normalizing
    
    new_df["gpa_similarity"] = df.apply(lambda x: checkNull(lambda g1, g2: (4.0 - abs(g1 - g2))/4.0, x["gpa"], target["gpa"], 0.0), axis = 1)
    new_df["year_similarity"] = df.apply(lambda x: checkNull(lambda y1, y2: (10.0 - abs(y1 - y2))/10.0, x["year"], target["year"], 0.0), axis = 1)

    new_df["similarity_score"] = (new_df["club_similarity"] + new_df["same_college"] + new_df["courses_similarity"] + new_df["interests_similarity"] + new_df["majors_similarity"] + new_df["minors_similarity"] + new_df["gpa_similarity"] + new_df["year_similarity"])/8.0
    new_df = new_df.drop(columns=["club_similarity", "same_college", "courses_similarity", "interests_similarity", "majors_similarity", "minors_similarity", "gpa_similarity", "year_similarity"])
    return new_df.to_dict('records')

