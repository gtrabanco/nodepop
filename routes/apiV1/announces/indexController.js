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
    let options = {};
    let fields = {};

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


        //Now the options
        options = {
            skip: req.query.start || 0,
            limit: req.query.limit || 1000
        };

        //Sorting
        //console.log('price'.match(/([-+]?)(.+)/i)); // [ 'price', '', 'price', index: 0, input: 'price' ]
        if (typeof req.query.sort !== 'undefined') {
            let matches = req.query.sort.match(/([-+]?)(.+)/i);
            let field = matches[2];
            let order = (matches[1] === '-'? -1: 1);

            //Check if the field exists, if not order by modified date
            if (Announce.schema.paths.hasOwnProperty(field)) {

                options.sort [field] = order;
            } else {

                options.sort = {
                    modified: 1
                }
            }

            console.log(options);
        }


        //We should add total or not?
        if (typeof req.query.includeTotal !== 'undefinied' && req.query.includeTotal === 'true') {

            req.includeTotal = true;
        } else {

            req.includeTotal = false;
        }


        Announce.findWithReq(req, filters, fields, options, function (error, announces) {

            if (error) {
                console.log(error);
                return next({code: 'NOT_CONTENT', data: {}});
            }

            return next({code: 'OK', data: announces});
        });
    }
});

// /apiv1[currentVersion]/announces/fields
router.all('/fields', function (req, res, next) {
    var props = [];

    for (let property in Announce.schema.paths) {
        if (property === '__v') {
            continue;
        }

        props.push(property);
    }

    return next({
        code: 'OK',
        data: {
            fields: props
        }
    });
});

// /apiv1[currentVersion]/announces/fields
router.all('/field_tags', function (req, res, next) {
    return next({
        code: 'OK',
        data: {
            enum: Announce.schema.paths.tags.options.enum
        }
    });
});

/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});




module.exports = router;