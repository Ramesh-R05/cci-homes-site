export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    services: {
        remote: {
            entity: 'http://localhost:3001/stub/entity-service',
            listings: 'http://localhost:3001/stub/listings-service',
            module: 'http://localhost:3001/stub/module-service',
            sitemap: 'http://localhost:3001/stub/sitemap-service',
            tag: 'http://localhost:3001/stub/tag-service'
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
    }
};
