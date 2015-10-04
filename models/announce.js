/**
 * Announces model
 */

"use strict";

// Requesting the libs
let mongoose = require('mongoose');

//Load the connection to the database
require('mongoConnector');

//required libs
var formatedUrl = require('formatedUrl');
var isFunction = require('isFunction');


/**
 * Helper function to check results and format the
 * photo used in order to don't duplicate code
 *
 * @param req
 * @param results
 * @returns {*}
 */
function announces_format_photo_helper(req, results) {
    if (Array.isArray(results)) {
        for (let key in results) {
            results[key].photo = formatedUrl(req, results[key].photo);
        }
    } else {
        results.photo = formatedUrl(req, results.photo);
    }

    return results;
}

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
 * Alias of find with req param to get url with the public url
 * @param req
 * @param query
 * @param fields
 * @param options
 * @param callback
 * @returns {*|FindOperatorsOrdered|FindOperatorsUnordered|Query|Cursor|T}
 */
announceSchema.statics.findWithReq = function (req, query, fields, options, callback) {

    if (isFunction(fields)) {

        callback = fields;
        fields = {};
        options = {};

    } else if (isFunction(options)) {

        callback = options;
        options = {};
    }

    return this.find(query, fields, options, function (error, results) {

        if (error) {
            return callback(error, results);
        }

        results = announces_format_photo_helper(req, results);

        callback(error, results);
    });
};

/**
 * Alias of findById excepts that the first param is the request
 *  to format the photo url string to a valid url
 *
 * @param req
 * @param id
 * @param callback
 * @returns {Query}
 */
announceSchema.statics.findByIdWithReq = function (req, id, callback) {

    if (isFunction(id)) {
        callback = id;
        id = req;
    }

    return this.findById(id, function (error, results) {
        if (error) {
            return cb(error, results);
        }

        results = announces_format_photo_helper(req, results);

        console.log(results);

        if (isFunction(callback)) {
            return callback(error, results);
        }

        return results;
    });
};


/**
 * Custom middleware to update the modified date
 */
announceSchema.pre('save', function (next) {
    this.modified = new Date();
    next();
});



module.exports = mongoose.model('Announce', announceSchema);
