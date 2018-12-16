import transformFeaturedBrand from '../helper/transformFeaturedBrand';
import logger from '../../../../logger';

export default function featuredBrand(moduleData) {
    try {
        if (!Array.isArray(moduleData)) {
            return { items: [] };
        }

        return {
            items: moduleData.map(item => transformFeaturedBrand(item)).filter(item => !!item)
        };
    } catch (error) {
        logger.error(error);

        return { items: [] };
    }
}
