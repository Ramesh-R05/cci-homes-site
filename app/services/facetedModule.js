import * as _ from 'lodash';
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
            var moduleId = settings.moduleConfig.modules[settings.moduleConfig.lynxStoreName];
            var url = host + path + "/" + moduleId + '?node=' + settings.moduleConfig.entityId;

            if (!_.isEmpty(settings.params)) {
                url += "&" + toQueryString(settings.params);
            }

            console.log('[service][facetedModule][read] url = ', url);

            request.get(url).send().end((err, res) => {
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
}();

var toQueryString = function(obj) {
    return _.map(obj, function(v, k) {
        if (!_.isArray(v)) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        } else {
            return encodeURIComponent(k) + '=' + _.map(v, (val) => {
                  return encodeURIComponent(val);
              }).join(',');
        }
    }).join('&');
};