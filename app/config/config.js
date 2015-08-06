import breakpoints from '../breakpoints';

export default {

    typekit: {
        id: 'mmp8xzm'
    },

    gtm: {
        id: 'GTM-KG7F8H'
    },

    brightcove: {
        accountId: '761709621001',
        playerId: 'cf879d82-c4b2-4c3b-9a03-ae8567a693fc'
    },

    gigya: {
        apiKey: '3_ghsdy4V7gVQHU_8eFfPgTAKIw-3ct5dXWtLoc86lIcHaPQOswMYyMkMKCe377vah'
    },

    features: {
        socialShareBlock: {
            enabled: true
        },
        loadMoreBtn: {
            enabled: true
        },
        recommendations: {
            enabled: true
        }
    },

    pagination: {
        nbFirstPageItems: 20,
        nbLoadMoreItems: 18
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
        url: '//plugin.mediavoice.com/plugin.js',
        propertyId: 'NA-HOMETOLOVEDEVSTAG-11237319',
        targets: { env: 'test' },
        adSize: '2x2',
        server: 'dfp'
    },

    site: {
        host: 'http://dev.homes-site.wn.bauer-media.net.au',
        name: 'HOMES TO LOVE',
        prefix: 'HOMES',
        network: 'wn'
    },

    server: {
        port: 80
    },

    services: {
        content: {
            remote: 'http://dev.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/content'
        },
        facetedModule: {
            remote: 'http://dev.homes-api.wn.bauer-media.net.au',
            local: 'http://127.0.0.1',
            path: '/api/facetedModule'
        },
        header: {
            url: 'https://s3-ap-southeast-2.amazonaws.com/digital-services/header/prod/globalheader.json'
        },
        redirect: {
            site: 'homes',
            url: 'http://dev.redirect.services.bauer-media.net.au'
        }
    }

};
