import superagent from 'superagent';
import { canUseDOM } from 'exenv';
import get from 'lodash.get';

const host = canUseDOM ? '' : 'http://127.0.0.1:3001';

export default {
    read(params) {
        const pageNo = parseInt(get(params, 'pageNo', get(params, 'params.pageNo', 1)), 10);
        const keyword = get(params, 'q', get(params, 'params.query', ''));

        // Need to do this bcs can't pass through full params to Superagent when running on amazon linux.
        // Trips up on some stringify recursion.
        // Solution is to create a new params object with only properties that we need.
        // There's a difference between client side and server side query property name.
        return superagent.get(`${host}/api/search?q=${keyword}&pageNo=${pageNo}`).then(response => response, error => error);
    }
};
