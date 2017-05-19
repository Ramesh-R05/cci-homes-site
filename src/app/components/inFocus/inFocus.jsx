import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Teaser from '../teaser/teaser';


export default class InFocus extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        children: PropTypes.any,
        modifier: PropTypes.string
    };

    static defaultProps = {
        articles: []
    };

    render() {
        const { articles, modifier } = this.props;

        if (!articles.length) return null;

        let classNameModifier;
        const className = 'section-in-focus';

        if (modifier) classNameModifier = `${className}--${modifier}`;

        const classNames = classnames(className, classNameModifier);

        return (
            <section className={classNames}>
                <h2 className="type-composite">In <b>Focus</b></h2>
                {articles.map(item => <Teaser {...item} key={item.id} modifier="narrow" />)}
                {this.props.children}
            </section>
        );
    }
}
