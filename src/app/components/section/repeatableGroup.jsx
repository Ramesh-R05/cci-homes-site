import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import PolarTeaser from '../polar/polarTeaser';
import Teaser from '../teaser/teaser';
import chunk from 'lodash/array/chunk';


export default class RepeatableGroup extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        className: PropTypes.string,
        adTargets: PropTypes.object
    };

    static defaultProps = {
        items: [],
        className: '',
        adTargets: {}
    };

    render() {
        const {items, adTargets} = this.props;
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
                                    />
                            </div>
                        );
                    }

                    return (
                        <div key={index}>
                            {topAd}

                            <section key={index} className="section--9-items">
                                <Teaser {...groupArticles[0]} key={groupArticles[0].id} />

                                <PolarTeaser
                                    {...groupArticles[1]}
                                    ad={{
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
