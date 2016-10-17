import contentService from '../services/content';
import {canUseDOM} from 'exenv';

export default function(context, payload) {
    if (canUseDOM) return false;
    return context.getService(contentService).read(payload).then(
        (content) => {
            context.dispatch('LOAD_CONTENT', content);
        },
        (error) => {
            context.dispatch('LOAD_CONTENT_FAILED', error);
        }
    );
}
