"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');

var Announce = require(path.join(process.cwd(), 'models', 'announce'));


// /apiv1[currentVersion]/announces
// GET
// Get a list of the announces
router.get('/', function (req, res, next) {
    Announce.find().exec(function (error, announces) {
        if (error) {
            return next({code: 'ERROR', data: {}});
        }

        return next({code: 'OK', data: announces});
    })
});



module.exports = router;