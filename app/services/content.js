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
        request.get(host + path + params.url).send().end((err, res) => {
            if (err) {
                console.info('[ERROR][service][content]', err);
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

};
