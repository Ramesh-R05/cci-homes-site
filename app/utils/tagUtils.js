import {isString} from 'lodash/lang';
import {find, contains, filter} from 'lodash/collection';
const isArray = Array.isArray;

export function getTagName(tag) {
    if (isString(tag)) {
        return tag.split(':').pop();
    }
}

export function getTagCategory(tag) {
    if (isString(tag)) {
        let matches = tag.split(':');
        if (matches.length >= 3) {
            return matches[1];
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

export function getRelatedTags(tags, categories) {
    let relatedTags = [];
    let relatedCategories = [];
    if (isArray(tags) && isArray(categories)) {
        tags.forEach( (tag) => {
            let tagCategory = getTagCategory(tag);
            let isRelatedCategory = contains(categories, tagCategory);
            if (!contains(relatedCategories, tagCategory) && isRelatedCategory === true) {
                relatedTags.push(tag);
                relatedCategories.push(tagCategory);
            }
        });
        return relatedTags;
    }
}
