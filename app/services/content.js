import request from 'superagent';
import {canUseDOM} from 'react/lib/ExecutionEnvironment.js';

let path;
let host = '';

export default {

    serviceName: 'content',

    init(config) {
        path = config.service.content.path;
        if (!canUseDOM) host = `${config.service.content.local}:${config.server.port}`;
    },

    read(deferred, params) {
        request.get(host + path + params.url).send().end((error, response) => {
            if (error) {
                console.error(`[service][content] ${error.response.error.status} ${error.response.error.path}`);
                deferred.reject(error);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

};
