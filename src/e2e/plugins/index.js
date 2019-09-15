const { taggedSpecPreprocessor } = require('@bxm/integration');

module.exports = (on, config) => {
    on('file:preprocessor', taggedSpecPreprocessor(config));
};
