import makeRequest from '../../makeRequest';
import { parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function tagMiddleware(req, res, next) {
    try {
        const itemsCount = 6;
        let { tag } = req.query;

        if (!tag) {
            next();

            return;
        }

        // TODO: temporary solution to fix old `/tag/<tag>` urls
        // this will be fixed when the site uses tagsDetails.urlName for tag urls
        tag = decodeURIComponent(tag.toLowerCase());
        tag = tag
            .replace(/\s*-\s*/g, '-')
            .replace(/\s*\/\s*/g, '-')
            .replace(/"|'|,|\$/g, '')
            .replace(/(\d+)\s*\+.*/g, 'more-than-$1')
            .replace(/<\s*\$?/g, 'less-than-')
            .replace(/\s*&\s*/g, '-and-')
            .replace(/\s+/g, '-');

        const tagData = await makeRequest(`${req.app.locals.config.services.remote.tag}/tags/?urlName=${tag}`)
            .then(({ data }) => {
                if (!data.length) {
                    return {};
                }

                const { displayName: title, urlName, createdAt: dateCreated } = data[0];

                return {
                    title,
                    urlName,
                    dateCreated,
                    kingtag: urlName
                };
            })
            .catch(() => {});

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip = (pageNo - 1) * pageSize;

        const filter = `tagsDetails/urlName eq '${tag}'`;
        const latestTeasersResp = await getLatestTeasers(itemsCount, skip, filter);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        const list = {
            params: {
                listName: tag,
                basePath: `/tags/${tag}`,
                offset: itemsCount,
                pageNo,
                pageSize,
                filter
            }
        };

        res.body = {
            ...res.body,
            entity: {
                ...tagData,
                nodeType: 'TagSection'
            },
            items: parseEntities(latestTeasers),
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}
