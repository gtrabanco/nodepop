"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime-types');
var moveFile = require('moveFile');

var Announce = require(path.join(process.cwd(), 'models', 'announce'));


//Custom middleware to upload a file for the photo
router.post(function(req, res, next) {

    next();
});

// /apiv1[currentVersion]/announces/tags
// ANY METHOD
// Get a list of the avaible tags
router.all('/tags', function (req, res, next) {
    res.json(getCode('OK', {
        platforms: Announce.schema.path('tags').enumValues
    }));
});

// /apiv1[currentVersion]/announces/types
// ANY METHOD
// Get a list of the announce types
router.all('/types', function (req, res, next) {
    res.json(getCode('OK', {
        platforms: Announce.schema.path('type').enumValues
    }));
});

/**
 * Add announce
 *
 * /apiv[apiVersion]/announces/add
 */
router.post('/add', function (req, res, next) {

    //if (file) {
    //    let uploadDir = req.app.get('app config').app.upload_dir;
    //
    //    //First we need to check the file if the user send us one
    //    let file = req.file || {};
    //    let validMimeFiles = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];
    //
    //    //filesystem library
    //    let fs = require('fs');
    //
    //    if (validMimeFiles.indexOf(file.mimetype) === -1) {
    //
    //        //If it is not valid first delete the file
    //        fs.unlink(file.path);
    //
    //        return next({code: 'UNSUPPORTED_MEDIA', data: {}});
    //    }
    //
    //    //We could check if a file is also too large but I think is ok with this by the moment
    //    // it is just an exercise to know if we know enough node/js
    //
    //    //Valid file
    //    //Moving the file to the right path
    //    let photoName = path.basename(moveFile(file.path, uploadDir));
    //    if (photoName) {
    //        req.body.photo = photoName;
    //    } else {
    //        return next({code: 'INTERNAL', data: {}});
    //    }
    //}

    let newAnnounce = new Announce({
        title: req.body.title || '',
        type: req.body.type || '',
        price: req.body.price || '',
        photo: req.body.photo || '',
        tags: req.body.tags.split(',') || []
    });

    newAnnounce.save(function (error, row) {

        if (error) {
            console.log(error);
            let data = {};

            if (typeof error.errors.title === 'undefined') {
                data.title = {
                    message: 'The "title" is a required value.'
                };
            }

            if (typeof error.errors.type === 'undefined') {
                data.type = {
                    message: 'The "type" is a required value.'
                };
            }

            if (typeof error.errors.price === 'undefined') {
                data.price = {
                    message: 'The "email" is a required value.'
                };
            }

            if (typeof error.errors.photo === 'undefined') {
                data.photo = {
                    message: 'The "photo" is a required value.'
                };
            }

            if (typeof error.errors.tags === 'undefined') {
                data.tags = {
                    message: 'The "tags" is a required value.'
                };
            }

            return next({code: 'INVALID_PARAM', data: data});
        }


        return next({code: 'CREATED', data: row});
    })
});

/**
 * If user used invalid method for this route we must provide an error
 */
router.all('/add', function (req, res, next) {
    return next({code:'METHOD_FORBIDDEN'});
});



module.exports = router;