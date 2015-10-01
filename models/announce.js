/**
 * Announces model
 */

"use strict";

// Requesting the libs
let mongoose = require('mongoose');

//Load the connection to the database
require('mongoConnector');

//The model document of the announces
let model = {
    /*
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    //*/
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sell', 'buy'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    photo: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        enum: ['work', 'lifestyle', 'motor', 'mobile'],
        required: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
};

//Creating the document schema with the model
let announceSchema = new mongoose.Schema(model);


/**
 * Custom middleware to update the modified date
 */
announceSchema.pre('save', function (next) {
    this.modified = new Date();
    next();
});


module.exports = mongoose.model('Announce', announceSchema);
