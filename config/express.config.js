"use strict";

/**
 * This is the express configuration file
 * I recommend to put all values in spite they have a default
 *  values because they can change in future version and we
 *  do not want a different result.
 *  @link http://expressjs.com/api.html#app.settings.table
 */

module.exports = {
    "case sensitive routing": false,
    "env"                   : process.env.NODE_ENV || "production", //The app prefer Enviroment vars
    "etag"                  : "weak",
    "json callback name"    : "?callback=",
    "json replacer"         : null,
    "json spaces"           : 4,
    "query parser"          : "extended",
    "strict routing"        : false,
    "subdomain offset"      : 2,
    "trust proxy"           : false,
    "views"                 : process.cwd() + "/views",
    "views cache"           : !(this.env === "development"),
    "view engine"           : "ejs",
    "x-powered-by"          : false,
    "logger"                : (this.env === "development"?"dev":"short") //default, short, tiny or dev
};