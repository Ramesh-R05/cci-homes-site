import isEmpty from 'lodash/lang/isEmpty';
import map from 'lodash/collection/map';
import request from 'superagent';
import {canUseDOM} from 'exenv';

function toQueryString(obj) {
    return map(obj, (v, k) => {
        if (!Array.isArray(v)) {
            return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
        }
        return `${encodeURIComponent(k)}=${v.map(val => encodeURIComponent(val)).join(',')}`;
    }).join('&');
}

let path;
let host = '';

export default {

    serviceName: 'facetedModule',

    init(config) {
        path = config.services.facetedModule.path;
        if (!canUseDOM) {
            host = `${config.services.facetedModule.local}:${config.server.port}`;
        } else {
            if (config.services.noDomain) { // dang: we need a domain for superagent testing
                host = `${config.services.noDomain}:${config.server.port}`;
            }
        }
    },

    read(deferred, settings) {
        const moduleId = settings.moduleConfig.modules[settings.moduleConfig.lynxStoreName];
        let url = `${host}${path}/${moduleId}?node=${settings.moduleConfig.entityId}`;

        if (!isEmpty(settings.params)) {
            url += '&' + toQueryString(settings.params);
        }

        request.get(url).end((error, response) => {
            if (error) {
                console.error(`[service][facetedModule] ${error.response.error.status} ${error.response.error.path}`);
                deferred.reject(error);
            } else {
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }
};
