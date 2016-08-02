export default {
    polar: {
        propertyId: 'NA-HOMETOLOVE-AUTOMATION'
    },
    server: {
        port: 8080
    },
    services: {
        content: {
            remote: 'http://127.0.0.1:3000',
            local: 'http://127.0.0.1',
            path: '/api/content'
        },
        facetedModule: {
            remote: 'http://127.0.0.1:3000',
            local: 'http://127.0.0.1',
            path: '/api/content'
        },
        header: {
            url: 'http://127.0.0.1:4000/stub/header'
        },
        redirect: {
            url: 'http://127.0.0.1:4000/stub/redirect'
        }
    },
    site: {
        host: 'http://127.0.0.1:8080'
    }
};
