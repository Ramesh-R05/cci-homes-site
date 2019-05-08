import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import sendEmail from '../../../actions/sendEmail';
import verifyRecaptcha from '../../../actions/verifyRecaptcha';
import ContactForm from './contactForm';
import trackListingContactFormSubmit from '../../../actions/trackListingContactFormSubmit';

export default class ContactFormWrapper extends Component {
    static displayName = 'ContactFormWrapper';

    static propTypes = {
        emailAddress: PropTypes.string.isRequired,
        contactForm: PropTypes.object,
        listingName: PropTypes.string.isRequired
    };

    static defaultProps = {
        contactForm: null
    };

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func.isRequired
    };

    componentDidUpdate() {
        const { executeAction } = this.context;
        const { listingName, contactForm } = this.props;

        if (contactForm && contactForm.sendSuccessStatus) {
            executeAction(trackListingContactFormSubmit, { listingName });
        }
    }

    emailSendHandler = values => {
        if (!values) {
            return;
        }

        const { emailAddress } = this.props;
        const { executeAction } = this.context;

        const emailValues = {
            fromEmail: values.email,
            toEmail: emailAddress,
            message: values.message
        };
        executeAction(sendEmail, emailValues);
    };

    reCaptchaVerificationHandler = res => {
        const { executeAction } = this.context;
        executeAction(verifyRecaptcha, res);
        // TODO :
        // const result = executeAction(verifyRecaptcha, res);
        // The response/result is a JSON object from Google
        // {
        //     "success": true|false,
        //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
        //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
        //     "error-codes": [...]        // optional
        // }

        // return result.success // true or false in success attribute coming from google response
        return true; // placeholder
    };

    recaptchaHandler = (recaptchaRef, values) => {
        const widgetId = recaptchaRef.current.getWidgetId();
        recaptchaRef.current.execute(widgetId);
        // const recaptchaRes = window.grecaptcha.getResponse(widgetId);
        const recaptchaRes = recaptchaRef.current.getValue();

        if (recaptchaRes) {
            // a challenge has been triggered then Google needs to verify the result
            const recaptchaVerificationResult = this.reCaptchaVerificationHandler(recaptchaRes);

            if (recaptchaVerificationResult) {
                this.emailSendHandler(values);
            } else {
                recaptchaRef.current.reset(widgetId);
                this.recaptchaHandler(recaptchaRef, values);
            }
        } else {
            this.emailSendHandler(values);
        }
    };

    render() {
        const { emailAddress, contactForm } = this.props;
        const { config } = this.context;
        const recaptchaRef = React.createRef();
        const gRecaptcha = {};
        gRecaptcha.recaptchaRef = recaptchaRef;
        gRecaptcha.siteKey = config.grecaptcha.siteKey;

        if (!emailAddress) {
            return null;
        }

        return (
            <div className="contact-form-wrapper">
                {contactForm && contactForm.sendSuccessStatus && <div className="contact-form-wrapper__success-msg">{contactForm.message}</div>}
                <Formik
                    initialValues={{ email: '', message: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            this.recaptchaHandler(recaptchaRef, values);
                            setSubmitting(false);
                        }, 500);
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email()
                            .required('Required'),
                        message: Yup.string().required('Required')
                    })}
                    render={props => <ContactForm contactForm={contactForm} formProps={props} recaptcha={gRecaptcha} />}
                />
            </div>
        );
    }
}
