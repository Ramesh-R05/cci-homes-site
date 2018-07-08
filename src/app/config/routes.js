import defaultTemplate from '../components/templates/default';
import loadPageContent from '../actions/loadPageContent';
import pageNotFound from '../actions/pageNotFound';
import loadSearch from '../../app/actions/loadSearch';
import SearchPage from '../../app/components/section/search/section';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    tags: {
        path: '/tags/:tag*',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    campaigns: {
        path: '/campaigns/:campaign',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    search: {
        path: '/search/:query',
        method: 'get',
        handler: SearchPage,
        action: loadSearch
    },
    preview: {
        path: '/:preview(preview)/:page(.*-):id([0-9]+)',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    page: {
        path: '/:page(.*-):id([0-9]+)',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    brand: {
        path: '/:brand(belle|real-living|homes-plus|australian-house-and-garden|inside-out|country-style|homelife)',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    navSection: {
        path: '/:navSection*',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    all: {
        path: '/:all*',
        method: 'get',
        handler: defaultTemplate,
        action: pageNotFound
    }
};
