import liveConfig from './live';
import merge from 'lodash/object/merge';

export default merge(liveConfig, {
    services: {
        content: {
            remote: 'http://cms.live.homes.wn.bauer-media.net.au'
        },
        facetedModule: {
            remote: 'http://cms.live.homes.wn.bauer-media.net.au'
        }
    }
});
