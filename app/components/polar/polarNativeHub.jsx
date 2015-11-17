import React, {Component, PropTypes} from 'react';
import get from 'lodash/object/get';
import PolarNativeHub from '@bxm/ad/lib/polar/components/hub/hub';
import PolarTeaserImage from './polarTeaserImage';

export default class HomesPolarNativeHub extends Component {

    static displayName = 'HomesPolarNativeHub';

    static propTypes = {
        hubId: PropTypes.string.isRequired,
        targets: PropTypes.targets
    };

    static defaultProps = {
        hubId: 'homes_hub',
        targets: {}
    };

    static renderTeasers = (teasers, onClick) => teasers.map( teaser =>
        <PolarTeaserImage
            nativeAd={get(teaser, 'data', {})}
            trackClick={onClick}
            caption="Sponsored By"
        />
    );

    render() {
        return (
            <PolarNativeHub className="section-featured--top"
                ad={{
                    id: this.props.hubId,
                    targets: this.props.targets
                }}
                teaserRenderer={HomesPolarNativeHub.renderTeasers}
            />);
    }
}
