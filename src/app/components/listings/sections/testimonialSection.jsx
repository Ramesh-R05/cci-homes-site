import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TestimonialCard from '../components/testimonialCard';
import SectionWrapper from '../components/sectionWrapper';

export default function TestimonialSection({ testimonials }) {
    if (!testimonials || !Array.isArray(testimonials)) {
        return null;
    }

    return (
        <SectionWrapper sectionClass="testimonial-section" sectionId="testimonial-section">
            <div className="row testimonial-section__title-row">
                <div className="columns small-12 testimonial-section__title-column">
                    <h1 className="heading heading--large"> What People Say </h1>
                </div>
            </div>
            <div className="row testimonial-section__testimonials-row">
                {testimonials.map((testimonial, i) => {
                    const key = `testimonial-${i}`;
                    const columnBaseClasses = classNames('columns small-12', {
                        'large-4': true,
                        'large-offset-4': i === 0 && testimonials.length === 1,
                        'large-offset-2': i === 0 && testimonials.length === 2,
                        end: i === testimonials.length - 1,
                        'testimonial-section__testimonial-column': true
                    });

                    return (
                        <div key={key} className={`${columnBaseClasses}`}>
                            <TestimonialCard {...testimonial} />
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}

TestimonialSection.displayName = 'TestimonialSection';

TestimonialSection.propTypes = {
    testimonials: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            company: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        })
    ).isRequired
};
