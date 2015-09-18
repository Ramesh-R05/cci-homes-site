import React, {Component, PropTypes} from 'react';
import has from 'lodash/object/has';
import Title from '@bxm/article/lib/components/teaser/title';
import Summary from '@bxm/article/lib/components/teaser/summary';
import polarAd from '@bxm/ad/lib/polar/decorators/polarAd';
import polarConfig from '@bxm/ad/lib/polar/decorators/polarConfig';
import Icon from '../teaser/icon';
import Sponsor from './sponsor';
import Teaser from '../teaser/teaser';


@polarConfig
@polarAd
class PolarTeaser extends Component {

    static propTypes = {
        id: PropTypes.string,
        ad: PropTypes.shape({
            label: PropTypes.string
        }).isRequired,
        modifier: PropTypes.string,
        // provided by @polarAd
        nativeAd: PropTypes.object,
        trackClick: PropTypes.func
    };

    static defaultProps = {
        id: '',
        ad: {},
        modifier: 'img-left'
    };

    render() {
        if (!has(this.props.ad, 'label') || !has(this.props.nativeAd, 'response')) {
            // render fallback teaser
            return <Teaser {...this.props} />;
        }

        // render Polar Native Ad teaser
        const ad = this.props.nativeAd.response.model;
        const gtmClass = `gtm-native-${this.props.id}`;
        const className = `teaser teaser--${this.props.modifier} teaser--native`;

        return (
            <article className={className} onClick={this.props.trackClick}>
                <a href={ad.link} className={`teaser__image ${gtmClass}`}>
                    <img src={ad.image.href} alt={ad.image.caption} />
                    <Icon icon={ad.custom.icon} />
                </a>
                <div className="teaser__content">
                    <Sponsor name={ad.sponsor.name} />
                    <Title title={ad.title} url={ad.link} gtmClass={gtmClass} />
                    <Summary summary={ad.summary} />
                </div>
            </article>
        );
    }
}

export default PolarTeaser;
