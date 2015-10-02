"use strict";

var express = require('express');
var router = express.Router();

/**
 * Here we handle the errors in the api
 */

// error handlers
// no stacktraces leaked to user
router.use(function(err, req, res, next) {

    let jsonResponse = {
        status: err.status,
        message: err.message
    };

    //if we are in development we send more details
    if (req.app.get('env') === 'development') {
        jsonResponse.error = err.error;
    }
    //We do not want to send any html,
    //We are an api, we just send json
    // response
    res.json({
        status: err.status,
        code: err.code,
        message: req.i18n.__(err.message),
        errors: err.errors || {}
    });
});


module.exports = router;