export default {
    example: {
        path: '/patternlab/',
        method: 'get',
        handler: require('../components/example')
    },
    buttons: {
        path: '/patternlab/buttons',
        method: 'get',
        handler: require('../components/buttons')
    },
    form: {
        path: '/patternlab/form',
        method: 'get',
        handler: require('../components/form')
    }
};
