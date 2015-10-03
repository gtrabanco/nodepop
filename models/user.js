/**
 * Users model
 */

'use strict';

// Requesting the libs
let mongoose = require('mongoose');
let mongooseTypes = require('mongoose-types');
var bcrypt = require('bcrypt');

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
    tokens: [{
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

    return new Promise(function (resolve, reject) {

        //First get the user
        this.findOne({email: email}, function (error, user) {
            if (error) {
                return reject(error);
            }

             // User not found
            if (!user) {

                return reject({
                    code: 'LOGIN_FAILED',
                    data: {
                        login: 'Incorrect user or password'
                    }
                });
            }

            // Incorrect password
            if (!this.checkPassword(password)) {

                return reject({
                    code: 'LOGIN_FAILED',
                    data: {
                        login: 'Incorrect user or password'
                    }
                });
            }

            //If we are here the login was successful
            // we return the user without the password
            delete user.password;
            user._id = user._id.toString();
            resolve(user);
        });
    });
};



/**
 * Custom method to check passwords
 *
 * @param candidatePassword
 * @return Boolean
 */
userSchema.methods.checkPassword = function (candidatePassword) {

    return bcrypt.compareSync(candidatePassword, this.password);
};


/**
 * Custom middleware to encrypt the password
 * Be careful because the password is not encrypted
 * until save method is called
 */
userSchema.pre('save', function (next) {

    var user = this; // To avoid errors with this in the closure

    //If we are not setting a new of modifying our
    // password we do not want to do anything...
    if (!user.isModified('password')) {
        return next();
    }

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
            next();
        })
    })
});

module.exports = mongoose.model('User', userSchema);