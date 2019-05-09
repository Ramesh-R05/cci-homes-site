const sass = require('node-sass');
const path = require('path');

module.exports = function processSass(data, filename) {
    let result;

    result = sass.renderSync({
        data,
        file: filename
    }).css;

    return result.toString('utf8');
};
