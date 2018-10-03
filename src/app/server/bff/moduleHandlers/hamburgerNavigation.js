import { parseEntities } from '../helper/parseEntity';

export default function hamburgerNavigation(moduleData) {
    if (!Array.isArray(moduleData)) {
        return { items: [] };
    }

    return {
        items: [{ name: 'Home', url: '/' }, ...parseEntities(moduleData, { contentTitle: 'name' })]
    };
}
