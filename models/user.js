/**
 * Users model
 */

'use strict';

// Requesting the libs
let mongoose = require('mongoose');
let mongooseTypes = require('mongoose-types');
var bcrypt = require('bcrypt');
var i18n = require('i18n-2');

//Load the connection to the database
require('mongoConnector');


//Setting up the mongoose-types lib
mongooseTypes.loadTypes(mongoose);
var Email = mongoose.SchemaTypes.Email;
var ObjectId = mongoose.Schema.ObjectId;


//We need the model of Tokens to populate
require('./token');

//Setting up the bcrypt lib
const SALT_WORK_FACTOR = 10; //Rounds to encrypt the password

// The model of the user document
let model = {
    email: {
        type: Email,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    username: String,
    _tokens: [{
        type: ObjectId,
        ref: 'Token'
    }]
};

//Creating the document schema with the model
let userSchema = new mongoose.Schema(model);


/**
 * Custom static method to auth a user
 * @param email String
 * @param password String
 * @return Promise
 */
userSchema.statics.auth = function (email, password) {
    let User = this.model('User');

    return new Promise(function (resolve, reject) {

        //First get the user
        User.findOne({email: email}).exec(function (error, result) {
            if (error) {
                return reject(error);
            }

             // User not found
            if (!result) {

                return reject({
                    code: 'LOGIN_FAILED',
                    data: {
                        login: 'Incorrect user or password'
                    }
                });
            }

            //Check password
            result.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return reject({
                        code: 'LOGIN_FAILED',
                        data: {
                            login: 'Incorrect user or password'
                        }
                    });
                }

                //If we are here the login was successful
                // we return the user without the password
                delete result.password;
                result._id = result._id.toString();
                resolve(result);

            });
        });
    });
};



/**
 * Custom method to check passwords
 *
 * @param candidatePassword
 * @param cb Callback
 * @return Boolean
 */
userSchema.methods.checkPassword = function (candidatePassword, cb) {

    return bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return next(err);
        }
        cb(null, isMatch);
    });
};


/**
 * Custom middleware to encrypt the password
 * Be careful because the password is not encrypted
 * until save method is called
 *
 * We also provide a middleware to save token if added one
 * The check that token not exists should be done
 * previously
 */
userSchema.pre('save', function (next) {

    var user = this; // To avoid errors with this in the closure

    //If we are not setting a new of modifying our
    // password we do not want to do anything...
    if (user.isModified('password')) {
        //Generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
            if (error) {
                return next(error);
            }

            //Hash the password
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) {
                    return next(error);
                }

                //Override our password with the hash
                user.password = hash;
            })
        })
    }

    next();
});

module.exports = mongoose.model('User', userSchema);