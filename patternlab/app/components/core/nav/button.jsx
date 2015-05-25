import React, {Component, PropTypes} from 'react';

export default class Button extends Component {
    render() {
        const text = this.props.opened ? 'close' : 'menu';

        return (
            <button
                className="nav-button"
                onClick={this.props.onClick}
            >{text}
            </button>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    opened: PropTypes.bool
};

Button.defaultProps = {
    opened: false
};
