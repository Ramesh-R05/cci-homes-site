import defaultTemplate from '../components/templates/default';
import loadContent from '../actions/loadContent';
import loadPageContent from '../actions/loadPageContent';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    section: {
        path: '/:all*',
        method: 'get',
        handler: defaultTemplate,
        action: loadContent
    }
};
