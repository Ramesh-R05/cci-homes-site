import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import cx from 'classnames';
import SectionFeatured from './sectionFeatured';

class Home extends Component {
    static displayName = 'Home';

    static propTypes = {
        content: PropTypes.object,
        hero: PropTypes.object,
        articles: PropTypes.array,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        content: {},
        hero: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { config } = this.context;
        const { isSideMenuOpen } = this.props;
        const { homeTopFeed, homeBottomFeed } = config.polar.details;
        const menuSliderClassName = cx('homepage side-menu-slider', {
            'side-menu-slider--side-menu-open': isSideMenuOpen
        });

        return (
            <div className={menuSliderClassName}>
                <SectionFeatured {...this.props} className="home__body" polarTargets={[homeTopFeed, homeBottomFeed]} />
            </div>
        );
    }
}

export default connectToStores(Home, ['PageStore'], (context) => {
    const { getStore } = context;
    const pageStore = getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        latestRealHomes: pageStore.getModuleItems('latestRealHomes'),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams()
    };
});
