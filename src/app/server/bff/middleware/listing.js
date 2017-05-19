import { parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function listingMiddleware(req, res, next) {
    try {
        const { list } = res.body;

        if (!list || !list.params) {
            next();
            return;
        }

        const { basePath, filter } = list.params;
        const offset = parseInt(list.params.offset, 10);
        const pageNo = parseInt(list.params.pageNo, 10);
        const pageSize = parseInt(list.params.pageSize, 10);

        let skip = (pageNo - 1) * pageSize;
        let top = pageSize;
        if (offset && res.body.items) {
            if (res.body.items.length === 0) {
                const err = new Error('No content!');
                err.status = 404;
                throw err;
            }

            skip += offset;
            top = pageSize - offset;
        }

        const latestTeasersResp = await getLatestTeasers(top, skip, filter);
        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        let previousPage = null;
        if (pageNo > 1) {
            let path = `${basePath}?pageNo=${pageNo - 1}`;
            if (pageNo === 2) {
                path = `${basePath}`;
            }
            previousPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        let nextPage = null;
        if (skip + latestTeasers.length < latestTeasersResp.totalCount) {
            const path = `${basePath}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `${basePath}?pageNo=${pageNo}` : basePath;
        const currentPage = {
            path,
            url: `${req.app.locals.config.site.host}${path}`
        };

        res.body = {
            ...res.body,
            list: {
                params: {
                    ...list.params,
                    offset,
                    pageNo,
                    pageSize
                },
                items: [
                    parseEntities(latestTeasers)
                ],
                previous: previousPage,
                current: currentPage,
                next: nextPage
            }
        };

        next();
    } catch (error) {
        next(error);
    }
}
