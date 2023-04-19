const mongoose = require("mongoose");

/**
 * The schema for the conversation
 * 
 * @type {ObjectId} user_1_ID
 * @type {ObjectId} user_2_ID
 * @type {Boolean} conversation_active_for_user_1
 * @type {Boolean} conversation_active_for_user_2
 * @type {Boolean} seen_by_user_1
 * @type {Boolean} seen_by_user_2
 */

const MatchSchema = new mongoose.Schema({
    User_1_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    User_2_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    Conversation_Active_For_User_1: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
    },

    Conversation_Active_For_User_2: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
    },

    seen_by_user_1: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
    },
    seen_by_user_2: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
    },
});

module.exports = {
    Match: mongoose.model("Match", MatchSchema)
};