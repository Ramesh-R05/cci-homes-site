export default {
    section: {
        path: '/:all*',
        method: 'get',
        handler: require('../components/templates/default'),
        action: require('../actions/loadContent')
    }
};
