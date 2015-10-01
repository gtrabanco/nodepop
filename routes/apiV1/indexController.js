"use strict";

var express = require('express');
var router = express.Router();

/**
 * If the user request / we redirect him/she to the
 * documentation because they do not want to use the api
 */

router.all('/', function (req, res, next) {
    console.log('Body ', req.body);
    console.log('Params ', req.params);
    console.log('Query', req.query);
    //res.redirect('/doc');
    res.send('Nothing');
});


module.exports = router;