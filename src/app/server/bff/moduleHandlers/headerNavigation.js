import { parseEntities } from '../helper/parseEntity';
import addSubsectionsToNavItem from '../helper/addSubsectionsToNavItem';

export default function headerNavigation(moduleData) {
    if (!Array.isArray(moduleData)) {
        return { items: [] };
    }

    return {
        items: parseEntities(moduleData, { contentTitle: 'name' }).map(item => addSubsectionsToNavItem(item))
    };
}
