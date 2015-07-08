export default {
    services: {
        content: {
            remote: 'http://localhost:3000',
            local: 'http://localhost',
            path: '/api/content'
        },
        facetedModule: {
            remote: 'http://localhost:3000',
            local: 'http://localhost',
            path: '/api/content/faceted'
        },
        header: {
            url: 'http://localhost:4000/stub/header'
        },
        redirect: {
            url: 'http://localhost:4000/stub/redirect'
        }
    },
    site: {
        host: 'http://localhost'
    }
};
