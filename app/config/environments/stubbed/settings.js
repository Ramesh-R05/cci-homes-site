export default {
    server: {
        port: 8080
    },
    service: {
        content: {
            remote: 'http://127.0.0.1:3000',
            local: 'http://127.0.0.1',
            path: '/api/content'
        }
    },
    site: {
        host: 'http://127.0.0.1'
    }
};
