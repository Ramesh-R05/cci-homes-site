import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import Subscribe from './subscribe';
import Social from './social';

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

        return <section className="brand-section brand-section--top">
                {/* Subscribe to be the first teaser on xl viewport */}
                <Subscribe className="show-for-xlarge-up" image={subscribeImage} link={subscribeLink} />
                {/* Hero article displayed in second position from xl viewports / first on lg down */}
                <Teaser {...hero} key={`${hero.id}-xl`} modifier="hero" sizes="home-hero" />
                <div className="brand__social columns small-12 medium-6 large-4 xlarge-3">
                    {/* First MREC */}
                    <Ad
                        className="ad--section-mrec"
                        sizes={{
                            small: 'mrec'
                        }}
                        targets={{position: 1}}/>
                    <Social
                        brand={brand}
                        social={brandConfig.social} />
                </div>
                {/* Subscribe to be the third teaser from lg and down viewport */}
                <Subscribe className="hide-for-xlarge-up" image={subscribeImage} link={subscribeLink} />
                {slice(articles, 1, 5).map(item => <Teaser {...item} key={item.id} modifier="img-top" sizes="large" />)}
            </section>;
    }
}
