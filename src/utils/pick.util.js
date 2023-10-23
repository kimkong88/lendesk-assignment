/**
 * Create an object composed of the picked object properties
 * @param {Object} object - The source object from which properties are picked.
 * @param {string[]} keys - An array of property keys to pick from the source object.
 * @returns {Object} - A new object containing the picked properties.
 */
const pick = (object, keys) => {
    // Use the Array.reduce method to build a new object.
    return keys.reduce((obj, key) => {
        // Check if the key exists in the source object.
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];

            // Custom way to handle empty value for non-existence check
            if (object[key] === "") obj[key] = null;
        }
        return obj;
    }, {});
};

module.exports = pick;
