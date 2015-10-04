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

router.put('/add_token', function (req, res, next) {

    let data = {};

    //Get the token
    let newToken = req.body.pushtoken || null;

    if (!newToken) {
        data = {
            token: req.i18n.__('You should provide a token.')
        };

        return next({code: 'INVALID_PARAM', data: data});
    }

    //Check if the token exists in the database and if it is not null
    // return error if exists or is null
    return Token.findOne({token: newToken}).exec(function (error, result) {
        if (error) {
            data = {
                token: req.i18n.__('Already exists')
            };

            return next({code: 'INVALID_PARAM', data: data});
        }

        //Get the current authenticate user
        return User.findById(req.mytoken._id, '-password').populate('_tokens').exec(function (error, user) {

            if (error) {
                return next({code: 'NOT_MODIFIED', data: {}});
            }


            //Token Model with data
            let token = new Token({
                userid: user._id,
                token: newToken,
                platform: req.body.platform
            });

            //Store the token in user document
            user._tokens.push(token);

            user.save(function (err) {
                if (err) {
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
    });

    //Now I am doing the doc and I knew but I didn't realize that
    // I could use Promises to do this because mongoose from v. ~4
    // has implemented promises
});


/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/add_token', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});


module.exports = router;