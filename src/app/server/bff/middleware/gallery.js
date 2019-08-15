import API from '../api';
import { parseEntities } from '../helper/parseEntity';

export default async function galleryMiddleware(req, res, next) {
    try {
        const { entity } = res.body;

        if (!entity || entity.nodeType !== 'Gallery') {
            next();

            return;
        }

        const galleryItems = await API.getLatestTeasers(10, 0, 'nodeTypeAlias eq %27Gallery%27');
        res.body.moreGalleries = parseEntities(galleryItems.data);

        if (entity.tags) {
            const navTag = entity.tags.find(tag => tag.includes('navigation'));

            if (navTag) {
                // TODO: temporary solution to fix the issue with tags coming through as full tag name
                // this will be fixed when the site uses tagsDetails.urlName for tag urls
                const splitTag = navTag.split(':');
                const tagName = Array.isArray(splitTag) && splitTag.length === 3 && splitTag[2];

                let formattedTag = '';

                if (tagName) {
                    formattedTag = decodeURIComponent(tagName.toLowerCase());
                    formattedTag = formattedTag
                        .replace(/\s*-\s*/g, '-')
                        .replace(/\s*\/\s*/g, '-')
                        .replace(/"|'|,|\$/g, '')
                        .replace(/(\d+)\s*\+.*/g, 'more-than-$1')
                        .replace(/<\s*\$?/g, 'less-than-')
                        .replace(/\s*&\s*/g, '-and-')
                        .replace(/\s+/g, '-');
                }

                const relatedArticles = await API.getLatestTeasers(20, 0, `tagsDetails/urlName eq %27${formattedTag}%27`);
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) };
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}
