export default {
    server: {
        port: 80
    },
    service: {
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
        host: 'http://dev.homes.wn.bauer-media.net.au'
    },
    features: {
        socialShareBlock: {
            enabled: true
        }
    }
};
