import superagent from 'superagent';
// https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}
export default {
    read(params) {
        return superagent
            .post('https://www.google.com/recaptcha/api/siteverify')
            .query(params)
            .then(response => response, error => error);
    }
};
