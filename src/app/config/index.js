import mergeWith from 'lodash.mergewith';
import logger from '../../logger';

logger.info(`loading config for ${process.env.APP_KEY}`);

const environment = (process.env.APP_ENV || process.env.NODE_ENV || 'local').toLowerCase();
const region = (process.env.APP_REGION || process.env.NODE_REGION || 'au').toLowerCase();
const configApi = {
    get(path, defaultValue = '') {
        return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), this) || defaultValue;
    },
    isFeatureEnabled(feature) {
        return this.get(`features.${feature}.enabled`, false);
    }
};

const config = require('./config');
logger.info('main config loaded');

// eslint-disable-next-line import/no-dynamic-require
const environmentConfig = require(`./environments/${environment}`);
logger.info(`${environment} config loaded`);

let regionConfig = {};
let regionEnvironmentConfig = {};
if (region) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    regionConfig = require(`./config.${region}.js`);
    logger.info(`${region} config loaded`);
    try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        regionEnvironmentConfig = require(`./environments/${region}/${environment}`);
        logger.info(`${region} ${environment} region config loaded`);
    } catch (e) {
        logger.info(`${region} ${environment} region config not found`);
    }
}

let stubbedConfig = {};
if (process.env.APP_STUBBED === 'true') {
    try {
        // eslint-disable-next-line global-require
        stubbedConfig = require('./environments/stubbed');
        logger.info('config loaded stubs');
    } catch (e) {
        logger.error('config failed to load stubs', e);
        throw new Error(e);
    }
}

const env = {
    APP_DEBUG: process.env.APP_DEBUG
};

const mergedConfig = mergeWith(
    env,
    configApi,
    config,
    environmentConfig,
    regionConfig,
    regionEnvironmentConfig,
    stubbedConfig,
    (objValue, srcValue) => (Array.isArray(objValue) ? srcValue : undefined)
);

export default mergedConfig;
