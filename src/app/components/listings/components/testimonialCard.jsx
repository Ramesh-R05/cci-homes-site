import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function TestimonialCard({ name, company, message }) {
    const companyStr = company.split(',');

    return (
        <article className="testimonial-card">
            <div className="testimonial-card__message">{message}</div>
            <div className="testimonial-card__name">{name}</div>
            <div className="testimonial-card__company">
                <h3 className="testimonial-card__company-title">
                    {companyStr.length > 1 ? (
                        <Fragment>
                            <span className="testimonial-card__company--role"> {`${companyStr[0]},`}</span>
                            <span className="testimonial-card__company--name">{`${companyStr[1]}`}</span>{' '}
                        </Fragment>
                    ) : (
                        <span className="testimonial-card__company--role"> {`${companyStr[0]}`} </span>
                    )}
                </h3>
            </div>
        </article>
    );
}

TestimonialCard.displayName = 'TestimonialCard';

TestimonialCard.propTypes = {
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};
