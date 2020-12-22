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

        return [
            <Ad
                className={classNames('ad--section-mrec-top-1', baseAdClasses)}
                displayFor={['small', 'medium']}
                sizes={['double-mrec', 'mrec']}
                updatePageOffset
                pageLocation={Ad.pos.body}
                label={{ active: false }}
            />,
            ...articles.slice(0, 6).map((item, i) => {
                const nativeAdDetails = nativeAdTargets.find(slot => slot.index === i) || false;

                const teaserClassName = classNames(baseTeaserClasses, {
                    'brand-section__native-ad-teaser': nativeAdDetails
                });

                return (
                    <Teaser
                        key={item.id}
                        {...item}
                        googleNativeAds={nativeAdDetails}
                        sizes="brand-list"
                        modifier="img-top"
                        gtmClass="gtm-topteaserlist-brand"
                        className={teaserClassName}
                    />
                );
            }),
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
