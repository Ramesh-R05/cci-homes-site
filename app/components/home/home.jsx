import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import HomeArticlesStore from '../../stores/articles/home';
import InFocusArticlesStore from '../../stores/articles/inFocus';
import SectionFeatured from './sectionFeatured';
import InFocus from '../inFocus/inFocus';

class Home extends Component {
    static propTypes = {
        articles: PropTypes.array,
        inFocusArticles: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        inFocusArticles: []
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <SectionFeatured articles={this.props.articles} className="home__body">
                <InFocus articles={this.props.inFocusArticles} modifier="border-bottom"/>
            </SectionFeatured>
        );
    }
}


export default connectToStores(Home, [HomeArticlesStore, InFocusArticlesStore], (stores) => {
    return {
        articles: stores.HomeArticles.getItems(),
        inFocusArticles: stores.InFocusArticles.getItems()
    };
});
