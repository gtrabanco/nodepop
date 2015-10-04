// TODO: Api load routes

"use strict";

var express = require('express');
var router = express.Router();

//All other routes in sub dirs here

router.use(require('./indexController'));
router.use(require('./addController'));


module.exports = router;