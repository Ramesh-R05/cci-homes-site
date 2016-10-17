import facetedModuleService from '../services/facetedModule';

export function getPage(context, payload) {
    return context.getService(facetedModuleService).read(payload).then(
        (content) => {
            context.dispatch('FACETED_MODULE:PAGE_RECEIVED', {
                lynxStoreName: payload.moduleConfig.lynxStoreName,
                content: content.body
            });
        },
        (error) => {
            context.dispatch('FACETED_MODULE:PAGE_RECEIVED:FAILURE', {
                lynxStoreName: payload.moduleConfig.lynxStoreName,
                content: error
            });
        }
    );
}
