import React, { Component, PropTypes } from 'react';
import NavigationItem from './navigationItem';

export default class Navigation extends Component {
    static displayName = 'Navigation';

    static propTypes = {
        items: PropTypes.array.isRequired,
        className: PropTypes.string,
        linkClassName: PropTypes.string,
        showGroupLabel: PropTypes.bool
    };

    static defaultProps = {
        className: '',
        linkClassName: '',
        showGroupLabel: true
    };

    render() {
        const {
            items, className, linkClassName, showGroupLabel
        } = this.props;
        if (!Array.isArray(items) || items.length === 0) return null;
        const navItems = items.map((item, i) => {
            const key = `nav-${i}`;
            return <NavigationItem {...item} linkClassName={linkClassName} key={key} showGroupLabel={showGroupLabel} />;
        });

        return (
            <div className={className}>
                <nav className={`${className}__nav`}>
                    {navItems}
                </nav>
            </div>
        );
    }
}
