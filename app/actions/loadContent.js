import contentService from '../services/content';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

export default function(context, payload) {
    if (canUseDOM) return false;
    return context.getService(contentService).read({url: payload.get('url')}).then(
        (content) => {
            context.dispatch('LOAD_CONTENT', content);
        },
        (error) => {
            console.error(`[action][load content][failed] ${error.response.error.status} ${error.response.error.path}`);
            context.dispatch('LOAD_CONTENT_FAILED', error);
        }
    );
}
