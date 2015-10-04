"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mime = require('mime-types');
var moveFile = require('moveFile');

var Announce = require(path.join(process.cwd(), 'models', 'announce'));


//Custom middleware to upload a file for the photo
router.post(function(req, res, next) {
    let uploadDir = req.app.get('app config').app.upload_temp_dir;

    router.post(multer({dest: uploadDir}).single('filephoto'));
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
router.all('/tags', function (req, res, next) {
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

    let uploadDir = req.app.get('app config').app.upload_dir;


    //First we need to check the file if the user send us one
    let file = req.file || {};
    let validMimeFiles = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

    if (file) {

        //filesystem library
        let fs = require('fs');

        if (validMimeFiles.indexOf(file.mimetype) === -1) {

            //If it is not valid first delete the file
            fs.unlink(file.path);

            return next({code: 'UNSUPPORTED_MEDIA', data: {}});
        }

        //We could check if a file is also too large but I think is ok with this by the moment
        // it is just an exercise to know if we know enough node/js

        //Valid file
        //Moving the file to the right path
        let photoName = path.basename(moveFile(file.path, uploadDir));
        if (photoName) {
            req.photo = photoName;
        } else {
            return next({code: 'INTERNAL', data: {}});
        }
    }

    /*
    let newAnnounce = new Announce({
        title: 'iPhone 4s',
        type: 'sell',
        price: 60,
        photo: req.photo,
        tags: req.body.tags
    }); */

    let newAnnounce = new Announce({
        title: req.body.title || '',
        type: req.body.type || '',
        price: req.body.price || '',
        photo: req.photo || '',
        tags: req.body.tags || []
    });

    newAnnounce.save(function (error, row) {

        if (error) {
            let data = {};

            if (typeof error.errors.title !== 'undefinied') {
                data.title.message = 'The "email" is a required value.';
            }

            if (typeof error.errors.type !== 'undefinied') {
                data.type.message = 'The "password" is a required value.';
            }

            if (typeof error.errors.price !== 'undefinied') {
                data.price.message = 'The "email" is a required value.';
            }

            if (typeof error.errors.photo !== 'undefinied') {
                data.photo.message = 'The "password" is a required value.';
            }

            if (typeof error.errors.tags !== 'undefinied') {
                data.tags.message = 'The "email" is a required value.';
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