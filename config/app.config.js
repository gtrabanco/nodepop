"use strict";


/**
 * Configuration file of the app
 */

// Secret is to do it unaccessible to git
module.exports = {
    "upload_dir"   : "public/images/products/",
    "languages"    :["en", "es"], //first is the default language
    "clusterMode"  : true, //This will be ommited in development mode
    "onlyHttps"    : true,
    "serve-static"       : { // @link http://expressjs.com/api.html#express.static
        "public": {
            "dotfiles"     : "ignore",
            "etag"         : true,
            "extensions"   : false,
            "index"        : "index.html",
            "lastModified" : true,
            "maxAge"       : 0,
            "redirect"     : true,
            "setHeaders"   : null
        } //We can add more static dirs here with their configuration if not default express config is applied
    }
};