import sortByRecentDate from './sortByRecentDate';
import sortAlphabeticallyByContentTitle from './sortAlphabeticallyByContentTitle';

export default function defaultListingSort(arr) {
    const premiumItems = arr.filter(l => l.nodeTypeAlias === 'PremiumListing');
    const remainingitems = arr.filter(l => l.nodeTypeAlias !== 'PremiumListing');

    return [...sortByRecentDate(premiumItems, 'pageDateCreated'), ...sortAlphabeticallyByContentTitle(remainingitems)];
}
