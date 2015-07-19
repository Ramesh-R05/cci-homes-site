import React, {Component, PropTypes} from 'react';
import NavigationItem from './navigationItem';

const isArray = Array.isArray;

export default class Navigation extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (!isArray(this.props.items) || this.props.items.length === 0) return null;

        return (
            <div className={this.props.className}>
                <nav className={`${this.props.className}__nav`}>
                    {this.props.items.map((item, i) => <NavigationItem {...item} key={`nav-${i}`}/>)}
                </nav>
            </div>
        );
    }
}
