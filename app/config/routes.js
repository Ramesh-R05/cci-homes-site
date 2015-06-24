import loadContent from '../actions/loadContent';

export default {
    api: {
        path: '/api/:all*',
        method: 'get',
        action: loadContent
    },
    section: {
        path: '/:all*',
        method: 'get',
        handler: require('../components/templates/default'),
        action: require('../actions/loadContent')
    }
};
