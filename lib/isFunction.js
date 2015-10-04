/**
 * To check if var is a function
 * @param functionToCheck
 * @returns {*|boolean}
 */
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = isFunction;