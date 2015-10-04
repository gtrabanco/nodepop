"use strict";

var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var sprintf = require('sprintf').sprintf;
var randomid = require('randomid');

/**
 * Moves a file generating a new name with the correct
 * file extension for the destiny file based in the
 * mime type
 * @param filePath Complete path of the file to move
 * @param toDir The complete path of the dir where the file will be located with a new name
 * @returns Boolean||String String of the path followed to copy the file
 */
function moveFile(filePath, toDir) {

    let mimetype = mime.lookup(filePath);
    console.log(mimetype);
    let extension = mime.extension(mimetype);
    console.log(extension);


    let ts = Math.round((new Date()).getTime() / 1000); //Current timestamp for
                                                    // the filename if the file is valid
    let generatedName = sprintf('%s%s.%s', ts, randomid(8), extension);
    let completeToPath = path.join(toDir, generatedName);

    //If the generated name exits in the toDir path we generate another name
    try {
        fs.statSync(completeToPath);
    } catch (e) {
        //console.log(e);
        return moveFile(filePath, toDir);
    }

    //Moving the file
    try {
        fs.renameSync(filePath, completeToPath);
        return completeToPath;
    } catch (e) {
        //console.log(e);
        return false;
    }

}

module.exports = moveFile;