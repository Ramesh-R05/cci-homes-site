import React, { Component, PropTypes } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

export default class Header extends Component {
    static displayName = 'Header';

    static propTypes = {
        title: PropTypes.string,
        logo: PropTypes.string.isRequired
    };

    static defaultProps = {
        title: ''
    };

    render() {
        const { title, logo } = this.props;
        const pageLocation = Ad.pos.outside;
        const stickyAdProps = {
            className: 'ad--section-top-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation
        };

        if (!logo) return null;

        return (
            <div className="section__heading">
                <div className="section__heading__ad">
                    <StickyAd
                        adProps={stickyAdProps}
                        minHeight={450}
                        stickyAtViewPort="xlargeRangeMax"
                        stickyDelay={2000}
                        isStickyTemporary
                        stickyDuration={3500}
                    />
                </div>
                <div className="brand__wrapper">
                    <h1 className="brand__logo">
                        <img src={logo} alt={title} />
                    </h1>
                </div>
            </div>
        );
    }
}
