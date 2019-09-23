export default function directoryBreadcrumbs(req, res, next) {
    try {
        if (!res.body || !res.body.entity) {
            next();

            return;
        }

        const { entity, listingCategories } = res.body;

        const breadcrumbs = [
            {
                title: 'directory',
                url: '/directory'
            }
        ];

        if (entity.nodeType === 'ListingsByCategory') {
            /* eslint-disable no-unused-expressions */
            const category =
                listingCategories && listingCategories.items.find(listingCategory => entity.activeFilters.category === listingCategory.urlName);
            category && category.displayName && breadcrumbs.push({ title: category.displayName, url: '/directory' });
        } else if (['StandardListing', 'EnhancedListing', 'PremiumListing'].indexOf(entity.nodeType) !== -1) {
            const category = entity.tagsDetails.find(tag => tag && tag.name && tag.name.indexOf('listing:category') !== -1);

            category && category.displayName && breadcrumbs.push({ title: category.displayName, url: `/${category.urlName}` });
        }

        res.body = {
            ...res.body,
            entity: {
                ...res.body.entity,
                breadcrumbs
            }
        };

        next();
    } catch (err) {
        next(err);
    }
}
