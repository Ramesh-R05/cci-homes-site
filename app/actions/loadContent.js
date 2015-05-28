import contentService from '../services/content';

export default function(context, payload) {
    return context.getService(contentService).read({url: payload.get('url')}).then(
        (content) => {
            context.dispatch('LOAD_CONTENT', content);
        },
        (error) => {
            console.error('[action][load content][failed]', error);
            context.dispatch('LOAD_CONTENT_FAILED', error);
        }
    );
}
