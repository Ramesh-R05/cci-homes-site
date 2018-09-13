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
            entity: 'http://services.prod.bxm.internal/entity/v1/homes',
            listings: 'http://services.prod.bxm.internal/listing/v1/homes',
            module: 'http://services.prod.bxm.internal/module/v1/homes',
            sitemap: 'http://sitemap-service.prod.bxm.net.au/v1/homes',
            tag: 'http://services.prod.bxm.internal/tag/v1',
            search: 'http://services.prod.bxm.internal/es-search/v1/homes'
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
