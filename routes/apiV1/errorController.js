"use strict";

var express = require('express');
var router = express.Router();

/**
 * Here we handle ther errors in the api
 */

// Catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// no stacktraces leaked to user
router.use(function(err, req, res, next) {

    let jsonResponse = {
        code: err.code,
        message: err.message
    };

    //if we are in development we send more details
    if (app.get('env') === 'development') {
        jsonResponse.error = err.error;
    }
    //We do not want to send any html,
    //We are an api, we just send json
    // response
    res.json({
        code: err.code,
        message: err.message
    });
});


module.exports = router;