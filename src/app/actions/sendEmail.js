import { validateRouteParams } from '@bxm/flux';
import emailService from '../services/email';

function sendEmail(context, payload) {
    return emailService
        .read(payload)
        .then(
            content => {
                if (content instanceof Error) {
                    context.dispatch('SEND_EMAIL_FAILED', content);
                } else {
                    context.dispatch('SEND_EMAIL', { ...content });
                }
            },
            error => context.dispatch('SEND_EMAIL_FAILED', error)
        )
        .catch(error => context.dispatch('SEND_EMAIL_FAILED', error));
}

export default validateRouteParams(sendEmail);
