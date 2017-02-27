import React, {Component, PropTypes} from 'react';
import polarAd from '@bxm/ad/lib/polar/decorators/polarAd';
import polarConfig from '@bxm/ad/lib/polar/decorators/polarConfig';
import Teaser from '../teaser/teaser';
import PolarTeaserImage from './polarTeaserImage';
import classNames from 'classnames';

@polarConfig
@polarAd
class PolarTeaser extends Component {

    static propTypes = {
        id: PropTypes.string,
        ad: PropTypes.shape({
            label: PropTypes.string
        }).isRequired,
        modifier: PropTypes.string,
        nativeAd: PropTypes.object,
        trackClick: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        id: '',
        ad: {},
        modifier: 'img-left'
    };

    shouldComponentUpdate(nextProps) {

        if (!nextProps.loadAgain || !this.props.loadAgain) {
            return true;
        } else if (!nextProps.loadAgain) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        if (!this.props.ad.label || !this.props.nativeAd.response) {
            return <Teaser {...this.props} />;
        }

        const { nativeAd } = this.props;

        let model = nativeAd.response.model;
        const imgWidth = model.image.sourceWidth;
        const imgHeight = model.image.sourceHeight;

        const teaserClassObj = {
            'teaser--polar': true,
            'polar--horizontal': ( imgHeight * 1.4 < imgWidth ),
            'polar--vertical': ( imgWidth * 1.4 < imgHeight )
        };

        return (
            <PolarTeaserImage
                source={this.props.source}
                caption="Powered By"
                id={this.props.id}
                nativeAd={this.props.nativeAd.response.model}
                modifier={this.props.modifier}
                trackClick={this.props.trackClick}
                className={classNames(teaserClassObj)}
                index={this.props.index}
            />

        );
    }
}

export default PolarTeaser;
