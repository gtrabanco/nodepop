"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');

var UserModel = require(path.join(router.get('app path'), 'models', 'user'));

/**
 * If the user request / we redirect him/she to the
 * documentation because they do not want to use the api
 */

router.post('/(new|register){1}', function (req, res, next) {

});


module.exports = router;