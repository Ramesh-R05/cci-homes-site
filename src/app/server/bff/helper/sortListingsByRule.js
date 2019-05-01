import sortByRecentDate from './sortByRecentDate';
import sortAlphabetiallyByContentTitle from './sortAlphabeticallyByContentTitle';
import defaultListingSort from './defaultListingSort';

export default function sortListingsByRule(sortByRule, listings) {
    if (!Array.isArray(listings) || !listings.length) {
        return listings;
    }

    switch (sortByRule) {
        case 'A-Z': {
            return sortAlphabetiallyByContentTitle(listings);
        }

        case 'recently-added':
            return sortByRecentDate(listings, 'pageDateCreated');

        case 'recently-updated':
            return sortByRecentDate(listings, 'updated_at');

        default: {
            return defaultListingSort(listings);
        }
    }
}
