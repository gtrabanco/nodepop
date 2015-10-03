// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();
var getCode = require('getCode');

//Routes of this controller



//All other routes in sub dirs here
router.use('/users', require('./users'));
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

// Response handlers we do not only return errors with this
router.use(function(err, req, res, next) {

    //First check if code is defined in err
    if (!('code' in err)) {
        //If not, define a default code
        err.code = 'INTERNAL';

    }

    let jsonData = getCode(err.code, err.data);
    res.status(jsonData.status);
    res.json(jsonData);
});


module.exports = router;