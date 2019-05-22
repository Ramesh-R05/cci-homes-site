import React from 'react';
import PropTypes from 'prop-types';

export default function CheckHeaderTheme(WrappedComponent = () => {}) {
    if (!WrappedComponent || typeof WrappedComponent !== 'function') {
        return null;
    }

    function HeaderThemeCheck(props) {
        const { theme } = props;

        const themeEnabled = !!theme && !!theme.headerSmallBackground && !!theme.headerMediumBackground && !!theme.headerLargeBackground;

        return <WrappedComponent {...props} theme={themeEnabled ? theme : {}} />;
    }

    HeaderThemeCheck.displayName = `${WrappedComponent.displayName}HeaderThemeCheck`;

    HeaderThemeCheck.propTypes = {
        theme: PropTypes.shape({
            headerSmallBackground: PropTypes.string,
            headerMediumBackground: PropTypes.string,
            headerLargeBackground: PropTypes.string,
            headerLogoAlignment: PropTypes.string,
            headerLogoColour: PropTypes.string,
            themeAlignment: PropTypes.string,
            themeColour: PropTypes.string,
            themeImage: PropTypes.string
        })
    };

    HeaderThemeCheck.defaultProps = {
        theme: {}
    };

    return HeaderThemeCheck;
}
