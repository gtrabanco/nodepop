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

/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/register', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});


module.exports = router;