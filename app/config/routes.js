import loadContent from '../actions/loadContent';
import sectionHandler from '../components/section/section';
import sectionHandler from '../components/section/section';

export default {
    api: {
        path: '/api/:all*',
        method: 'get'
        action: loadContent
    },

    section: {
        path: '/section',
        method: 'get',
        handler: sectionHandler,
        label: 'section',
    },
    section: {
        path: '/:all*',
        method: 'get',
        handler: require('../components/templates/default'),
        action: require('../actions/loadContent')
    }
};
