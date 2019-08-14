import API from '../api';
import sortListingsByRule from '../helper/sortListingsByRule';
import getFilterData from '../helper/getFilterData';
import constructListingFilterString from '../helper/constructListingFilterString';
import { parseEntities } from '../helper/parseEntity';

export const locationFilterTagNames = [
    'location:australian_state:Victoria',
    'location:australian_state:Tasmania',
    'location:australian_state:South Australia',
    'location:australian_state:Queensland',
    'location:australian_state:New South Wales',
    'location:australian_territory:Northern Territory',
    'location:australian_territory:Australian Capital Territory',
    'location:country:New Zealand',
    'location:online'
];
// TODO - do we need to add Western Australia above?

export const defaultSortByRules = [
    { urlName: 'A-Z', displayName: 'A-Z' },
    { urlName: 'recently-added', displayName: 'Recently Added' },
    { urlName: 'recently-updated', displayName: 'Recently Updated' }
];

export const baseQuery = `(nodeTypeAlias eq 'CardListing' or nodeTypeAlias eq 'StandardListing' or nodeTypeAlias eq 'EnhancedListing' or nodeTypeAlias eq 'PremiumListing')`;

export default async function listingsForCategoryMiddleware(req, res, next) {
    try {
        const { category, listing, id, sortBy, location, includeOnlineResults, filtersActive } = req.query;

        if ((!category && !filtersActive) || listing || id) {
            next();

            return;
        }

        const filterString = constructListingFilterString(baseQuery, category, location, includeOnlineResults);
        const listingResponse = await API.getLatestTeasers(100, 0, filterString);
        const locationTagResponse = await API.getTagListFromNames(locationFilterTagNames);

        const sortedListings = (listingResponse && listingResponse.data && sortListingsByRule(sortBy, listingResponse.data)) || [];

        const [selectedCategory, categoryFilters] = getFilterData(category, res.body.listingCategories.items);
        const [selectedLocation, locationFilters] = getFilterData(location, locationTagResponse.data);
        const [selectedSortByRule, sortByRules] = getFilterData(sortBy, defaultSortByRules);

        res.body = {
            ...res.body,
            entity: {
                listingItems: parseEntities(sortedListings),
                nodeType: 'ListingsByCategory',
                url: `/directory/${category}`,
                urlName: `${category} listings`,
                pageTitle: `${category} listings`,
                listingFilters: {
                    categories: categoryFilters,
                    locations: locationFilters,
                    sortBy: sortByRules
                },
                activeFilters: {
                    category: selectedCategory,
                    location: selectedLocation,
                    sortBy: selectedSortByRule
                }
            }
        };

        next();
    } catch (error) {
        next(error);
    }
}
