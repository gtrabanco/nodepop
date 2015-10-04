"use strict";


/**
 * Configuration file of the app
 */

// Secret is to do it unaccessible to git
module.exports = {
    'upload_temp_dir': 'uploads',
    'upload_dir'   : 'public/images/products/',
    'domain_uploads_path' : '/images/products/',
    'locales'    :['en', 'es'], //first is the default language
    'clusterMode'  : true, //This will be ommited in development mode
    'onlyHttps'    : true,
    'serve-static'       : { // @link http://expressjs.com/api.html#express.static
        'public': {
            'dotfiles'     : 'ignore',
            'etag'         : true,
            'extensions'   : false,
            'index'        : 'index.html',
            'lastModified' : true,
            'maxAge'       : 0,
            'redirect'     : true,
            'setHeaders'   : null
        } //We can add more static dirs here with their configuration if not default express config is applied
    },
    'language': {
        'locales'          : ['en', 'es'],
        //'defaultLocale'    : 'en',
        //'cookieName'       : 'lang', //This not used in this app
        'directory'        : 'locales', //Relative to the application directory
        'extensions'       : '.js',
        'ident'            : '    ',
        'subdomain'        : false,
        'session'          : false,
        //'sessionVarName'   : 'lang', //not used in this app
        'query'            : true, //req.query.lang
        'prefLocale'       : true  // Set the language through the accept-language header
        //'devMode' is written in the app.js basec on env variable
        //'base' should be used in the app.js, it is not right to use
        //  functions in configuration files
        //'register' is not neccesary to overwrite the default behaviour
    }
};