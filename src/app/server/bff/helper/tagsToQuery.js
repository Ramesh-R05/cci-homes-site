export default function tagsToQuery(tags, toExclude = 'ne') {
    if (!Array.isArray(tags) || !tags.length) {
        return '';
    }

    const tagString = tags.join(',');

    return `tagsDetails/fullName ${toExclude} '${tagString}'`
        .replace(/ /g, '%20')
        .replace(/'/g, '%27')
        .replace(/:/g, '_');
}
