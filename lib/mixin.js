"use strict";


/**
 * Function to merge two objects
 * Copied from the link in spite of we have done in the course...
 *
 * @link http://stackoverflow.com/a/383245/4944453
 */

/**
 * Function to merge recursively two objects
 *
 * @param obj1
 * @param obj2
 * @returns {*}
 */
function mixin(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = mixin(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}


module.exports = mixin;