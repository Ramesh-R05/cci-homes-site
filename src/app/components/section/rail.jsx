import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

export default class Rail extends Component {
    static displayName = 'Rail';

    static propTypes = {
        marginBottom: PropTypes.number,
        yPosition: PropTypes.number
    };

    static defaultProps = {
        marginBottom: 0,
        yPosition: 0
    };

    render() {
        const { marginBottom, yPosition } = this.props;

        return (
            <StickyBlock
                breakpoints={['large', 'xlarge']}
                containerClasses="section__rail"
                containerMarginBottom={marginBottom}
                carriageYPosition={yPosition}
            >
                <Ad
                    className="ad--section-mrec"
                    displayFor={['large', 'xlarge']}
                    sizes={['double-mrec', 'mrec']}
                    label={{ active: false }}
                    pageLocation={Ad.pos.aside}
                />
            </StickyBlock>
        );
    }
}
