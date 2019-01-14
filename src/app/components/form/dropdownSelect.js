import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

export default class DropdownSelect extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.any,
                label: PropTypes.string
            })
        ).isRequired,
        onClear: PropTypes.func.isRequired,
        selectedOption: PropTypes.any.isRequired
    };

    render() {
        const { onChange, placeholder, options, onClear, selectedOption } = this.props;

        return (
            <div className="dropdown-select">
                <Dropdown
                    onChange={onChange}
                    baseClassName="dropdown-select__input"
                    placeholder={placeholder}
                    options={options}
                    value={selectedOption}
                    arrowClosed={<i className="dropdown-select__input-arrow" />}
                    arrowOpen={<i className="dropdown-select__input-arrow dropdown-select__input-arrow--is-open" />}
                />
                {selectedOption && (
                    <button type="button" className="dropdown-select__clear-button" onClick={onClear}>
                        clear
                    </button>
                )}
            </div>
        );
    }
}
