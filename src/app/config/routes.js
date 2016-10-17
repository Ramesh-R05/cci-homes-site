import defaultPage from '../components/templates/default';
import loadContent from '../actions/loadContent';

export default {
    section: {
        path: '/:all*',
        method: 'get',
        handler: defaultPage,
        action: loadContent
    }
};
