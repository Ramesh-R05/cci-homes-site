import moment from 'moment';

export default function recentDateCompare(itemA, itemB, key) {
    if (!key) {
        return 0;
    }

    if (moment(itemA[key]).isAfter(itemB[key])) {
        return 1;
    }

    return -1;
}
