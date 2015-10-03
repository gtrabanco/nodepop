/**
 * Push token model
 */

"use strict";

// Requesting the lib
let mongoose = require('mongoose');

//Define ObjectId type
var ObjectId = mongoose.Schema.ObjectId;

//Load the connection to the database
require('mongoConnector');

//Added the model of user to resolve population
var User = require('./user');

//the model of the Tokens collection
let model = {
    _user: { //Related
        type: ObjectId,
        ref:'User',
        required: true
    },
    platform: {
        type: String,
        enum: ['ios', 'android'],
        required: true
    },
    token: {
        type: String,
        index: {
            unique: true
        }
    }
};


let tokenSchema = mongoose.Schema(model);

/**
 * Function to get a token by userid
 * It is not necessary an ObjectId Object
 * @param userid
 * @return {Promise} Resolve the tokens for an user _id
 */
tokenSchema.statics.getByUserId = function (userid) {
    if (typeof userid === 'string') {
        userid = new ObjectId(userid);
    }

    return new Promise(function (resolve, reject) {
        this.find({user: userid}).
            populate('user', '-password').
            exec(function (error, tokens) {

                if (error) {
                    return reject(error);
                }

                return resolve(tokens);
        })
    });
};


/**
 * Get whats the registered user searching by the token
 * @param token
 * @returns {Promise} Resolve the user for the token
 */

tokenSchema.statics.getUserByToken = function (token) {
    return new Promise(function (resolve, reject) {
        this.findOne({token: token}).
            populate('user', '-password').
            exec(function (error, token) {

                if (error) {
                    return reject(error);
                }

                return resolve(token.user);
            })
    });
};

/**
 * Middleware to delete tokens from the users table when they are
 * deleted from tokens database
 */
tokenSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id);
    User.find({_tokens: doc.id}).exec(function (error, user) {
        if (error) {
            return next(error);
        }
        user._tokens.splice(user._tokens.indexOf(doc._id), 1);
        user.save(function (error, user) {
            if (error) {
                return next(error);
            }
        })
    })

    return next();
});


module.exports = mongoose.model('Token', tokenSchema);