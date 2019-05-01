import React from 'react';
import PropTypes from 'prop-types';

export default function Summary({ streetAddress, subheading, copy }) {
    return (
        <div className="summary">
            <p className="summary__address">{streetAddress}</p>
            <p className="summary__sub-heading">{subheading}</p>
            <p className="summary__copy">{copy}</p>
        </div>
    );
}

Summary.displayName = 'Summary';

Summary.propTypes = {
    streetAddress: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired
};
