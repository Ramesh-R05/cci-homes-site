export default function alphabeticalCompare(itemA, itemB) {
    if (!itemA.contentTitle || !itemB.contentTitle) {
        return 0;
    }

    const titleA = itemA.contentTitle.toLowerCase();
    const titleB = itemB.contentTitle.toLowerCase();

    if (titleA < titleB) {
        return -1;
    }

    if (titleA > titleB) {
        return 1;
    }

    return 0;
}
