import loadContent from '../actions/loadContent';
import homeHandler from '../components/home/home';
import sectionHandler from '../components/section/section';
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
        handler: sectionHandler,
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
