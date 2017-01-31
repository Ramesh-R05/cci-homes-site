import React, {Component, PropTypes} from 'react';
import has from 'lodash/object/has';
import polarAd from '@bxm/ad/lib/polar/decorators/polarAd';
import polarConfig from '@bxm/ad/lib/polar/decorators/polarConfig';
import Teaser from '../teaser/teaser';
import PolarTeaserImage from './polarTeaserImage';

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
        trackClick: PropTypes.func,
        className: PropTypes.string
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

        return (
            <PolarTeaserImage
                caption="Powered By"
                id={this.props.id}
                nativeAd={this.props.nativeAd.response.model}
                modifier={this.props.modifier}
                trackClick={this.props.trackClick}
                className={this.props.className}
            />

        );
    }
}

export default PolarTeaser;
