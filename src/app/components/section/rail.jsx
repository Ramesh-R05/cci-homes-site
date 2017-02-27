import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

export default class Rail extends Component {

    static propTypes = {
        adPosition: PropTypes.number,
        marginBottom: PropTypes.number,
        yPosition: PropTypes.number
    };

    render(){

        const {adPosition, marginBottom, yPosition} = this.props;

        return (
                <StickyBlock
                    breakpoints={['large', 'xlarge']}
                    containerClasses="section__rail"
                    containerMarginBottom={marginBottom}
                    carriageYPosition={yPosition}>
                    <Ad
                        className="ad--section-mrec"
                        displayFor={['large', 'xlarge']}
                        sizes={['double-mrec', 'mrec']}
                        targets={{position: adPosition}}
                        label={{active: false}}
                    />
                </StickyBlock>
        )

    }

}

