"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var Announce = require(path.join(process.cwd(), 'models', 'announce'));


//Custom middleware to upload a file for the photo
router.post(function(req, res, next) {
    let uploadDir = req.app.get('app config').app.upload_dir;

    router.post(multer({dest: uploadDir}).single('filephoto'));
    next();
});

/**
 * Add announce
 *
 * /apiv[apiVersion]/announces/add
 */

router.post('/add', function (req, res, next) {
    /**
     * Example of req.file
{ fieldname: 'onefile',
  originalname: 'Captura de pantalla 2015-09-22 a las 12.22.31.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/Users/gtrabanco/MyCodes/nodejs/21_express_file_upload_with_multer/upload',
  filename: '5c6eecfe229d3afc8c262f8aba87251c',
  path: '/Users/gtrabanco/MyCodes/nodejs/21_express_file_upload_with_multer/upload/5c6eecfe229d3afc8c262f8aba87251c',
  size: 20847 }

     http://stackoverflow.com/questions/28104012/design-pattern-for-writing-a-list-of-filters-for-image-uploading-using-node-js
     http://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk

     */
    let newAnnounce = new Announce({
        title: 'iPhone 4s',
        type: 'sell',
        price: 60,
        photo: req.file,
        tags: req.body.tags
    });

    newAnnounce.save(function (error, row) {

        let data = {};

        if (error) {
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
        }

    })
});


module.exports = router;