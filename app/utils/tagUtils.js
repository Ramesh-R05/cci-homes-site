import cloneDeep from 'lodash/lang/cloneDeep';
import eq from 'lodash/lang/eq';
import isString from 'lodash/lang/isString';
import find from 'lodash/collection/find';
import filter from 'lodash/collection/filter';
import remove from 'lodash/array/remove';
const isArray = Array.isArray;

export function getTagName(tag) {
    if (isString(tag)) {
        return tag.split(':').pop();
    }
}

export function getTagCategory(tag, options = {}) {
    if (isString(tag)) {
        const level = options.level ? options.level : 1;
        let matches = tag.split(':');
        if (matches.length >= (level + 2)) {
            return matches[level];
        }
    }
}

export function getCategoryFirstTag(tags, category) {
    if (isArray(tags) && isString(category) && category.length > 0) {
        return find(tags, (tag) => getTagCategory(tag) === category);
    }
}

export function getTagsForCategory(tags, category) {
    if (isArray(tags) && isString(category)) {
        return filter(tags, tag => getTagCategory(tag) === category);
    }
}

export function getFirstTagNameForCategory(tags, category) {
    return getTagName(getCategoryFirstTag(tags, category));
}

const removeIfTagMatchesFilter = (filters, filterObj) => {
    return remove(filters, f => eq(f, filterObj)).length;
};

export function getRelatedTags(tags, filters, options = {}) {
    if (!isArray(tags) || !isArray(filters)) return [];

    const filtersObj = cloneDeep(filters);
    let relatedTags = [];

    tags.forEach((tag) => {
        const tagCategory = getTagCategory(tag);
        const tagName = getTagName(tag);
        const categoryFilter = {
            category: tagCategory
        };
        const subCategoryFilter = {
            category: tagCategory,
            subCategory: getTagCategory(tag, { level: 2 })
        };
        const categoryAndTagFilter = {
            category: tagCategory,
            tag: tagName
        };

        if (removeIfTagMatchesFilter(filtersObj, categoryFilter) ||
            removeIfTagMatchesFilter(filtersObj, subCategoryFilter) ||
            removeIfTagMatchesFilter(filtersObj, categoryAndTagFilter)) {
            // If a filter was removed there was a match. Push this tag to the
            // related tags collection
            relatedTags.push(options.nameOnly ? tagName : tag);
        }
    });

    return relatedTags;
}
