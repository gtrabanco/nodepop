// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();

//Routes of this controller



//All other routes in sub dirs here
router.use('/users', require('./users'));

//Error handler for /apiV1 path
router.use(require('./errorController'));;


module.exports = router;