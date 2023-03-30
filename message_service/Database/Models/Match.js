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
    user_1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },

    user_2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

    recipient_id: {
        type: String,
        required: false,
    },

    content: {
        type: String,
        required: true,
    }
});

module.exports = {
    Match: mongoose.model("Match", MatchSchema)
};