//import _ from 'lodash';
//
//class TagUtils {
//

//
//    /**
//     * Returns a subset of tags where each element of tags's category
//          belongs to this.RELATED_CATEGORIES
//     * @param String[] tags
//     * @returns String[]
//     */
//    getRelatedTags(tags) {
//        let filtered = [];
//        let parentMap = {};
//
//        (tags || []).forEach( (tag) => {
//            let parent = this.getTagCategory(tag);
//            let isRelatedRecipeCategory = _.contains( this.RELATED_CATEGORIES, parent);
//
//            if (!parentMap.hasOwnProperty(parent) && isRelatedRecipeCategory) {
//                filtered.push(tag);
//                parentMap[parent] = true;
//            }
//        });
//
//        return filtered;
//    }
//}
//
//export default new TagUtils();

import {isString} from 'lodash/lang';
import {find} from 'lodash/collection';
import {contains} from 'lodash/collection';

class TagUtils {

    getTagName(tag) {
        if (isString(tag)) {
            return tag.split(':').pop();
        }
    }

    getTagCategory(tag) {
        if (isString(tag)) {
            let matches = tag.split(':');
            if (matches.length >= 3) {
                return matches[1];
            }
        }
    }

    getFirstTagNameForCategory(tags, category) {
        if (Array.isArray(tags) && isString(category) && category.length > 0) {
            return this.getTagName(find(tags, (tag) => this.getTagCategory(tag) === category));
        }
    }

    getRelatedTags(tags, categories) {
        let relatedTags = [];
        let relatedCategories = [];
        if (Array.isArray(tags) && Array.isArray(categories)) {
            tags.forEach( (tag) => {
                let tagCategory = this.getTagCategory(tag);
                let isRelatedCategory = contains(categories, tagCategory);
                if (!contains(relatedCategories, tagCategory) && isRelatedCategory === true) {
                    relatedTags.push(tag);
                    relatedCategories.push(tagCategory);
                }
            });
            return relatedTags;
        }
    }
}

export default new TagUtils();
