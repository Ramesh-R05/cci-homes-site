export default {
    example: {
        path: '/patternlab/',
        method: 'get',
        handler: require('../components/article')
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
    },
    teasers: {
        path: '/patternlab/teasers',
        method: 'get',
        handler: require('../components/teasers')
    },
    article: {
        path: '/patternlab/article',
        method: 'get',
        handler: require('../components/article')
    },
    feed: {
        path: '/patternlab/feed',
        method: 'get',
        handler: require('../components/feed')
    },
    social: {
        path: '/patternlab/social',
        method: 'get',
        handler: require('../components/social')
    }
};
