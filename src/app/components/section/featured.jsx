import React, { Component, PropTypes } from 'react';
import Teaser from '../teaser/teaser';
import PolarTeaser from '../polar/polarTeaser';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Featured extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        polarTargets: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        polarTargets: []
    };

    render() {
        const { articles, polarTargets } = this.props;

        if (articles.length === 0) return null;
        const item = articles[0];

        return (
            <section className="section__featured gtm-topteaserlist-index">
                <Ad
                  className="ad--section-mrec teaser"
                  displayFor="medium"
                  sizes={['double-mrec', 'mrec']}
                  label={{ active: false }}
                  pageLocation={Ad.pos.body}
                />
                <PolarTeaser {...item} key={item.id} ad={polarTargets[0]} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />
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
                        return <PolarTeaser {...item} key={item.id} ad={polarTargets[1]} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />;
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
            </section>
        );
    }
}
