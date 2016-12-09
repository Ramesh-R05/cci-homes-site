import superagent from 'superagent';
import {canUseDOM} from 'exenv';

let host = '';
let path = '';

export default {

    serviceName: 'list',

    init(config) {
        path = config.services.endpoints.list;

        if (!canUseDOM) {
            host = config.services.host || `${config.services.local}:${config.server.port}`;
        } else {
            host = config.services.host || '';
        }
    },

    read(deferred, params) {
        superagent.get(host + path).query(params).end((error, response) => {
            if (error) {
                console.error(`[service][${path}] ${error.response.error.status} ${error.response.error.path}`);
                deferred.reject(error);
            } else {
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }

};
