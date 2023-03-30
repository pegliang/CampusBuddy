const mongoose = require("mongoose");

/**
 * The schema for the message
 * 
 * @type {ObjectId} chatID
 * @type {ObjectId} sender_id
 * @type {ObjectId} recipient_id
 * @type {Date} timestamp
 * @type {String} content
 */
const MessageSchema = new mongoose.Schema({
    
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },

    timestamp: {
        type: Date,
        required: true,
        default: Date.now
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
    Message: mongoose.model("Message", MessageSchema)
};