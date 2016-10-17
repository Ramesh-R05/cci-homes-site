export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    server: {
        port: 3001
    },
    services: {
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
