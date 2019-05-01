import { parseEntities } from '../helper/parseEntity';
import logger from '../../../../logger';

export default function listingCategories(moduleData) {
    try {
        if (!Array.isArray(moduleData)) {
            return { items: [] };
        }

        const categoryItems = parseEntities(moduleData).map(item => {
            const { tagsDetails } = item;

            const urlName = tagsDetails && tagsDetails.length ? tagsDetails[0].urlName : '';

            return {
                title: item.title,
                displayName: item.title,
                url: item.url,
                imageUrl: item.imageUrl,
                urlName
            };
        });

        return {
            items: categoryItems
        };
    } catch (error) {
        logger.error(error);

        return { items: [] };
    }
}
