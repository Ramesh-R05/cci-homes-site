import defaultTemplate from '../components/templates/default';
import loadPageContent from '../actions/loadPageContent';
import pageNotFound from '../actions/pageNotFound';
import loadSearch from '../actions/loadSearch';
import loadDirectoriesContent from '../actions/loadDirectoriesContent';
import loadDirectoryContent from '../actions/loadDirectoryContent';
import SearchPage from '../components/section/search/section';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    tags: {
        path: '/tags/:tag([/])?',
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
    directoryListingSinglePreview: {
        path: '/:preview(preview)/directory([/])?:category([^/]+)?([/])?:listing(.*-)?:id([0-9]+)?([/])?',
        method: 'get',
        handler: defaultTemplate,
        action: loadDirectoryContent
    },
    directory: {
        path: '/directory([/])?:category([^/]+)?([/])?:listing(.*-)?:id([0-9]+)?([/])?',
        method: 'get',
        handler: defaultTemplate,
        action: loadDirectoryContent
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
    directories: {
        path: '/directories',
        method: 'get',
        handler: defaultTemplate,
        action: loadDirectoriesContent
    },
    navSection: {
        path: '/:navSection([/])?',
        method: 'get',
        handler: defaultTemplate,
        action: loadPageContent
    },
    all: {
        path: '/:all([/])?',
        method: 'get',
        handler: defaultTemplate,
        action: pageNotFound
    }
};
