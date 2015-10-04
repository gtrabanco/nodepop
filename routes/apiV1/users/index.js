// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();

/**
 * To controll the index and any other routes I suggest one
 * index.js in every directory which runs as namespace
 * But as / Controller it would be nice to have
 * indexController.js file
 * errorController.js would be loaded the last to handle the errors
 */

//Other no default routes
//First those that do not require authentication
router.use(require('./loginController'));
router.use(require('./registerController'));

//Here the middleware to auth user
router.use(require('authentication'));


//All other routes in sub dirs here
router.use(require('./tokenControllers'));


//Error if petition to /
/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});




module.exports = router;