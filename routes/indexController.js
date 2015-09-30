"use strict";

var express = require('express');
var router = express.Router();

/**
 * If the user request / we redirect him/she to the
 * documentation because they do not want to use the api
 */

router.get('/', function (req, res, next) {
    res.redirect('/doc');
});


module.exports = router;