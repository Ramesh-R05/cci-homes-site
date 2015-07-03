export default {
    server: {
        port: 8080
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
        }
    },
    site: {
        host: 'http://localhost'
    },
    features: {
        socialShareBlock: {
            enabled: true
        }
    }
};
