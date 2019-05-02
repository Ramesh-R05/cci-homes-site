import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropdownSelect from '../../form/dropdownSelect';
import ListingCard from '../components/listingCard';
import loadDirectoryContent from '../../../actions/loadDirectoryContent';

export default class ListingCategory extends Component {
    static propTypes = {
        content: PropTypes.shape({
            listingItems: PropTypes.array,
            listingFilters: PropTypes.shape({
                categories: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
                locations: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
                sortBy: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
            }).isRequired,
            activeFilters: PropTypes.shape({
                category: PropTypes.string,
                location: PropTypes.string,
                sortBy: PropTypes.string
            })
        }).isRequired
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    handleFilterChange = (event, filter) => {
        const { value } = event;
        const {
            content: { activeFilters }
        } = this.props;

        const filters = {
            ...activeFilters,
            ...{ [filter]: value }
        };

        this.getUpdatedListings(filters);
    };

    handleFilterClear = (event, filter) => {
        const {
            content: { activeFilters }
        } = this.props;

        const filters = {
            ...activeFilters,
            ...{ [filter]: null }
        };

        this.getUpdatedListings(filters);
    };

    getUpdatedListings = filters => {
        const { executeAction } = this.context;
        const { location } = filters;

        const includeOnlineResults = location !== 'new-zealand' || location !== 'online';

        executeAction(loadDirectoryContent, {
            query: { ...filters, includeOnlineResults, filtersActive: true }
        });
    };

    renderNoResults = () => (
        /* needs work */
        <div className="listing-category__no-results container">
            <h3 className="listing-category__no-results-text columns small-12">No results found</h3>
        </div>
    );

    render() {
        const {
            content: { activeFilters, listingItems, listingFilters }
        } = this.props;

        if (!listingFilters || !activeFilters) {
            return null;
        }

        return (
            <div className="listing-category container">
                <div className="listing-category__filter-row row">
                    <div className="listing-category__filter-column columns medium-5 large-4 xlarge-2">
                        <DropdownSelect
                            onChange={value => this.handleFilterChange(value, 'category')}
                            placeholder="Category"
                            options={listingFilters.categories}
                            value={activeFilters.category}
                            selectedOption={activeFilters.category}
                            onClear={e => this.handleFilterClear(e, 'category')}
                        />
                    </div>
                    <div className="listing-category__filter-column columns medium-4 large-3 xlarge-2">
                        <DropdownSelect
                            onChange={value => this.handleFilterChange(value, 'location')}
                            placeholder="Location"
                            options={listingFilters.locations}
                            value={activeFilters.location}
                            selectedOption={activeFilters.location}
                            onClear={e => this.handleFilterClear(e, 'location')}
                        />
                    </div>
                    <div className="listing-category__filter-column columns medium-3 large-3 xlarge-2 large-offset-2 xlarge-offset-6">
                        <DropdownSelect
                            onChange={value => this.handleFilterChange(value, 'sortBy')}
                            placeholder="Sort By"
                            options={listingFilters.sortBy}
                            value={activeFilters.sortBy}
                            selectedOption={activeFilters.sortBy}
                            onClear={e => this.handleFilterClear(e, 'sortBy')}
                        />
                    </div>
                </div>
                <div className="listing-category__list-row row">
                    {listingItems && listingItems.length
                        ? listingItems.map((item, i, items) => (
                              <div
                                  key={item.url}
                                  className={classNames('listing-category__card-wrapper columns small-12 medium-6 large-4', {
                                      left: i === items.length - 1
                                  })}
                              >
                                  <ListingCard
                                      title={item.title}
                                      subtitle={item.shortSummary}
                                      listingUrl={item.url}
                                      previewImage={item.cardImage}
                                      websiteAddress={item.webAddress}
                                      emailAddress={item.emailAddress}
                                      streetAddress={item.streetAddress}
                                      phoneNumber={item.phoneNumber}
                                      category={activeFilters.category}
                                      listingType={item.nodeType}
                                  />
                              </div>
                          ))
                        : this.renderNoResults()}
                </div>
            </div>
        );
    }
}
