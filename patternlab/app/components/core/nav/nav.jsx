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
                            <NavLink routeName="article" activeClass={activeClass}>Article</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/article#heroImage">HeroImage</a></li>
                                <li><a href="/patternlab/article#summary">Summary</a></li>
                                <li><a href="/patternlab/article#footer">Footer</a></li>
                            </ul>
                        </li>
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="feed" activeClass={activeClass}>Feed</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/feed#feedItem">FeedItem</a></li>
                            </ul>
                        </li>
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="teasers" activeClass={activeClass}>Teasers</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/teasers#base">Base</a></li>
                                <li><a href="/patternlab/teasers#narrow">Narrow</a></li>
                                <li><a href="/patternlab/teasers#hero">Hero</a></li>
                            </ul>
                        </li>
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="form" activeClass={activeClass}>Form Components</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/form#radioButton">RadioButton</a></li>
                                <li><a href="/patternlab/form#checkbox">Checkbox</a></li>
                            </ul>
                        </li>
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="buttons" activeClass={activeClass}>Buttons</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/buttons#button">Button</a></li>
                                <li><a href="/patternlab/buttons#buttonCategory">ButtonCategory</a></li>
                            </ul>
                        </li>
                        <li onClick={this.props.onClick}>
                            <NavLink routeName="social" activeClass={activeClass}>Social</NavLink>
                            <ul className="nav__sub-list">
                                <li><a href="/patternlab/social">SocialShareBlock</a></li>
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
