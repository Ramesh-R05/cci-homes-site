import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import HomeArticlesStore from '../../stores/articles/home';
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
    };

    static propTypes = {
        articles: PropTypes.array,
        inFocusArticles: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        inFocusArticles: []
    };

    render() {
        return (
            <div className="container">
                <SectionFeatured articles={this.props.articles}>
                    <InFocus articles={this.props.inFocusArticles} modifier="border-bottom" />
                </SectionFeatured>
            </div>
        );
    }
}


export default connectToStores(Home, [HomeArticlesStore, InFocusArticlesStore], (stores) => {
    return {
        articles: stores.HomeArticles.getItems(),
        inFocusArticles: stores.InFocusArticles.getItems()
    };
});
