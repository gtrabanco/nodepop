"use strict";

// Secret is to do it unaccessible to git
module.exports = {
    "https": {
        "activate": true,
        "key": ".keys/local.nodepop.api-key.pem",
        "cert": ".keys/local.nodepop.api-cert.crt",
        "passphrase": ""
    },
    "database": {
        "connectionString": "mongodb://localhost:27017/nodepop",
        "options": {
            /**
             * In this case the options are not necessary

            "db": { "native_parser": true },
            "server": { "poolSize": 5},
            "replset": { "rs_name": "" },
            "user": "",
            "password": ""
            */
        }
    },
    "jsonwebtoken": {
        //We could use a pair of private/public keys
        // but I think for this a secret long password
        // is the better solution
        "secret": "a$%Djdk89s\"%9@jfslsfsc,vm091y5ncñlkdawwdi",
        "options": {
            "algorithm": "HS384",
            "expiresIn": 86400 * 2 //86400 seconds = 1 day
        }
    }
};