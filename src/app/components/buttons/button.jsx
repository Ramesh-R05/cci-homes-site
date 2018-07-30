import React, { Component, PropTypes } from 'react';
import noop from 'lodash/utility/noop';
import classnames from 'classnames';

export default class Button extends Component {
    static displayName = 'Button';

    static propTypes = {
        active: PropTypes.bool,
        children: PropTypes.any,
        disabled: PropTypes.bool,
        modifier: PropTypes.string,
        onClick: PropTypes.func,
        persistActiveState: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.string
    };

    static defaultProps = {
        active: false,
        disabled: false,
        onClick: noop,
        persistActiveState: false,
        type: 'button',
        value: '',
        children: [],
        modifier: null
    };

    constructor(props) {
        super();
        this.state = { active: props.active };
    }

    onClick = (e) => {
        const { persistActiveState, value, onClick } = this.props;
        const { active } = this.state;
        const newState = !active;

        if (persistActiveState) {
            this.setState({ active: newState });
        }

        onClick(e, value, newState);
    };

    render() {
        const {
            modifier, disabled, type, value, children
        } = this.props;
        const { active } = this.state;
        let classNameModifier;

        if (modifier) classNameModifier = `button--${modifier}`;
        const classNames = classnames('button', classNameModifier, { active });

        return (
            <button
              className={classNames}
              disabled={disabled}
              onClick={this.onClick}
              type={type}
              value={value}
            >
                {children}
            </button>
        );
    }
}
