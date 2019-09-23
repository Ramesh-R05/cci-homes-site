import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BreadCrumbs from './breadCrumbs';
import ListingNavWrapper from './listingNavWrapper';

export default class DirectorySubHeader extends Component {
    shouldComponentUpdate() {
        return false;
    }

    static propTypes = {
        content: PropTypes.shape({
            nodeType: PropTypes.string
        }).isRequired
    };

    render() {
        const { content } = this.props;
        const { nodeType, businessName, breadcrumbs } = content;

        const listingNodeTypes = ['StandardListing', 'EnhancedListing', 'PremiumListing'];

        const links = listingNodeTypes.indexOf(nodeType) !== -1 ? breadcrumbs : [breadcrumbs[0]];

        return (
            <div className="directory-sub-header">
                <BreadCrumbs links={links} />
                {listingNodeTypes.indexOf(nodeType) !== -1 && <ListingNavWrapper type={nodeType} businessName={businessName} />}
            </div>
        );
    }
}
