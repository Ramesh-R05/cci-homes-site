import { parseEntities } from '../helper/parseEntity';
import logger from '../../../../logger';

export default function hamburgerNavigation(moduleData) {
    try {
        if (!Array.isArray(moduleData)) {
            return { items: [] };
        }

        return {
            items: [{ name: 'Home', url: '/' }, ...parseEntities(moduleData, { contentTitle: 'name' })]
        };
    } catch (error) {
        logger.error(error);

        return { items: [] };
    }
}
