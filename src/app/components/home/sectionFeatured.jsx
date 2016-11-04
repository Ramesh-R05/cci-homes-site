import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import PolarTeaser from '../polar/polarTeaser';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Ad from '@bxm/ad/lib/google/components/ad';
import CustomInlineGallery from '../inlineGallery/customInlineGallery';
import SponsorHeader from '@bxm/ad/lib/polar/components/sponsor/header';
import PolarNativeHub from '../polar/polarNativeHub';

export default class SectionFeatured extends Component {
    static displayName = 'SectionFeatured';

    static propTypes = {
        articles: PropTypes.array.isRequired,
        children: PropTypes.any,
        className: PropTypes.string,
        galleries: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: [],
        className: '',
        galleries: [],
        children: []
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {articles, children, galleries} = this.props;
        const hero = first(articles);

        if (articles.length === 0) return null;

        return (
            <div className={this.props.className}>
                <div className="container">
                    <div className="row">
                        {/* Top ad */}
                        <div className="columns small-12">
                            <Ad
                                className="ad--section-top-leaderboard"
                                displayFor={['small', 'medium', 'large', 'xlarge']}
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{position: 1}}
                            />
                        </div>

                        {/* First 10 articles */}
                        <section className="section-featured section-featured--top">

                            {/* Hero article displayed in first position from sm to lg viewports */}
                            <Teaser {...hero} key={hero.id} lazyload={false} modifier="hero" sizes="home-hero" />


                            {/* First MREC */}
                            <Ad
                                className="ad--section-mrec"
                                sizes={{
                                    small: 'mrec',
                                    large: ['double-mrec', 'mrec']
                                }}
                                targets={{position: 1}}
                            />

                            {slice(articles, 1, 4).map(item => <Teaser {...item} key={item.id} />)}

                            {/*Native ad*/}
                            <PolarTeaser
                                {...articles[4]}
                                ad={{label: 'home_teaser_1'}}
                            />

                            {slice(articles, 5, 6).map(item => <Teaser {...item} key={item.id} />)}

                            {/* Middle MREC */}
                            <div className="columns small-12 hide-for-medium-up">
                                <Ad
                                    className="ad--section-mrec"
                                    displayFor={['small']}
                                    sizes={{
                                        small: 'mrec'
                                    }}
                                    targets={{position: 2}}
                                />
                            </div>

                            {slice(articles, 6, 10).map(item => <Teaser {...item} key={item.id} />)}

                        </section>
                    </div>

                    <PolarNativeHub/>

                    <div className="row">
                        {/* In Focus articles */}
                        <div className="fixed-column fixed-column--in-focus">
                            {children[0]}
                        </div>

                        {/* Next 5 articles */}
                        <section className="section-featured section-featured--heroes">
                            <div className="row">
                                {slice(articles, 10, 12).map(item => <Teaser {...item} key={item.id} sizes="img-left-to-hero" />)}
                            </div>
                        </section>

                        <div className="fixed-column">
                            <section className="section-featured section-featured--middle">
                                <div className="row">
                                    {slice(articles, 12, 15).map(item => <Teaser {...item} key={item.id} />)}
                                </div>
                            </section>
                        </div>
                        {/* Middle ad */}
                        <div className="columns small-12">
                            <Ad
                                className="ad--section-middle-leaderboard"
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{ position: 2 }}
                            />
                        </div>
                    </div>
                </div>

                {/* BXMS-40: Hide this for now until bxm/gallery is updated */}
                {/*<CustomInlineGallery galleries={galleries} />*/}

                <div className="container">
                    <div className="row">
                        <div className="section-featured section-featured--bottom">
                            {slice(articles, 15, 16).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}

                            <PolarTeaser
                                {...articles[16]}
                                ad={{label: 'home_teaser_2'}}
                                modifier="img-top"
                            />

                            {slice(articles, 17, 21).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}

                            {/* 3rd MREC */}
                            <Ad
                                className="ad--section-mrec"
                                displayFor={['small', 'medium']}
                                sizes="mrec"
                                targets={{position: 3}}
                            />

                            {slice(articles, 21, 22).map(item => <Teaser {...item} key={item.id} modifier="hero" />)}

                            {slice(articles, 22, 26).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}
                        </div>

                        {/* Sticky Ad */}
                        <StickyBlock
                            breakpoints={['large', 'xlarge']}
                            containerMarginBottom={60}
                            containerClasses="show-for-large-up xlarge-3 columns">
                            <Ad
                                className="ad--section-mrec"
                                displayFor={['large', 'xlarge']}
                                sizes={['double-mrec', 'mrec']}
                                targets={{position: 2}}
                                />
                        </StickyBlock>
                    </div>
                </div>
                {/* Recommendations */}
                {children[1]}
            </div>
        );
    }
}
