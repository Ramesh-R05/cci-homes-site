import * as loader from './loader';
import merge from 'lodash/object/merge';
import breakpoints from '../breakpoints';

const envConfig = loader.load(process.env.NODE_ENVIRONMENT);

let config = {

    typekit: {
        id: 'mmp8xzm'
    },

    gtm: {
        id: ''
    },

    brightcove: {
        accountId: '761709621001',
        playerId: 'cf879d82-c4b2-4c3b-9a03-ae8567a693fc'
    },

    gigya: {
        apiKey: 'GIGYA-API-KEY-NOT-SET'
    },

    global: {
        breakpoints,
        googleAds: {
            slotPrefix: 'gpt-slot-',
            networkId: 'GOOGLE-ADS-NETWORKID-NOT-SET',
            siteId: 'GOOGLE-ADS-SITEID-NOT-SET'
        }
    },

    polar: {
        propertyId: 'PROPERTY-ID-NOT-SET',
        targets: {'env': 'test'}
    },

    site: {
        host: 'http://localhost',
        name: 'Homes To Love',
        prefix: 'HOMES',
        network: 'wn'
    },

    server: {
        port: 80
    },

    service: {
        content: {
            remote: 'http://live.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/content'
        }
    },

    services: {
        header: {
            url: 'https://s3-ap-southeast-2.amazonaws.com/digital-services/header/prod/globalheader.json'
        }
    }

};

let mergedConfig = merge(config, envConfig);

// allows old sites and new sites to use configEditor middleware and verfiySite middleware
mergedConfig.server.apiUrl = mergedConfig.service.content.remote.replace('http://', '');

export default Object.freeze(mergedConfig);
