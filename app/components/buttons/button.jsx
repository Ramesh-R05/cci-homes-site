import React, {Component, PropTypes} from 'react';
import {noop} from 'lodash/utility';
import classnames from 'classnames';

export default class Button extends Component {

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
        value: ''
    };

    constructor(props) {
        super();
        this.state = {active: props.active};
    }

    onClick(e) {
        const newState = !this.state.active;
        if (this.props.persistActiveState) {
            this.setState({active: newState});
        }

        this.props.onClick(e, this.props.value, newState);
    }

    render() {
        const {modifier} = this.props;
        let classNameModifier;
        if (modifier) classNameModifier = `button--${modifier}`;
        const classNames = classnames('button', classNameModifier, {'active': this.state.active});

        return (
            <button
                className={classNames}
                disabled={this.props.disabled}
                onClick={this.onClick.bind(this)}
                type={this.props.type}
                value={this.props.value}>
                {this.props.children}
            </button>
         );
    }
}
