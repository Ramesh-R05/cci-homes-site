export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    server: {
        port: 3001
    },
    services: {
        remote: {
            entity: 'http://localhost:3001/stub/entity-service',
            listings: 'http://localhost:3001/stub/listings-service',
            module: 'http://localhost:3001/stub/module-service',
            sitemap: 'http://localhost:3001/stub/sitemap-service',
            tag: 'http://localhost:3001/stub/tag-service'
        }
    },
    site: {
        host: 'http://127.0.0.1:3001'
    }
};
