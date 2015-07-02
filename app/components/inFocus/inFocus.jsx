import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';


export default class InFocus extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        children: PropTypes.any,
        className: PropTypes.string
    }

    static defaultProps = {
        articles: [],
        className: 'section-in-focus'
    }

    render() {
        const articles = this.props.articles;

        if (!articles.length) return null;

        return (
            <section className={this.props.className}>
                <h2 className="type-composite">In <b>Focus</b></h2>
                {articles.map(item => <Teaser {...item} key={item.id} modifier="narrow" />)}
                {this.props.children}
            </section>
        );
    }
}
