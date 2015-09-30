"use strict";

var express = require('express');
var router = express.Router();
//var indexController = require('./indexController');
var errorController = require('./errorController');

/**
 * To controll the errors requesting a bad url reading the doc
 */

router.use(indexController);


//All other routes in sub dirs here

//Error handler for /apiV1 path
router.use(errorController);


module.exports = router;