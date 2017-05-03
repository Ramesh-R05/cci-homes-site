import defaultTemplate from '../components/templates/default';
import loadPageContent from '../actions/loadPageContent';
import pageNotFound from '../actions/pageNotFound';

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
        path: '/:brand(belle|real-living|homes-plus|australian-house-and-garden)',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    navSection: {
        path: '/:navSection',
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
