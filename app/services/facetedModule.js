import isEmpty from 'lodash/lang/isEmpty';
import map from 'lodash/collection/map';
import request from 'superagent';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

export default function() {
    let path;
    let host = '';

    return {
        serviceName: 'facetedModule',

        init(config) {
            path = config.service.facetedModule.path;
            if (!canUseDOM) {
                host = `${config.service.facetedModule.local}:${config.server.port}`
            } else {
                if (config.service.noDomain) { // dang: we need a domain for superagent testing
                    host = `${config.service.noDomain}:${config.server.port}`
                }
            }
        },

        read(deferred, settings) {
            const moduleId = settings.moduleConfig.modules[settings.moduleConfig.lynxStoreName];
            let url = `${host}${path}/${moduleId}?node=${settings.moduleConfig.entityId}`;

            if (!isEmpty(settings.params)) {
                url += "&" + toQueryString(settings.params);
            }

            console.log('[service][facetedModule][read] url = ', url);

            request.get(url).end((err, res) => {
                if (err) {
                    console.info('[ERROR][service][facetedModule] %j', err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

            return deferred.promise;
        }
    };
}()

let toQueryString = function(obj) {
    return map(obj, function(v, k) {
        if (!Array.isArray(v)) {
            return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
        } else {
            return `${encodeURIComponent(k)}=${v.map(val => encodeURIComponent(val)).join(',')}`;
        }
    }).join('&');
};
