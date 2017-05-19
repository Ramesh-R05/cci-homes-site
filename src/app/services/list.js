import superagent from 'superagent';
import { canUseDOM } from 'exenv';

const host = canUseDOM ? '' : 'http://127.0.0.1:3001';

export default {

    serviceName: 'list',

    read(deferred, params) {
        superagent.get(`${host}/api/list`).query(params).end((error, response) => {
            if (error) deferred.reject(error);
            else deferred.resolve(response);
        });
        return deferred.promise;
    }

};
