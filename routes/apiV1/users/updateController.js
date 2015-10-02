"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');

var UserModel = require(path.join(process.cwd(), 'models', 'user'));

// /apiv[currentVersion]/users/:id/
// PUT/PATCH
//    id param is the _id
let modifyUserRoute = '/:id';
function modifyUserRoute(req, res, next) {
    let id =
}




// /apiv[currentVersion]/users/:_id/:action
//                                      - add_token
//                                      - remove_token
// PUT
// req.body.token


module.exports = router;