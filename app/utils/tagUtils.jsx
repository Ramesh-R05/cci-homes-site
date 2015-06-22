import _ from 'lodash';

class TagUtils {

    constructor() {
        this.FILTERS_CATEGORIES = {};
        this.CATEGORY_MAIN_ITEM = null;
        this.RELATED_CATEGORIES = [];
    }

    setFiltersCategory( fc ) {
        this.FILTERS_CATEGORIES = fc;
    }

    setCategoryMainItem( cmi ) {
        this.CATEGORY_MAIN_ITEMS = cmi;
    }

    setRelatedCategories( rc ) {
        this.RELATED_CATEGORIES = rc;
        if (this.CATEGORY_MAIN_ITEM !== null) {
            rc.push(this.CATEGORY_MAIN_ITEMS);
        }
    }

    /**
     * A:B:C -> returns C ( The latest element in a `:` separated list )
     * return the first string in a tag list.
     * @param String
     * @returns String
     */
    getTagName(tag) {
        if ( !_.isString(tag) ) { return ''; }
        var matches = /([^:]*)$/.exec(tag.trim());
        return matches[0];
    }

    /**
     * A:B:C -> returns the second element if the `:` separated list contains at least 3 element, null otherwise
     * @param String
     * @returns String|null
     */
    getTagCategory(tag) {
        if ( !_.isString(tag) ) { return null; }
        let matches = /\:(.*?)\:/.exec(tag);
        if (matches && matches.length > 0) {
            return matches[1];
        }
        return null;
    }

    /**
     * get a list of tags, and returns if it contains an item whose category equals this.CATEGORY_MAIN_ITEM, return this first item's Tag Name, else return null
     * @param String[]
     * @returns String|null
     */
    getMainItemTagName(tags) {
        let mainItemTag = _.find(tags, function(tag) {
            return this.getTagCategory(tag) === this.CATEGORY_MAIN_ITEM;
        });

        if (!!mainItemTag) {
            return this.getTagName(mainItemTag);
        }
        return null;
    }

    /**
     * TODO : Documentation
     * @param category
     * @returns {*}
     */
    getDisplayCategoryName(category) {
        return this.FILTERS_CATEGORIES[category];
    }

    /**
     * TODO : Documentation & Description
     * @param Array tags
     * @param Array selectedTags
     * @returns  {}
     */
    getFiltersFromTags(tags, selectedTags) {
        let filters = {};
        if (Array.isArray(tags)) {
            tags = tags.filter( (fields) => {
                return fields.name === 'bauerTags' && _.has(fields, 'values');
            });

            if (tags.length > 0) {
                tags = tags[0].values.map( (tag) => {
                    if (typeof tag.value === 'string' || tag.value instanceof String) {
                        return tag.value.replace(/\"/g, '');
                    }
                });
            }
        }

        tags.forEach((tag) => {
            if (typeof tag !== 'undefined') {
                let tagCategory = this.getTagCategory(tag);
                let tagName = this.getTagName(tag);
                let displayCategoryName = this.getDisplayCategoryName(tagCategory);

                if (typeof displayCategoryName !== 'undefined') {
                    if (typeof filters[displayCategoryName] === 'undefined') {
                        filters[displayCategoryName] = [];
                    }

                    let tagObject = {};

                    if (filters[displayCategoryName].indexOf(tagName) < 0) {
                        tagObject.name = tagName;
                        tagObject.value = tag;
                        tagObject.checked = selectedTags.indexOf(tagObject.value) > -1;
                        filters[displayCategoryName].push(tagObject);
                    }
                }
            }
        });

        return filters;
    }

    /**
     * Returns a subset of tags where each element of tags's category belongs to this.RELATED_CATEGORIES
     * @param String[] tags
     * @returns String[]
     */
    getRelatedTags(tags) {
        let filtered = [];
        let parentMap = {};

        (tags || []).forEach( (tag) => {
            let parent = this.getTagCategory(tag);
            let isRelatedRecipeCategory = _.contains( this.RELATED_CATEGORIES, parent);

            if (!parentMap.hasOwnProperty(parent) && isRelatedRecipeCategory) {
                filtered.push(tag);
                parentMap[parent] = true;
            }
        });

        return filtered;
    }
}

export default new TagUtils();
