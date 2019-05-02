export default function filterEmptyItems(items, key) {
    if (!Array.isArray(items)) {
        return items;
    }

    return items.filter(item => item[key]);
}
