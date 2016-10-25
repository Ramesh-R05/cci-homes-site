import superagent from 'superagent';
import {canUseDOM} from 'exenv';

let url = '';

export default {

    serviceName: 'page',

    init(config) {
        const { host, local, endpoints: { page: path } } = config.services;
        url = ((canUseDOM) ? host || '' : (host || `${local}:${config.server.port}`)) + path;
    },

    read(deferred, params) {
        superagent.get(url).query(params).then(
            (response) => deferred.resolve(response),
            (error) => deferred.reject(error)
        );
        return deferred.promise;
    }

};
