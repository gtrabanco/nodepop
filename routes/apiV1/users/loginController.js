"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var jswt = require('jsonwebtoken');

var UserModel = require(path.join(process.cwd(), 'models', 'user'));

/**
 * Log In users
 *
 * /apiv[apiVersion]/users/login
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
            let token = jswt.sign(user,jswt.secret, jswt.options);
            let response = {
                code: 200,
                message: req.i18n.__('User logged successfully'),
                data: {
                    user: user,
                    token: token
                }
            };

            return res.json(response);
        }).
        catch(function(error) {

            return next(error);
        });
});


module.exports = router;