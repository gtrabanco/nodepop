"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');

//The codes of responses function
var getCode = require('getCode');

//Mongoose and models
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var User = require(path.join(process.cwd(), 'models', 'user'));
var Token = require(path.join(process.cwd(), 'models', 'token'));


// /apiv1[currentVersion]/users/token_platforms
// ANY METHOD
// Get a list of the avaible platforms
router.all('/token_platforms', function (req, res, next) {
    res.json(getCode('OK', {
        platforms: Token.schema.path('platform').enumValues
    }));
});



// /apiv[currentVersion]/users/add_token
// PUT/PATCH

router.put('/add_token', function (req, res, err) {

    let data = {};

    //Get the token
    let newToken = req.body.token || null;

    //Check if the token exists in the database and if it is not null
    // return error if exists or is null
    if(newToken === null || Token.findOne({token: newToken})) {
        data = {
            token: 'Already exists'
        };

        return next({code: 'INVALID_PARAM', data: data});
    }

    //Get the current authenticate user
    let user = User.findById(req.mytoken._id).populate('tokens');

    let token = new Token({
        userid: user._id,
        token: newToken,
        platform: req.body.platform
    });


    //Store the token in the database through the user
    user.tokens.push(token);

    user.save(function (err) {
        if (err) {
            console.log('Error saving a new token for a user, line 52, file updateController.js'); //This because I am
                                                        // not pretty sure if I am doing well the saving data

            return next({code: 'NOT_MODIFIED', data: err });
        }
    });

    //All right my friend
    data = {
        user: user
    };

    //Send a response if no error or next with the error
    return next({code: 'CREATED', data: data});
});


/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/add_token', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});


module.exports = router;