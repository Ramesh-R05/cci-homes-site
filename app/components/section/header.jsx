import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className="section-heading">
                {this.props.children}
                {/*TODO: make this dynamic based on the navigation tag parameter*/}
                {/*<h1>Home <b>Inspiration</b></h1>*/}
            </div>
        );
    }
}

Header.displayName = 'SectionHeader';

Header.propTypes = {
    children: PropTypes.any,
    tag: PropTypes.string
};
