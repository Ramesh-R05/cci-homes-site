import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm({ formProps, contactForm, recaptcha }) {
    if (!formProps || (contactForm && contactForm.sendSuccessStatus)) {
        return null;
    }

    const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = formProps;

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__input-group">
                <input
                    id="email"
                    placeholder="Email Address"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.email && touched.email ? 'contact-form__text-input contact-form__text-input--error' : 'contact-form__text-input'
                    }
                />
                {errors.email && touched.email && <div className="contact-form__input-feedback">{errors.email}</div>}
            </div>

            <div className="contact-form__input-group">
                <textarea
                    id="message"
                    placeholder="Message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.message && touched.message ? 'contact-form__textarea contact-form__textarea--error' : 'contact-form__textarea'}
                />
                {errors.message && touched.message && <div className="contact-form__input-feedback">{errors.message}</div>}
            </div>
            <p className="contact-form__grecaptcha">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </p>
            <ReCAPTCHA ref={recaptcha.recaptchaRef} size="invisible" sitekey={recaptcha.siteKey} />
            <button className="contact-form__button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Message' : 'Send Message'}
            </button>
            {contactForm && contactForm.sendSuccessStatus === false && <div className="contact-form__error-msg">{contactForm.message}</div>}
        </form>
    );
}

ContactForm.displayName = 'ContactForm';

ContactForm.propTypes = {
    formProps: PropTypes.shape({
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }).isRequired,
    contactForm: PropTypes.object,
    recaptcha: PropTypes.object
};

ContactForm.defaultProps = {
    contactForm: null,
    recaptcha: null
};
