import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import sendEmail from '../../../actions/sendEmail';
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
        const {
            listingName,
            contactForm: { sendSuccessStatus }
        } = this.props;

        if (sendSuccessStatus) {
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
                            recaptchaRef.current.execute();
                            this.emailSendHandler(values);
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
