import {merge} from 'lodash/object';
import breakpoints from '../breakpoints';
import adConfig from '@bxm/ad/lib/google/config';

export default {
    init() {
        merge(adConfig, {
            breakpoints: breakpoints,
            pageTypes: {
                NavigationSection: 'index',
                HomesArticle: 'article'
            },
            siteId: 'HomesToLove',
            tagsObject: 'articleTags'
        });
    }
};
