import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import PropTypes from 'prop-types';
import React from 'react';

export default function ContentSlot({ Component, contentProps, withAdsWrapper }) {
    if (!Component || typeof Component !== 'function') {
        return null;
    }

    return withAdsWrapper ? (
        <AdsWrapper>
            <Component {...contentProps} />
        </AdsWrapper>
    ) : (
        <Component {...contentProps} />
    );
}

ContentSlot.displayName = 'ContentSlot';

ContentSlot.propTypes = {
    Component: PropTypes.func,
    contentProps: PropTypes.object,
    withAdsWrapper: PropTypes.bool
};

ContentSlot.defaultProps = {
    Component: null,
    contentProps: {},
    withAdsWrapper: false
};
