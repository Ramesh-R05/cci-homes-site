import facetedModuleService from '../services/facetedModule';
import * as _ from 'lodash';

export function getPage(context, payload:GetPageParameters) {
    console.log('[FacetedModuleAction][getPage]', payload);
    return context.getService(facetedModuleService).read(payload).then(
      (content) => { getPageSuccess(context, payload, content); },
      (content) => { getPageFailure(context, payload, content); });
}

export function getPageSuccess(context, payload, content) {
    context.dispatch('FACETED_MODULE:PAGE_RECEIVED', {
        lynxStoreName: payload.moduleConfig.lynxStoreName,
        content: content.body
    });
}

export function getPageFailure(context, payload, content) {
    context.dispatch('FACETED_MODULE:PAGE_RECEIVED:FAILURE', {
        lynxStoreName: payload.moduleConfig.lynxStoreName,
        content: content
    });
}

class GetPageParameters {
    page:Number;
    params:Array;
    moduleConfig:ModuleConfiguration;
}