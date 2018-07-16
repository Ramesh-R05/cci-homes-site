export default {
    polar: {
        propertyId: 'NA-HOMETOLOVEDEVSTAG-11237319',
        targets: { env: 'test3' }
    },
    services: {
        faceBookAppID: '852557544824192',
        remote: {
            entity: 'http://localhost:3001/stub/entity-service',
            listings: 'http://localhost:3001/stub/listings-service',
            module: 'http://localhost:3001/stub/module-service',
            sitemap: 'http://localhost:3001/stub/sitemap-service',
            tag: 'http://localhost:3001/stub/tag-service',
            search: 'http://localhost:3001/stub/search-service'
        }
    },
    site: {
        host: 'http://homes-site.test.bxm.net.au'
    },
    ads: {
        targets: { env: 'test3' },
        iasAds: false
    }
};
