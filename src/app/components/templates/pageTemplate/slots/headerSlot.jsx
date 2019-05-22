import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderSlot({ Component, currentUrl, navItems, toggleMenuFunc, headerProps, siteName }) {
    if (!Component || typeof Component !== 'function') {
        return null;
    }

    return <Component currentUrl={currentUrl} navItems={navItems} toggleMenu={toggleMenuFunc} siteName={siteName} {...headerProps} />;
}

HeaderSlot.displayName = 'HeaderSlot';

HeaderSlot.propTypes = {
    Component: PropTypes.func.isRequired,
    headerProps: PropTypes.object,
    currentUrl: PropTypes.string.isRequired,
    navItems: PropTypes.array,
    toggleMenuFunc: PropTypes.func.isRequired,
    siteName: PropTypes.string.isRequired
};

HeaderSlot.defaultProps = {
    headerProps: {},
    navItems: []
};
