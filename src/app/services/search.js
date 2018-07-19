import superagent from 'superagent';
import { canUseDOM } from 'exenv';
import get from 'lodash.get';

const host = canUseDOM ? '' : 'http://127.0.0.1:3001';

export default {

    serviceName: 'search',

    read(deferred, params) {
        const pageNo = parseInt(get(params, 'pageNo', get(params, 'params.pageNo', 1)), 10);
        const keyword = get(params, 'q', get(params, 'params.query', ''));

        superagent
            .get(`${host}/api/search?q=${keyword}&pageNo=${pageNo}`)
            .end((error, response) => {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(response);
                }
            }
        );
        return deferred.promise;
    }

    // read(params) {
    //     // need to do this bcs can't pass through full params to Superagent when
    //     // running on amazon linux. trips up on some stringify recursion. Solution
    //     // is to create a new params object with only properties that we need.
    //     // There's a difference between client side and server side query property name.
    //     const q = canUseDOM ? params : { params: params.params };
    //     return superagent.get(`${host}/api/search`).query(q).then(
    //         response => response,
    //         error => error
    //     );
    // }

};
