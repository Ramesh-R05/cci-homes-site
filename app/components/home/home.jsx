import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import HomeArticlesStore from '../../stores/articles/home';
import InFocusArticlesStore from '../../stores/articles/inFocus';
import SectionFeatured from './sectionFeatured';
import InFocus from '../inFocus/inFocus';
import Ad from '@bxm/ad/lib/google/components/ad';
import cx from 'classnames';

class Home extends Component {
    static propTypes = {
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

        return (
            <div className={menuSliderClassName}>
                <SectionFeatured articles={this.props.articles} className="home__body">
                    <InFocus articles={this.props.inFocusArticles} modifier="border-bottom"/>
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


export default connectToStores(Home, [HomeArticlesStore, InFocusArticlesStore], (stores) => {
    return {
        articles: stores.HomeArticles.getItems(),
        inFocusArticles: stores.InFocusArticles.getItems()
    };
});
