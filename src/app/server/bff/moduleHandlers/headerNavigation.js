import { parseEntities } from '../helper/parseEntity';
import addSubsectionsToNavItem from '../helper/addSubsectionsToNavItem';
import logger from '../../../../logger';

export default function headerNavigation(moduleData) {
    try {
        if (!Array.isArray(moduleData)) {
            return { items: [] };
        }

        return {
            items: parseEntities(moduleData, { contentTitle: 'name' }).map(item => addSubsectionsToNavItem(item))
        };
    } catch (error) {
        logger.error(error);

        return { items: [] };
    }
}
