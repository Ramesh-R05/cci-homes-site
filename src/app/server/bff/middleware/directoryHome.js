export default function directoryHomeMiddlware(req, res, next) {
    try {
        const { category, filtersActive } = req.query;

        if (category || filtersActive) {
            next();

            return;
        }

        res.body = {
            ...res.body,
            entity: {
                nodeType: 'DirectoryHome',
                title: 'Directory',
                url: '/directory',
                // manually adding tagsDetails because we don't get it from an entity and it's required
                tagsDetails: [
                    {
                        name: 'food:Homes navigation:Directory',
                        urlName: 'directory',
                        fullName: 'food_Homes_navigation_directory',
                        displayName: 'Directory'
                    }
                ],
                categories: (res.body.listingCategories && res.body.listingCategories.items) || []
            }
        };

        next();
    } catch (error) {
        next(error);
    }
}
