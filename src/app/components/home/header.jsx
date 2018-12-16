import React from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

const HomeHeader = () => {
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
        </div>
    );
};

export default HomeHeader;
