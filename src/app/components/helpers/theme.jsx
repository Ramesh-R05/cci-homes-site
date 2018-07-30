import React, { PropTypes } from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import isString from 'lodash/lang/isString';
import isUndefined from 'lodash/lang/isUndefined';

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

export default (Component, sourcePropName) =>
    class Theme extends React.Component {
        static displayName = 'Theme';

        static propTypes = {
            className: PropTypes.string
        };

        static defaultProps = {
            className: ''
        };

        constructor(props, context) {
            super(props, context);
            this.setThemeClass();
        }

        setThemeClass() {
            const source = get(this.props, sourcePropName);

            if (isUndefined(source) || !isString(source)) {
                this.themeClass = null;
            } else {
                this.themeClass = `theme-${source.replace(/[^a-z]/gi, '_').toLowerCase()}`;
            }
        }

        render() {
            return <Component {...this.props} className={classnames(this.props.className, this.themeClass)} />;
        }
    };
