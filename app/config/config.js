import * as loader from './loader';
import merge from 'lodash/object/merge';

const envConfig = loader.load(process.env.NODE_ENVIRONMENT);

const config = {

    gigya: {
        apiKey: 'GIGYA-API-KEY-NOT-SET'
    },

    global: {
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
            remote: 'http://live.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/content'
        }
    }

};

export default Object.freeze(merge(config, envConfig));
