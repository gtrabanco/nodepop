"use strict";

let mongoose = require('../lib/mongoConnector');


// Models
var User = require('../models/user');
var Token = require('../models/token');
var Announce = require('../models/announce');

// Users
var userData = {
    email: 'sample1@example.com',
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

//Create the run function to drop and insert the data
function run () {
    console.log('Deleting all data in the collections');

    new Promise(function (resolve, data) {
        Token.remove({}, function (error) {
            if (error) {
                return reject(error);
            }

            return resolve(data);
        });
    }).
        then(function (resolve, reject) {
            User.remove({}, function (error, data) {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        }).
        then(function (resolve, reject) {
            Announce.remove({}, function (error, data) {
                if (error) {
                    return reject(error);
                }

                resolve(data);
            });
        }).
        then(function (resolve, reject) {
            var dummyUser = new User(userData);
            var dummyToken = new Token(tokenData);
            dummyUser.tokens .push(dummyToken);
            dummyUser.save(function (error, data) {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        }).
        then(function (resolve, reject) {
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

            return resolve(true);

            console.log('Dummy data saved');
        }).
        catch(function (error) {
            console.log('Error saving data ', error);
        });
}


//Program init
mongoose.connection.promise