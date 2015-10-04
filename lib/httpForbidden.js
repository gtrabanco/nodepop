"use strict";

//Get Code
var getCode = require('getCode');

/**
 * A middleware that check if the user is using a secure protocol or not
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

module.exports = function (req, res, next) {

    //If the dev wants http as well should put false
    if (req.app.get('app config').app.onlyHttps === false) {
        //it is not neccesary to check
        return next();
    }

    //If we are here we want secure protocol, please.
    //Check if we are using a secure protocol
    if (req.secure) {
        return next();
    }

    //Getting the error
    let jsonResponse = getCode('NO_HTTP', {});

    //res.redirect('https://' + req.hostname + ':' + req.app.get('secure port') + req.originalUrl);
    if (req.originalUrl.match(/\/apiv[0-9]*/i)) {

        jsonResponse.message = req.i18n.__(jsonResponse.message);
        res.status(jsonResponse.status);
        res.json(jsonResponse);
    }  else {
        res.status(jsonResponse.status);
        res.render('httpForbidden/error', {error: getCode('NO_HTTP')});
    }
};