"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var jswt = require('jsonwebtoken');

var UserModel = require(path.join(process.cwd(), 'models', 'user'));

/**
 * Log In users
 *
 * @api {POST} /users/login
 * @apiName UserLogin
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiDescription Login for the users
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password for the user
 * @apiSuccess {String} code The text code that describes the returned value
 * @apiSuccess
 */

router.post('/login', function (req, res, next) {
    // Making esier the access to the vars
    let email    = req.body.email;
    let passwd   = req.body.password;
    let config   = req.app.get('app config').jswt;

    //Auth of the user
    UserModel.auth(email, passwd).
        then(function (user) {

            //User is formatted from the model to not return
            // the password
            let data = {
                user: user,
                token: jswt.sign(user, jswt.secret, jswt.options)
            };

            return next({code: 'LOGIN_OK', data: data});
        }).
        catch(function(error) {

            return next(error);
        });
});


/**
 * If user used invalid method for this route we must provide an error.
 *
 * @api {GET, PUT, DELETE, PATCH} /users/login
 * @apiName UsersLogin
 * @apiVersion 1.0.0
 * @apiDescription Return an standard output with the error of the
 * forbbiden methods for this petition.
 * @apiError {OBJECT} The method used is not allowed for this api action.
 */
router.all('/login', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});


module.exports = router;