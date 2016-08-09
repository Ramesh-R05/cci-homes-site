var accountId = '761709621001';
var playerId = 'cf879d82-c4b2-4c3b-9a03-ae8567a693fc';

export default {
    brightcove: {
        accountId: accountId,
        playerId: playerId,
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
        targets: ''
    },
    services: {
        content: {
            remote: 'http://live.homes-api.wn.bauer-media.net.au'
        },
        facetedModule: {
            remote: 'http://live.homes-api.wn.bauer-media.net.au'
        },
        redirect: {
            url: 'http://live.redirect.services.bauer-media.internal/v1/homes/301'
        }
    },
    site: {
        host: 'http://www.homestolove.com.au'
    }
};
