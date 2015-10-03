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
router.use(require('./loginController'));
router.use(require('./registerController'));

//Here the middleware to auth user
//router.use(require('authentication');

router.use(require('./tokenControllers'));


//All other routes in sub dirs here



module.exports = router;