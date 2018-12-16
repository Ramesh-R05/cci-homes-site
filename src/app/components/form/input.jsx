/**
 * Base input component used for checkbox and radio only.
 */

import React, { Component, PropTypes } from 'react';
import noop from 'lodash/utility/noop';

export default class Input extends Component {
    static propTypes = {
        checked: PropTypes.bool,
        children: PropTypes.any,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        type: PropTypes.oneOf(['checkbox', 'radio']),
        value: PropTypes.string.isRequired
    };

    static defaultProps = {
        checked: false,
        type: 'checkbox',
        onChange: noop,
        children: []
    };

    onChange = () => {
        const { value, onChange } = this.props;
        onChange(value);
    };

    render() {
        const { checked, id, name, value, type, children } = this.props;

        if (!id || !name || !value) {
            return null;
        }

        /* eslint-disable jsx-a11y/label-has-for */
        return (
            <span>
                <input
                    className="custom-input"
                    defaultChecked={checked}
                    id={id}
                    key={id}
                    name={name}
                    onChange={this.onChange}
                    type={type}
                    value={value}
                />
                <label htmlFor={id}>{children}</label>
            </span>
        );
    }
}
