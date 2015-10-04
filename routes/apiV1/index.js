// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();
var getCode = require('getCode');

//Routes of this controller



//All other routes in sub dirs here
router.use('/users', require('./users')); //This has the authentication where it
                    // needs so this module must be upper the authentication call

//Auth
router.use(require('authentication'));

//From this point all things in the api that requires authentication
router.use('/announces', require('./announces'));

/**
 * Here we handle the errors in the api
 */
//If we are here we should return a default error with a middleware
router.use(function (req, res, next) {

    let err = {
        code: 'NOT_FOUND',
        data: {}
    };

    return next(err);
});

/**
 * Here we handle all the responses in the api, they are not necessary an error
 *
 */
router.use(function(err, req, res, next) {

    //console.log(err); //When debugging I use to uncomment this
    //First check if code is defined in err
    if (!('code' in err)) {
        //If not, define a default code
        err.code = 'INTERNAL';

    }

    let jsonData = getCode(err.code, err.data);
    //Translate the message first
    jsonData.message = req.i18n.__(jsonData.message);
    res.status(jsonData.status);
    res.json(jsonData);
});


module.exports = router;