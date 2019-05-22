import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DirectoryHome from '../listings/components/directoryHome';
import ListingCategory from '../listings/templates/listingCategory';
import ListingRenderer from '../listings/templates/listingRenderer';

export default function DirectoryNodeTypeCheck(WrappedComponent) {
    return class extends Component {
        static displayName = WrappedComponent.displayName;

        static propTypes = {
            content: PropTypes.shape({
                nodeType: PropTypes.string
            }).isRequired
        };

        getContentComponent() {
            const { content } = this.props;

            if (!content) {
                return null;
            }

            switch (content.nodeType) {
                case 'CardListing':
                case 'StandardListing':
                case 'EnhancedListing':
                case 'PremiumListing':
                    return { ContentComponent: ListingRenderer, templateClassModifier: 'directory-listing-page' };

                case 'DirectoryHome':
                    return { ContentComponent: DirectoryHome, templateClassModifier: 'directory-home-page' };

                case 'ListingsByCategory':
                    return { ContentComponent: ListingCategory, templateClassModifier: 'directory-category-page' };

                default:
                    return {};
            }
        }

        render() {
            const { ContentComponent, templateClassModifier } = this.getContentComponent();

            return <WrappedComponent {...this.props} ContentComponent={ContentComponent} classModifier={templateClassModifier} />;
        }
    };
}
