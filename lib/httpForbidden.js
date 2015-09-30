"use strict";

/**
 * A middleware that check if the user is using a secure protocol or not
 * @param request
 * @param response
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

    //If wer are here we need to send an error the api
    // would not be accesible throught the http protocol
    // and the documentation site neither.
    var error = {
        status: 403,
        message: req.i18n.__("Forbidden access"),
        error: req.i18n.__("The site is only accesible throught the https protocol.")
    };

    //res.redirect('https://' + req.hostname + ':' + req.app.get('secure port') + req.originalUrl);
    if (req.originalUrl.match(/\/apiv[0-9]*/i)) {
        console.info(req.i18n.__('Returning an error for the api.'));
        res.status(403).json(error);
    }  else {
        console.info(req.i18n.__('Returning an error for the site.'));
        res.status(403);
        res.render('httpForbidden/error.ejs', {error: error});
    }
};