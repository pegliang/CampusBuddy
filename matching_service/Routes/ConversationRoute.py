from flask import request, jsonify, Response
from Routes.Helpers.MatchGenerationHelpers import getArgument
from bson.objectid import ObjectId
from Database.Models.Match import Match
from Database.Models.User import User
import sys

# Request Format
# {
#   userID: String
# }

def getConversations():
    bodyJson = request.get_json()
    
    if not ("userID" in bodyJson):
        return jsonify({"message": "Could not parse field."}), 400
    try:
        userID = getArgument("userID", bodyJson)
        docs1 = Match.objects(User_1_ID = userID, Conversation_Active_For_User_1 = True)
        docs2 = Match.objects(User_2_ID = userID, Conversation_Active_For_User_2 = True)
        combinedDocs = list(docs1) + list(docs2)
        jsonListNew = []
        jsonListOld = []
        for doc in combinedDocs:
            conversationUser =  User.objects().get(pk = ObjectId(userID)).serialize()
            jsonConversation = {"conversation_id": str(doc.pk), "conversation_user": conversationUser}
            print(doc.User_1_ID.pk, file = sys.stderr)
            if doc.User_1_ID.pk == ObjectId(userID) and not doc.seen_by_user_1:
                jsonConversation["newly_matched"] = True
                doc.seen_by_user_1 = True
                doc.save()
                jsonListNew.append(jsonConversation)
            elif doc.User_2_ID.pk == ObjectId(userID) and not doc.seen_by_user_2:
                jsonConversation["newly_matched"] = True
                doc.seen_by_user_2 = True
                doc.save()
                jsonListNew.append(jsonConversation)
            else:
                jsonConversation["newly_matched"] = False
                jsonListOld.append(jsonConversation)
        return jsonify(jsonListNew + jsonListOld), 200
    except Exception as err:
        print(err)
        return jsonify({"message": "Something went wrong retreiving the conversations."}), 500
    

def archiveConversation():
    bodyJson = request.get_json()
    
    if (not ("userID" in bodyJson)) or (not ("conversationID" in bodyJson)):
        return jsonify({"message": "Could not parse field."}), 400
    try:
        conv_id = getArgument("conversationID")
        userID = getArgument("userID")
        conversation = Match.objects().get(pk=ObjectId(conv_id))
        if conversation.User_1_ID.pk == ObjectId(userID):
            conversation.Conversation_Active_For_User_1 = False
            conversation.save()
            return jsonify({"message": "Success!"}), 200
        if conversation.User_2_ID.pk == ObjectId(userID):
            conversation.Conversation_Active_For_User_2 = False
            conversation.save()
            return jsonify({"message": "Success!"}), 200
        return jsonify({"message": "Could not find user to archive conversation for"}), 404
    except Exception as err:
        print(err)