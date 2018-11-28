import { parseEntities } from '../helper/parseEntity';
import addSubsectionsToNavItem from '../helper/addSubsectionsToNavItem';
import logger from '../../../../logger';

export default function hamburgerNavigation(moduleData) {
    try {
        if (!Array.isArray(moduleData)) {
            return { items: [] };
        }

        return {
            items: [
                { name: 'Home', url: '/', id: 'HOMES-INDEX' },
                ...parseEntities(moduleData, { contentTitle: 'name' }).map(item => addSubsectionsToNavItem(item, false))
            ]
        };
    } catch (error) {
        logger.error(error);

        return { items: [] };
    }
}
