import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Teaser from '../teaser/teaser';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';

export default class Featured extends Component {
    static displayName = 'Featured';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        nativeAdTargets: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        nativeAdTargets: [],
        hero: null
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    renderHero = () => {
        const { hero } = this.props;

        return (
            <Teaser
                {...hero}
                gtmClass="gtm-hero-brand"
                key={`${hero.id}-xl`}
                modifier="hero"
                sizes="home-hero"
                className="brand-section__hero-teaser columns small-12"
            />
        );
    };

    renderTeaserGridWithAds = () => {
        const { articles, nativeAdTargets } = this.props;

        const baseGridItemClass = 'brand-section__grid-item';
        const baseTeaserClasses = classNames(baseGridItemClass, 'brand-section__grid-teaser', 'columns', 'small-12', 'medium-6');
        const baseAdClasses = classNames(
            baseGridItemClass,
            'brand-section__grid-ad',
            'ad--section-mrec',
            'columns',
            'small-12',
            'medium-6',
            'hide-for-large-up'
        );
        const nativeAdTeaserClassName = classNames(baseTeaserClasses, 'brand-section__native-ad-teaser');
        const teaserProps = {
            sizes: 'brand-list',
            modifier: 'img-top',
            gtmClass: 'gtm-topteaserlist-brand'
        };

        // The first item needs to be repeated because the Google Native Ad uses the first item slot to display.
        return [
            <Ad
                className={classNames('ad--section-mrec-top-1', baseAdClasses)}
                displayFor={['small', 'medium']}
                sizes={['double-mrec', 'mrec']}
                updatePageOffset
                pageLocation={Ad.pos.body}
                label={{ active: false }}
            />,
            <Teaser
                key={articles[0].id}
                {...articles[0]}
                {...teaserProps}
                googleNativeAds={nativeAdTargets[0]}
                className={nativeAdTeaserClassName}
            />,
            articles
                .slice(0, 4)
                .map(item => <Teaser key={item.id} {...item} {...teaserProps} googleNativeAds={false} className={baseTeaserClasses} />),
            articles.length >= 6 && (
                <Teaser
                    key={articles[5].id}
                    {...articles[5]}
                    {...teaserProps}
                    googleNativeAds={nativeAdTargets[1]}
                    className={nativeAdTeaserClassName}
                />
            ),
            <Ad
                className={classNames('ad--section-mrec-top-2', baseAdClasses)}
                displayFor="medium"
                sizes="mrec"
                label={{ active: false }}
                pageLocation={Ad.pos.body}
            />
        ];
    };

    render() {
        const { hero, articles, content } = this.props;

        if (articles.length === 0) {
            return null;
        }

        return (
            <section className="brand-section__featured">
                <div className="row">
                    <div className="columns columns small-12 medium-12 large-8">
                        <div className="row">{hero ? this.renderHero() : null}</div>
                        <div className="hide-for-large-up">
                            <SocialAndSubscribeLinks content={content} />
                        </div>
                        <div className="row">{this.renderTeaserGridWithAds()}</div>
                    </div>

                    <StickyBlock
                        breakpoints={['large', 'xlarge']}
                        containerClasses="columns show-for-large-up large-4 xlarge-4"
                        containerMarginBottom={60}
                        carriageYPosition={95}
                    >
                        <Ad
                            className="ad--section-mrec"
                            displayFor={['large', 'xlarge']}
                            sizes={['double-mrec', 'mrec']}
                            label={{ active: false }}
                            pageLocation={Ad.pos.aside}
                        />
                        <SocialAndSubscribeLinks content={content} />
                    </StickyBlock>
                </div>
            </section>
        );
    }
}
