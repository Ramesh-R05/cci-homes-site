import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ListingNavMenu extends Component {
    static propTypes = {
        navItems: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string
            })
        ).isRequired,
        onItemSelected: PropTypes.func.isRequired,
        visiblityClass: PropTypes.string,
        selectedId: PropTypes.string.isRequired
    };

    static defaultProps = {
        visiblityClass: ''
    };

    render() {
        const { navItems, onItemSelected, visiblityClass, selectedId } = this.props;

        if (!Array.isArray(navItems) && !navItems.length) {
            return null;
        }

        const rootClass = classNames('listing-nav-menu', {
            [`${visiblityClass}`]: visiblityClass
        });

        return (
            <div className={rootClass}>
                {navItems.map((navItem, index) => {
                    const navItemClass = classNames('listing-nav-menu__button', {
                        'listing-nav-menu__button--is-selected': navItem.value === selectedId
                    });

                    return (
                        <button
                            disabled={index === 0}
                            key={navItem.label}
                            className={navItemClass}
                            type="button"
                            onClick={e => onItemSelected(e, navItem.value)}
                        >
                            {navItem.label}
                        </button>
                    );
                })}
            </div>
        );
    }
}
