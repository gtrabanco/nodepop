"use strict";

var sprintf = require('sprintf').sprintf;


/**
 * Function to get the configurated url if url is a file path or url if it is a url
 * @param req
 * @param url
 * @returns {String}
 */
function formatedUrl(req, url) {

    if (typeof url === 'string' && !(url.match(/^http.+/i))) {
        let domain_uploads_path = req.app.get('app config').app.domain_uploads_path;

        url = sprintf('%s://%s%s%s', req.protocol, req.get('host'), domain_uploads_path, url);
    }

    return url;
}

module.exports = formatedUrl;