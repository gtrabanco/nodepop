"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');

var UserModel = require(path.join(process.cwd(), 'models', 'user'));

/**
 * If the user request / we redirect him/she to the
 * documentation because they do not want to use the api
 */

router.post('/register', function (req, res, next) {
    ////Reading the interesting vars (it is not neccesary
    // because mongoose only will get those that are
    // defined in the model).
    //let email    = req.body.email;
    //let passwd   = req.body.password;

    let newUser = new UserModel(req.body);

    let data = {};

    newUser.save(function (error, row) {
        if (error) {
            if (error.code === 11000) {
                data.email = {
                    message: 'The email is already registered'
                    };

            } else {
                if (typeof error.errors.email !== 'undefinied') {
                    data.email = {
                        message: 'The "email" is a required value.'
                        };
                }

                if (typeof error.errors.password !== 'undefinied') {
                    data.password = {
                        message: 'The "password" is a required value.'
                        };
                }
            }

            return next({code: 'INVALID_PARAM', data: data});
        }

        //Customize the response data of the user to not return the password
        data = {
            user: {
                _id: newUser._id,
                email: newUser.email
            }
        };

        next({code: 'CREATED', data: data});
    });

});


/*
//Error handler for this contoller
// we need to personalize the errors to give the enough
// and not less or more information to the user
// So we format the messages and send the error to
// next which should be /apiV1/errorController.js

router.use('/register', function (error, req, res, next) {
    if (error.code === 11000) {
        error.message = 'The email is already registered';
        error.errors.email = 'Duplicated, your email are already registered.';
    } else {
        if (typeof error.errors.email !== 'undefinied') {
            error.code = 400;
            error.errors.email = {
                message: 'The "email" is a required value.'
            }
        }

        if (typeof error.errors.password !== 'undefinied') {
            error.code = 400;
            error.errors.password = {
                message: 'The "password" is a required value.'
            }
        }
    }

    next(error);
});
//*/

module.exports = router;