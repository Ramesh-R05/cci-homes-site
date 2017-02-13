import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

export default class Featured extends Component {

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array.isRequired,
        brand: PropTypes.string.isRequired,
        brandConfig: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        brandConfig: {}
    };

    render() {
        const {hero, articles, brandConfig} = this.props;

        if (articles.length === 0) return null;

        let subscribeImage = '';
        let subscribeLink = '';

        if (brandConfig.subscribe) {
            subscribeImage = brandConfig.subscribe.image;
            subscribeLink = brandConfig.subscribe.link;
        }

        return (
            <section className="brand-section brand-section--top columns small-12">
                <div className="row">
                    <div className="brand-section--top-teasers columns small-12 medium-12 large-8 xlarge-8">
                        {
                            hero
                            ?   <Teaser
                                    {...hero}
                                    key={`${hero.id}-xl`}
                                    modifier="hero"
                                    sizes="home-hero"
                                />
                            :   null
                        }
                        <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
                            <li className="ad--section-mrec-top-1">
                                <Ad
                                    className="ad--section-mrec teaser"
                                    displayFor={['small', 'medium']}
                                    sizes={['double-mrec', 'mrec']}
                                    targets={{position: 1}}
                                />
                            </li>
                            {slice(articles, 0, 6).map(item => <li><Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top"  /></li>)}
                            <li className="ad--section-mrec-top-2">
                                <Ad
                                    className="ad--section-mrec teaser"
                                    displayFor={["small","medium"]}
                                    sizes={{
                                        small: ['mrec', 'double-mrec'],
                                        medium: 'mrec'
                                    }}
                                    targets={{position: 2}}
                                />
                            </li>
                        </ul>
                    </div>
                    <StickyBlock
                        breakpoints={['large', 'xlarge']}
                        containerClasses="columns show-for-large-up large-4 xlarge-4"
                        containerMarginBottom={60}
                        carriageYPosition={95}>
                        <Ad
                            className="ad--section-mrec"
                            displayFor={['large', 'xlarge']}
                            sizes={['double-mrec', 'mrec']}
                            targets={{position: 1}}
                        />
                    </StickyBlock>
                </div>
            </section>
        );
    }
}
