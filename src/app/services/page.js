import superagent from 'superagent';
import { canUseDOM } from 'exenv';

const host = canUseDOM ? '' : 'http://127.0.0.1:3001';

export default {

    serviceName: 'page',

    read(deferred, params) {
        superagent.get(`${host}/api/getPageContent`).query(params).then(
            response => deferred.resolve(response),
            error => deferred.reject(error)
        );
        return deferred.promise;
    }

};
