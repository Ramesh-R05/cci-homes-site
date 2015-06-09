import React from 'react';
import _ from 'lodash';
/**
 * Usage
 *
 * export theme(YourComponent, 'sourcePropertyName');
 * Where 'sourcePropertyName' represents the 'source' for the encapsulated component which should be accessible @ this.props[sourcePropertyName]
 *
 * render() {
 *     const {className,  themeClass} = this.props;
 *     const cssClass = classNames(className, themeClass);
 *
 * Replace styles/helpers/_theme.scss with the updated list of sanitized source name coming from the setThemeClass() func.
 */

let theme = (Component, sourcePropName) => class Theme extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.setThemeClass();
    }

    setThemeClass() {
        if ( _.isUndefined(this.props[sourcePropName]) || !_.isString(this.props[sourcePropName]) ) {
            this.themeClass = null;
        } else {
            this.themeClass = ('theme-' + this.props[sourcePropName].replace(/[^a-z]/gi, '_' )).toLowerCase();
        }
    }

    render() {
        return <Component {...this.props} themeClass={this.themeClass} />;
    }
};

export default theme;
