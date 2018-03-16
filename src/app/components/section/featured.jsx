import React, { Component, PropTypes } from 'react';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Featured extends Component {

    static displayName = 'Featured';

    static propTypes = {
        articles: PropTypes.array.isRequired,
        polarTargets: PropTypes.array,
        hero: PropTypes.object
    };

    static defaultProps = {
        polarTargets: [],
        hero: {}
    };

    render() {
        const { articles, polarTargets, hero } = this.props;

        if (articles.length === 0) return null;
        const item = articles[0];

        return (
            <section className="section__featured gtm-topteaserlist-index">
                <div>
                    {
                        hero
                            ? <Teaser
                              {...hero}
                              gtmClass="gtm-hero-section"
                              key={`${hero.id}-xl`}
                              modifier="hero"
                              sizes="home-hero"
                            />
                            : null
                    }
                </div>
                <div>
                    <Ad
                      className="ad--section-mrec teaser"
                      displayFor="medium"
                      sizes={['double-mrec', 'mrec']}
                      label={{ active: false }}
                      pageLocation={Ad.pos.body}
                    />
                    <Teaser {...item} key={item.id} polar={polarTargets[0]} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />
                    <Ad
                      className="ad--section-mrec"
                      displayFor="small"
                      sizes={['double-mrec', 'mrec']}
                      updatePageOffset
                      label={{ active: false }}
                      pageLocation={Ad.pos.body}
                    />
                    {articles.slice(1, 6).map((item, i) => {
                        if (i === 4) {
                            return <Teaser {...item} key={item.id} polar={polarTargets[1]} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />;
                        }
                        return <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />;
                    })}
                    <Ad
                      className="ad--section-mrec teaser"
                      displayFor="medium"
                      sizes={{
                          medium: 'mrec'
                      }}
                      label={{ active: false }}
                      pageLocation={Ad.pos.body}
                    />
                </div>
            </section>
        );
    }
}
