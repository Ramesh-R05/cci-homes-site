import React, {Component, PropTypes} from 'react';

export default class Overlay extends Component {
    render() {
        if (!this.props.opened) return null;
        return <div className="overlay" />;
    }
}

Overlay.propTypes = {
    opened: PropTypes.bool
};

Overlay.defaultProps = {
    opened: false
};
