export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    server: {
        port: 3001
    },
    services: {
        remote: {
            entity: `http://localhost:3001/stub/entity-service`,
            module: `http://localhost:3001/stub/module-service`
        },
        content: {
            remote: 'http://127.0.0.1:3001',
            local: 'http://127.0.0.1',
            path: '/stub'
        },
        facetedModule: {
            remote: 'http://127.0.0.1:3001',
            local: 'http://127.0.0.1',
            path: '/stub'
        }
    },
    site: {
        host: 'http://127.0.0.1:3001'
    }
};
