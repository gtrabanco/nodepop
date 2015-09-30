"use strict";

var express = require('express');
var router = express.Router();
var indexController = require('./indexController');
var errorController = require('./errorController');

/**
 * To controll the index and any other routes I suggest one
 * index.js in every directory which runs as namespace
 * But as / Controller it would be nice to have
 * indexController.js file
 * errorController.js would be loaded the last to handle the errors
 */

router.use(indexController);


//All other routes in sub dirs here
router.use(/apiv1/i, require('./apiV1'));



//Error handler
router.use(errorController);

module.exports = router;
