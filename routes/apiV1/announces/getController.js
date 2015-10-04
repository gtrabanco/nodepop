"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
//var isUrl = require('isUrl');
var sprintf = require('sprintf').sprintf;

var Announce = require(path.join(process.cwd(), 'models', 'announce'));


// /apiv1[currentVersion]/announces
// GET
// Get a list of the announces
router.get('/', function (req, res, next) {

    let filters = {};

    //If the user give us an id we do not need to check the filters
    // because id is a unique key in a collection
    if (typeof req.query.id !== 'undefined') {

        Announce.findByIdWithReq(req, req.query.id, function (error, result) {

            if (result) {
                return next({code: 'OK', data: result});
            }else{

                return next({code: 'NOT_CONTENT', data: result});
            }
        });
    } else {
        //Filters!!
        //One or array
        if (typeof req.query.tag !== 'undefined') {
            filters.tags = req.query.tag;
        }

        if (typeof req.query.type !== 'undefined' && req.query.type.toLowerCase() in ['sell', 'buy']) {
            filters.type = req.query.type;
        }

        if (typeof req.query.price !== 'undefined') {

            let min=null, max=null;
            let range = req.query.price.split('-');


            if (range.length > 1) {
                min = parseInt(range[0]) || 0;
                max = parseInt(range[1]) || 0;
            } else {
                min = 0;
                max = parseInt(range);
            }

            if (max === 0 || max < min) {
                filters.price = {$gt: min};
            } else {
                filters.price = {$gt: min, $lt: max};
            }
        }

        //Return from a timestamp
        if (typeof req.query.timestamp !== 'undefined') {
            filters.modified = {$gt: req.query.timestamp};
        }

        //Search by name
        if (typeof req.query.title !== 'undefined') {
            filters.title = new RegExp(sprintf('^%s', req.query.title), 'i');
        }


        Announce.findWithReq(req, filters, function (error, announces) {

            if (error) {
                console.log(error);
                return next({code: 'NOT_CONTENT', data: {}});
            }

            return next({code: 'OK', data: announces});
        });

    }
});

/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});




module.exports = router;