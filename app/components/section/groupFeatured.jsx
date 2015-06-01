import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';


export default class GroupFeatured extends Component {
    render() {
        const {articles} = this.props;

        if (!articles.length) return null;

        return (
            <section className="section--fixed-col">
                <h2 className="type-composite">In <b>Focus</b></h2>
                {articles.map(item => <Teaser {...item} key={item.id} modifier="narrow" />)}
                {this.props.children}
            </section>
        );
    }
}

GroupFeatured.propTypes = {
    articles: PropTypes.array.isRequired,
    children: PropTypes.any
};

GroupFeatured.defaultProps = {
    articles: []
};
