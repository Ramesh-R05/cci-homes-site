import React from 'react';
import PropTypes from 'prop-types';

import SiteHeader from '@bxm/site-header';
import DirectorySubHeader from './directorySubHeader';

export default function DirectoryHeader(props) {
    const { content, ...rest } = props;
    const listingNodeTypes = ['StandardListing', 'EnhancedListing', 'PremiumListing'];

    const showNav = content && content.nodeType && content.nodeType && listingNodeTypes.indexOf(content.nodeType) === -1;

    return (
        <SiteHeader
            {...rest}
            showNav={showNav}
            isExpanded={false}
            headerThemeClassName="header__inner--directory-header"
            SubHeaderComponent={DirectorySubHeader}
            subHeaderComponentProps={{ content }}
        />
    );
}

DirectoryHeader.displayName = 'DirectoryHeader';

DirectoryHeader.propTypes = {
    content: PropTypes.object.isRequired
};
