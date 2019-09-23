import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { canUseDOM } from 'exenv';
import ListingNavMenu from './listingNavMenu';
import ListingNavSelect from './listingNavSelect';

export default class ListingNavWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: null
        };
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
        businessName: PropTypes.string.isRequired
    };

    static contextTypes = {
        config: PropTypes.object
    };

    /* eslint-disable consistent-return */
    scrollToElement = (event, id) => {
        event.preventDefault();

        if (!id) {
            return null;
        }

        if (canUseDOM) {
            const el = document.getElementById(id);

            el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            this.setState({ selectedId: id });
        }
    };
    /* eslint-enable consistent-return */

    scrollWithTopOffset = id => {
        const elementFromId = document.getElementById(id);
        const combinedHeaderHeightMobile = 96;

        if (canUseDOM && elementFromId) {
            window.scrollTo({
                top: elementFromId.getBoundingClientRect().top - combinedHeaderHeightMobile + window.scrollY,
                left: 0,
                behavior: 'smooth'
            });
            this.setState({ selectedId: id });
        }
    };

    getFilteredItems = () => {
        const { type, businessName } = this.props;

        const listingNavItems = [
            {
                label: businessName || 'Company Profile',
                displayFor: ['PremiumListing', 'EnhancedListing', 'StandardListing'],
                value: 'company-profile-section'
            },
            {
                label: 'Shop',
                displayFor: ['PremiumListing'],
                value: 'product-section'
            },
            {
                label: 'Galleries',
                displayFor: ['PremiumListing'],
                value: 'galleries-section'
            },
            {
                label: 'Testimonials',
                displayFor: ['PremiumListing', 'EnhancedListing'],
                value: 'testimonial-section'
            },
            {
                label: 'Contact',
                displayFor: ['PremiumListing', 'EnhancedListing', 'StandardListing'],
                value: 'contact-section'
            }
        ];

        return listingNavItems
            .filter(section => section.displayFor.indexOf(type) !== -1)
            .map(({ label, value }) => ({
                label,
                value
            }));
    };

    render() {
        const { selectedId } = this.state;

        return (
            <React.Fragment>
                <ListingNavSelect
                    visiblityClass="show-for-medium-down"
                    navItems={this.getFilteredItems()}
                    onItemSelected={this.scrollWithTopOffset}
                />
                <ListingNavMenu
                    visiblityClass="show-for-large-up"
                    navItems={this.getFilteredItems()}
                    onItemSelected={this.scrollToElement}
                    selectedId={selectedId}
                />
            </React.Fragment>
        );
    }
}
