"use strict";


// @link http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#http-status
module.exports = {
    'LOGIN_OK'          : {
        status : 200,
        message: 'Login successful'
    },
    'OK'                : {
        status : 200,
        message: 'Ok'
    },
    'CREATED'           : {
        status : 201,
        message: 'Created'
    },
    'UPDATED'           : {
        status : 201,
        message: 'Updated'
    },
    'NOT_CONTENT'       : {
        status : 204,
        message: 'Not content avaible for the request'
    },
    'TOKEN_ERROR'       : {
        status : 300,
        message: 'Invalid token, it could be expired or damaged'
    },
    'LOGIN_ERROR'       : {
        status : 301,
        message: 'User or password incorrect'
    },
    'NOT_MODIFIED'      : {
        status : 304,
        message: 'Not modified'
    },
    'REQUEST_ERROR'     : {
        status : 400,
        message: 'Bad request'
    },
    'LOGIN_FAILED'      : {
        status : 401,
        message: 'Authentication failed'
    },
    'FORBIDDEN'         : {
        status : 403,
        message: 'Forbidden access'
    },
    'NO_HTTP'           : {
        status : 403,
        message: 'No http conection allowed. Please use https.'
    },
    'NOT_FOUND'         : {
        status: 404,
        message: 'Not found'
    },
    'PAGE_NOT_FOUND'    : {
        status : 404,
        message: 'Page not found'
    },
    'METHOD_FORBIDDEN'  : {
        status : 405,
        message: 'Method not allowed'
    },
    'UNSUPPORTED_MEDIA' : {
        status : 415,
        message: 'Unsupported media type'
    },
    'NOT_PROCESSABLE'   : {
        status : 422,
        message: 'Not processable entity'
    },
    'INVALID_PARAM'     : {
        status : 422,
        message: 'Invalid param'
    },
    'ERROR'             : {
        status : 500,
        message: 'Unrecognized error'
    },
    'INTERNAL'          : {
        status : 500,
        message: 'Internal server error'
    },
    'UNAVAIBLE'         : {
        status : 503,
        message: 'Service unavaible'
    }
};