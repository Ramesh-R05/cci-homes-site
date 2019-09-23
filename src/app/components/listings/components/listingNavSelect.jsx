import React, { Component } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ListingNavSelect extends Component {
    static propTypes = {
        navItems: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string
            })
        ).isRequired,
        onItemSelected: PropTypes.func.isRequired,
        visiblityClass: PropTypes.string
    };

    static defaultProps = {
        visiblityClass: ''
    };

    handleItemChanged = item => {
        const { onItemSelected } = this.props;

        onItemSelected(item.value);
    };

    render() {
        const { navItems, visiblityClass } = this.props;

        if (!Array.isArray(navItems) && !navItems.length) {
            return null;
        }

        const rootClass = classNames('listing-nav-select', {
            [`${visiblityClass}`]: visiblityClass
        });

        return (
            <Select
                defaultValue={navItems[0]}
                className={rootClass}
                classNamePrefix="listing-nav-select"
                options={navItems}
                onChange={this.handleItemChanged}
                isSearchable={false}
            />
        );
    }
}
