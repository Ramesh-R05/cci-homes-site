import React from 'react';
import PropTypes from 'prop-types';

export default function FooterSlot({ Component, footerProps }) {
    if (!Component || typeof Component !== 'function') {
        return null;
    }

    return <Component {...footerProps} />;
}

FooterSlot.displayName = 'FooterSlot';

FooterSlot.propTypes = {
    Component: PropTypes.func,
    footerProps: PropTypes.object
};

FooterSlot.defaultProps = {
    Component: null,
    footerProps: {}
};
