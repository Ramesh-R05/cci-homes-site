export default {
    example: {
        path: '/patternlab/',
        method: 'get',
        handler: require('../components/example')
    },
    form: {
        path: '/patternlab/form',
        method: 'get',
        handler: require('../components/form')
    }
};
