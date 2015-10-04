"use strict";


// Users
var userData = {
    email: 'sample@example.com',
    password: '12345'
};

//Token
//It will be assigned for the first user
var tokenData = {
    platform: 'ios',
    token: 'ajdfkj245j289S6748993sdsfk'
};

// Announces
var announcesData = [{
    title: 'iPhone 4s',
    type: 'sell',
    price: 60,
    photo: 'iphone4s.jpg',
    tags: ['work', 'mobile'],
    modified: new Date()
}, {
    title: 'Ball',
    type: 'sell',
    price: 8,
    photo: 'ball.jpg',
    tags: ['lifestyle'],
    modified: new Date()
}, {
    title: 'Ferrari Car',
    type: 'buy',
    price: 600000,
    photo: 'ferrari.jpg',
    tags: ['motor'],
    modified: new Date()
}];


//Used function to report errors
function error_reporting(error, result) {
    if (error) {
        console.log('Error ', error);
        process.exit(-1);
    }

    return result;
}

//Required lib
var deasync = require('deasync');
var async   = require('async');

try {
    deasync(require('../lib/mongoConnector'));
} catch (e) {
    console.log('Unable to connect to Database');
}


// Models
var User = require('../models/user');
var Token = require('../models/token');
var Announce = require('../models/announce');


//Create the run function to drop and insert the data
console.log('Deleting all data in the collections');


async.series([
    function (cb) {
        Token.remove({}, function (error) {
            if (error) {
                cb(error, null);
            }

            cb(null, true);
        });
    },
    function (cb) {
        User.remove({}, function (error) {
            if (error) {
                cb(error, null);
            }

            cb(null, true);
        });
    },
    function (cb) {
        Announce.remove({}, function (error) {
            if (error) {
                cb(error, null);
            }

            cb(null, true);
        });
    },
    function (cb) {
        var dummyUser = new User(userData);
        var dummyToken = new Token(tokenData);

        dummyUser._tokens.push(dummyToken);
        dummyToken._user = dummyUser;
        dummyToken.save(function (error, token) {
            if (error) {
                cb(error, null);
            }

            dummyUser.save(function (error, user) {
                if (error) {
                    cb(error, null);
                }

                cb(null, true);
            });
        });
    },
    function (cb) {
        var dummyAnnounce = {};
        for (let key in announcesData) {
            dummyAnnounce = new Announce(announcesData[key]);
            console.log('Trying to add the %s announce', announcesData[key].title);

            dummyAnnounce.save(function (error) {
                if (error) {
                    console.log('Announce NOT saved: ', announcesData[key].title);
                }
            });
        }

        console.log('Dummy data saved');

        return cb(null, true);
    }
    //,
    //function (cb) {
    //    console.log('Example of find with populate');
    //
    //    Token.find().populate('_user', '-password').exec(function (error, tokens) {
    //        console.log('-------- Tokens --------');
    //        console.log(tokens);
    //    });
    //
    //    User.findOne().populate('tokens').exec(function (error, user) {
    //        console.log('-------- Users ---------');
    //        console.log(user);
    //    });
    //
    //    Announce.find({}, '',function (error, announce) {
    //        console.log('------ Announces -------');
    //        console.log(announce);
    //    });
    //}
    , function (cb) {
        process.exit();
    }
], error_reporting);

