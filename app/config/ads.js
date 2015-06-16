import {merge} from 'lodash/object';
import breakpoints from '../breakpoints';
import adConfig from '@bxm/ad/src/google/config';

export default {
    init() {
        merge(adConfig, {
            breakpoints: breakpoints,
            siteId: 'FoodToLove',
            receiveContentAction: 'LOAD_CONTENT',
            tagsObject: 'articleTags',
            networkdId: 13534306
        });
    }
};
