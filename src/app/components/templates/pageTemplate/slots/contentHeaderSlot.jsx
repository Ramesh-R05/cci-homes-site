import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

export default function ContentHeaderSlot({ Component, contentProps, useContentTitle, contentHeaderProps }) {
    if (!Component || typeof Component !== 'function') {
        return null;
    }

    const { content } = contentProps || { content: {} };
    let contentHeaderTitle;

    if (useContentTitle) {
        contentHeaderTitle = get(content, 'contentTitle', content.title);
    } else {
        contentHeaderTitle = get(content, 'tagsDetails[0].displayName', content.title);
    }

    return (
        <Component
            title={(contentHeaderTitle && contentHeaderTitle) || ''}
            sponsorName={(contentProps && contentProps.content && contentProps.content.sponsor) || 'homes_sponsor'}
            {...contentHeaderProps}
        />
    );
}

ContentHeaderSlot.displayName = 'ContentHeaderSlot';

ContentHeaderSlot.propTypes = {
    Component: PropTypes.func,
    contentProps: PropTypes.shape({
        tagsDetails: PropTypes.arrayOf(PropTypes.shape({ displayName: PropTypes.string }))
    }).isRequired,
    useContentTitle: PropTypes.bool,
    contentHeaderProps: PropTypes.object
};

ContentHeaderSlot.defaultProps = {
    Component: null,
    useContentTitle: false,
    contentHeaderProps: {}
};
