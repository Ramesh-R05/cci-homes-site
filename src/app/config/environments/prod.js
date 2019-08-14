const accountId = '761709621001';
const playerId = 'cf879d82-c4b2-4c3b-9a03-ae8567a693fc';

export default {
    brightcove: {
        accountId,
        playerId,
        script: `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`
    },
    features: {
        galleryOfGalleries: {
            enabled: true
        },
        socialShareBlock: {
            enabled: true
        },
        lipstick: {
            enabled: false
        },
        listingsEmailTest: {
            enabled: false
        }
    },
    gigya: {
        apiKey: '3_PV8TmIRNKAgRIsjss-5ZrHQEcexerbmgDhJFUyTKWHZFPgou5P4QGIL8-zSsA-v5'
    },

    ads: {
        targets: ''
    },

    polar: {
        propertyId: 'NA-HOMETOLOVE-11237320',
        targets: {
            env: ''
        }
    },
    services: {
        remote: {
            entity: 'https://services.prod.bxm.net.au/entity/v1/homes',
            listings: 'https://services.prod.bxm.net.au/listing/v1/homes',
            module: 'https://services.prod.bxm.net.au/module/v1/homes',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/homes',
            tag: 'https://services.prod.bxm.net.au/tag/v1',
            search: 'https://services.prod.bxm.net.au/es-search/v1/homes',
            identity: 'https://live.dmp.bauer-media.net.au/api/identity'
        },
        redirect: {
            url: 'http://services.prod.bxm.internal/redirect/v1/homes/301'
        }
    },
    site: {
        host: 'http://www.homestolove.com.au',
        protocol: 'https'
    },
    homepageFilter: {
        excludedNodeIds: ['HOMES-14059'] // Home Directories (live)
    }
};
