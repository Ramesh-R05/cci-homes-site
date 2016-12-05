import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

export default class Featured extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        brand: PropTypes.string.isRequired,
        brandConfig: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        brandConfig: {}
    };

    render() {
        const {articles, brand, brandConfig} = this.props;
        const hero = first(articles);

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
                        <Teaser
                            {...hero}
                            key={`${hero.id}-xl`}
                            modifier="hero"
                            sizes="home-hero" />
                        <Ad
                            className="ad--section-mrec teaser"
                            displayFor={['small', 'medium']}
                            sizes={['double-mrec', 'mrec']}
                            targets={{position: 1}}
                        />
                        {slice(articles, 1, 7).map(item => <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top"  />)}
                        <Ad
                            className="ad--section-mrec teaser"
                            displayFor={["small","medium"]}
                            sizes={{
                                small: ['mrec', 'double-mrec'],
                                medium: 'mrec'
                            }}
                            targets={{position: 2}}/>
                    </div>
                        <StickyBlock
                            breakpoints={['large', 'xlarge']}
                            containerClasses="columns show-for-large-up large-4 xlarge-4"
                            containerMarginBottom={60}
                            carriageYPosition={147}>
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
