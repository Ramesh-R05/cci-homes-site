import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import HomeArticlesStore from '../../stores/articles/home';
import InFocusArticlesStore from '../../stores/articles/inFocus';
import SectionFeatured from './sectionFeatured';
import InFocus from '../inFocus/inFocus';
import Ad from '@bxm/ad/lib/google/components/ad';
import Recommendations from '@bxm/recommendations/lib/components/recommendations';
import cx from 'classnames';

class Home extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        articles: PropTypes.array,
        inFocusArticles: PropTypes.array,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        articles: [],
        inFocusArticles: [],
        isSideMenuOpen: false
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const menuSliderClassName = cx('side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        const {content} = this.props;

        return (
            <div className={menuSliderClassName}>
                <SectionFeatured articles={this.props.articles} className="home__body">
                    <InFocus articles={this.props.inFocusArticles} modifier="border-bottom"/>
                    <Recommendations
                        nodeType={content.nodeType}
                        nodeId={content.id}
                    />
                </SectionFeatured>

                <div className="row">
                    {/* Bottom ad */}
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-bottom-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 3}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default connectToStores(Home, [EntityStore, HomeArticlesStore, InFocusArticlesStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        articles: stores.HomeArticles.getItems(),
        inFocusArticles: stores.InFocusArticles.getItems()
    };
});
