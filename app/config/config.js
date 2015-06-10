import * as loader from './loader';
import merge from 'lodash/object/merge';
import breakpoints from '../breakpoints';

const envConfig = loader.load(process.env.NODE_ENVIRONMENT);

const config = {
    brightcove: {
        accountId: '761709621001',
        playerId: 'cf879d82-c4b2-4c3b-9a03-ae8567a693fc'
    },

    gigya: {
        apiKey: 'GIGYA-API-KEY-NOT-SET'
    },

    global: {
        breakpoints,
        typekit: 'TYPEKIT-ID-NOT-SET',
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
            remote: 'http://dev.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/content'
        },
        facetedModule: {
            remote: 'http://dev.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/facetedModule'
        }
    }

};

export default Object.freeze(merge(config, envConfig));
