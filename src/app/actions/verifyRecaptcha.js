import recaptchaService from '../services/recaptcha';

export default function verifyRecaptcha(context, payload) {
    // todo : the secret key needs storing in the config later etc just trying to get working first
    const vericationValues = { secretKey: '6LeMu6AUAAAAAIZypfo4OJSvjm2cuL3AYzqgEps1', response: payload };

    return recaptchaService
        .read(vericationValues)
        .then(
            content => {
                if (content instanceof Error) {
                    context.dispatch('VERIFY_RECAPTCHA_FAILED', content);
                } else {
                    context.dispatch('VERIFY_RECAPTCHA', { ...content });
                }
            },
            error => context.dispatch('VERIFY_RECAPTCHA_FAILED', error)
        )
        .catch(error => context.dispatch('VERIFY_RECAPTCHA_FAILED', error));
}
