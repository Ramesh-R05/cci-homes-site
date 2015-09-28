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
        galleryOfGalleries: {
            enabled: true
        },
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

    ads: {
        targets: {'env': 'test'}
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
        shortName: 'Homes To Love',
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
        },
        googlePlusUrl: 'https://plus.google.com/+HomesToLoveAu/',
        faceBookAppID: '852557544824192'
    },

    localeData: {
        magShop: {
            magshopCoverImage: 'magazines.png',
            magshopCoverAltText: 'Women\'s Weekly Cookbooks',
            magshopHeading: 'More ways to read',
            magshopText: 'Subscribe to our homes mags to gain access to more inspiring homes and gardens, plus renovating, decorating, food and travel stories.',
            magshopUrl: 'https://www.magshop.com.au/store/homestolove'
        },
        newsletterIframeUrl: 'https://d4jqclkssewcy.cloudfront.net/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=homes_to_love'
    }

};
