import loadContent from '../actions/loadContent';
import homeHandler from '../components/home/home';
import articleHandler from '../components/article/section';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: homeHandler,
        label: 'Home',
        action: loadContent
    },

    section: {
        path: '/section',
        method: 'get',
        handler: require('../components/section/section'),
        label: 'section',
        action: loadContent
    },

    article: {
        path: '/:all*',
        method: 'get',
        handler: articleHandler,
        label: 'Article',
        action: loadContent
    }
};
