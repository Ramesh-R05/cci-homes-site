export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    services: {
        remote: {
            entity: 'http://automation.homes-site.bauer-media.net.au/stub/entity-service',
            listings: 'http://automation.homes-site.bauer-media.net.au/stub/listings-service',
            module: 'http://automation.homes-site.bauer-media.net.au/stub/module-service',
            sitemap: 'http://automation.homes-site.bauer-media.net.au/stub/sitemap-service',
            tag: 'http://automation.homes-site.bauer-media.net.au/stub/tag-service'
        },
        content: {
            remote: 'http://localhost:3001',
            local: 'http://localhost',
            path: '/stub'
        },
        facetedModule: {
            remote: 'http://localhost:3001',
            local: 'http://localhost',
            path: '/stub'
        }
    },
    site: {
        host: 'http://automation.homes-site.wn.bauer-media.net.au'
    },
    ads: {
        targets: {'env': 'test3'}
    }
};
