import merge from 'lodash/object/merge';
import breakpoints from '../breakpoints';
import adConfig from '@bxm/ad/lib/google/config';

export default {
    init() {
        merge(adConfig, {
            breakpoints: breakpoints,
            pageTypes: {
                NavigationSection: 'index',
                BrandSection: 'index',
                HomesArticle: 'article',
                Campaign: 'index'
            },
            siteId: 'HomesToLove',
            tagsObject: 'tags',
            sizes: {
                native: [250, 30],
                'leaderboard-wide': [760, 120]
            }
        });
    }
};
