import recentDateCompare from './recentDateCompare';

export default function sortByRecentDate(arr, key) {
    return [...arr].sort((a, b) => recentDateCompare(a, b, key));
}
