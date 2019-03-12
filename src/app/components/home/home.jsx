import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores } from '@bxm/flux';
import SectionFeatured from './sectionFeatured';
// import FeaturedBrandsSection from '../featuredBrandsSection/featuredBrandsSection';

class Home extends Component {
    static displayName = 'Home';

    static propTypes = {
        content: PropTypes.object,
        hero: PropTypes.object,
        articles: PropTypes.array,
        featuredBrands: PropTypes.object.isRequired,
        latestBrandItems: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        content: {},
        hero: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { config } = this.context;
        const { homeTopFeed, homeBottomFeed } = config.polar.details;
        // const { featuredBrands, latestBrandItems } = this.props;

        return (
            <div className="home-section">
                <SectionFeatured {...this.props} className="home-section__featured" polarTargets={[homeTopFeed, homeBottomFeed]} />
                {/* {config.features.lipstick.enabled && (
                    <FeaturedBrandsSection featuredBrands={featuredBrands} latestBrandItems={latestBrandItems} className="home__body" />
                )} */}
            </div>
        );
    }
}

export default connectToStores(Home, ['PageStore'], context => {
    const { getStore } = context;
    const pageStore = getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams(),
        latestVideos: pageStore.getLatestVideos(),
        latestBrandItems: pageStore.getlatestBrandItems(),
        featuredBrands: pageStore.getFeaturedBrands()
    };
});
