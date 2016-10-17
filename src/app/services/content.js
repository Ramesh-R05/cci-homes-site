import request from 'superagent';
import {canUseDOM} from 'exenv';

let path;
let host = '';

export default {

    serviceName: 'content',

    init(config) {
        path = config.services.content.path;
        if (!canUseDOM) host = `${config.services.content.local}:${config.server.port}`;
    },

    read(deferred, params) {
        request.get(host + path + params.url).send().end((error, response) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

};
