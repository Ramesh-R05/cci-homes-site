const selectTests = require('cypress-select-tests');
const { taggedSpecPreprocessor } = require('@bxm/automation');

module.exports = (on, config) => {
    on('file:preprocessor', selectTests(config, taggedSpecPreprocessor));
};
