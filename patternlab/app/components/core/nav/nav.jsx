import React, {Component, PropTypes} from 'react';
import {NavLink} from 'fluxible-router';
import classnames from 'classnames';

const activeClass = 'active';


export default class Nav extends Component {
    render() {
        const asideClass = classnames('aside', {'aside--active': this.props.opened});

        return (
            <aside className={asideClass}>
                <nav className="nav">
                    <ul className="nav__list">
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="example" activeClass={activeClass}>Components</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="#">example</a></li>
                                <li><a href="#">another component</a></li>
                                <li><a href="#">...</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
        );
    }
}

Nav.propTypes = {
    opened: PropTypes.bool
};

Nav.defaultProps = {
    opened: false
};
