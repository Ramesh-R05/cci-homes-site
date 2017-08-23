import React, { Component, PropTypes } from 'react';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';

export default class Featured extends Component {

    static displayName = 'Featured';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        brand: PropTypes.string.isRequired,
        brandConfig: PropTypes.object.isRequired,
        polarTargets: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        brandConfig: {},
        polarTargets: []
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { hero, articles, content, brandConfig, brand, polarTargets } = this.props;

        if (articles.length === 0) return null;

        return (
            <section className="brand-section brand-section--top columns small-12">
                <div className="row">
                    <div className="brand-section--top-teasers columns small-12 medium-12 large-8 xlarge-8">
                        {
                            hero
                            ? <Teaser
                              {...hero}
                              gtmClass="gtm-hero-brand"
                              key={`${hero.id}-xl`}
                              modifier="hero"
                              sizes="home-hero"
                            />
                            : null
                        }
                        <div className="hide-for-large-up">
                            <SocialAndSubscribeLinks content={content} />
                        </div>
                        <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
                            <li className="ad--section-mrec-top-1">
                                <Ad
                                  className="ad--section-mrec teaser"
                                  displayFor={['small', 'medium']}
                                  sizes={['double-mrec', 'mrec']}
                                  updatePageOffset
                                  pageLocation={Ad.pos.body}
                                  label={{ active: false }}
                                />
                            </li>

                            {articles.slice(0, 6).map((item, i) => {
                                const polarDetails = polarTargets.find(slot => slot.index === i) || false;
                                return <li><Teaser {...item} key={item.id} polar={polarDetails} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-brand" /></li>;
                            })}

                            <li className="ad--section-mrec-top-2">
                                <Ad
                                  className="ad--section-mrec teaser"
                                  displayFor="medium"
                                  sizes="mrec"
                                  label={{ active: false }}
                                  pageLocation={Ad.pos.body}
                                />
                            </li>
                        </ul>
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
