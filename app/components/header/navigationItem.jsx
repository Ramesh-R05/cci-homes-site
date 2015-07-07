import React, {PropTypes, Component} from 'react';

export default class NavigationItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    };

    state = { selected: false };

    constructor(props, context) {
        super(props, context);
    }

    setActive = () => {
        this.setState({ selected: true });
    };

    render() {
        if (!this.props.name || !this.props.url) return null;

        return (
            <a
                href={this.props.url}
                className={this.state.selected ? 'selected' : ''}
                onClick={this.setActive}
            >{this.props.name}</a>
        );
    }
}
