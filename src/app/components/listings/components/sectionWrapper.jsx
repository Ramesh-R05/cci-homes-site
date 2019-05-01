import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function SectionWrapper({ sectionClass, children, hasGreyBackground }) {
    if (!sectionClass || !children) {
        return null;
    }

    const sectionClassName = classNames(sectionClass, 'listing-section', {
        'listing-section--grey-background': hasGreyBackground
    });

    const gridContainerClass = classNames('container', {
        [`${sectionClass}__container`]: sectionClass
    });

    return (
        <section className={sectionClassName}>
            <div className={gridContainerClass}>{children}</div>
        </section>
    );
}

SectionWrapper.displayName = 'SectionWrapper';

SectionWrapper.propTypes = {
    sectionClass: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
    hasGreyBackground: PropTypes.bool
};

SectionWrapper.defaultProps = {
    hasGreyBackground: false
};
