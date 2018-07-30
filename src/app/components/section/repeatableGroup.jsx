import React, { Component, PropTypes } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import chunk from 'lodash/array/chunk';
import Teaser from '../teaser/teaser';

export default class RepeatableGroup extends Component {
    static displayName = 'RepeatableGroup';

    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string,
        adTargets: PropTypes.object
    };

    static defaultProps = {
        items: [],
        className: '',
        adTargets: {}
    };

    render() {
        const { items, adTargets } = this.props;
        if (!items.length) return null;

        const groups = chunk(items, 9);

        return (
            <div>
                {groups.map((groupArticles, index) => {
                    const polarAdLabel = `section_teaser_${index + 2}`;
                    let topAd = null;

                    if (index) {
                        topAd = (
                            <div className="section-heading">
                                <Ad
                                  className="ad--section-middle-leaderboard"
                                  sizes={{
                                      small: 'banner',
                                      leaderboard: 'leaderboard',
                                      billboard: ['billboard', 'leaderboard']
                                  }}
                                  targets={adTargets}
                                  pageLocation={Ad.pos.outside}
                                />
                            </div>
                        );
                    }

                    const key1 = `div-repeat-${index}`;
                    const key2 = `div-section-repeat-${index}`;
                    return (
                        <div key={key1}>
                            {topAd}

                            <section key={key2} className="section--9-items">
                                <Teaser {...groupArticles[0]} key={groupArticles[0].id} />

                                <Teaser
                                  {...groupArticles[1]}
                                  polar={{
                                      label: polarAdLabel,
                                      targets: {
                                          kw: polarAdLabel
                                      }
                                  }}
                                />

                                <Ad
                                  className="ad--section-mrec"
                                  displayFor="large"
                                  sizes="mrec"
                                  targets={adTargets}
                                />

                                {groupArticles.slice(2, 3).map(item => <Teaser {...item} key={item.id} />)}

                                <Ad
                                  className="ad--section-mrec"
                                  displayFor={['small', 'medium', 'xlarge']}
                                  sizes={{
                                      small: 'mrec',
                                      xlarge: ['double-mrec', 'mrec']
                                  }}
                                  targets={adTargets}
                                  pageLocation={Ad.pos.body}
                                />

                                {groupArticles.slice(3, 7).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}

                                {groupArticles.slice(7, 9).map(item => <Teaser {...item} key={item.id} modifier="img-top" sizes="small-hero" />)}
                            </section>
                        </div>
                    );
                })}
            </div>
        );
    }
}
