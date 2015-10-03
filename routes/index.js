"use strict";

var express = require('express');
var router = express.Router();

//All routes here, for subdir routes and those that would
// be considered as modules or are very complex use subdirs
// and add here the route to the module. Is expected to use
// index.js files. You can also use somethingConroller.js
// for /something route.
// The implementation is manual because I do not consider
// necessary the complexity of search in dirs and subdirs
// and add them automatically

//Default route for this path /
/**
 * If the user request / we redirect him/she to the
 * documentation because they do not want to use the api
 */

router.all('/', function (req, res, next) {
    return res.redirect('/doc'); //Doc is a static dir, so it is not
                                 // necessary to define it as a route
});



//All other routes in sub dirs here
router.use('/apiV1', require('./apiV1'));



//Default error handlers
/**
 * Here we handle the errors in the api
 */

// Catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error(req.i18n.__('Not Found'));
    err.status = 404;
    err.code = 404;
    next(err);
});

// error handlers
router.use(function(err, req, res, next) {

    let response = {
        code: err.code,
        message: err.message
    };

    //if we are in development we send more details
    if (req.app.get('env') === 'development') {
        response.error = err.error;
    }
    //We do not want to send any html,
    //We are an api, we just send json
    // response
    //res.render('index/error', {error: response})
    res.status(err.status||500).send(response);
});

module.exports = router;
