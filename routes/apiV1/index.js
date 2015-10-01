// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();
var indexController = require('./indexController');
var errorController = require('./errorController');

/**
 * To controll the index and any other routes I suggest one
 * index.js in every directory which runs as namespace
 * It also gives any response to /
 * errorController.js would be loaded the last to handle the errors
 */

router.use(indexController);

//Routes of this controller



//All other routes in sub dirs here
router.use('/users', require('./users'));

//Error handler for /apiV1 path
router.use(errorController);


module.exports = router;