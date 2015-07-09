import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import FeaturedArticlesStore from '../../stores/articles/featured';
import InFocusArticlesStore from '../../stores/articles/inFocus';
import SectionFeatured from './sectionFeatured';
import InFocus from '../inFocus/inFocus';


class Home extends Component {

    constructor(...args) {
        super(...args);
    }

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    }

    static propTypes = {
        featuredArticles: PropTypes.array,
        inFocusArticles: PropTypes.array
    }

    static defaultProps = {
        featuredArticles: [],
        inFocusArticles: []
    }

    render() {
        return (
            <div className="container">
                <SectionFeatured articles={this.props.featuredArticles}>
                    <InFocus articles={this.props.inFocusArticles} />
                </SectionFeatured>
            </div>
        );
    }
}


export default connectToStores(Home, [FeaturedArticlesStore, InFocusArticlesStore], (stores) => {
    return {
        featuredArticles: stores.FeaturedArticles.getItems(),
        inFocusArticles: stores.InFocusArticles.getItems()
    };
});
