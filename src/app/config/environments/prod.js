export default {
    features: {
        galleryOfGalleries: {
            enabled: true
        },
        socialShareBlock: {
            enabled: true
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

    googleNativeAds: {
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
            identity: 'https://live.dmp.aremedia.net.au/federation/api/identity'
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
