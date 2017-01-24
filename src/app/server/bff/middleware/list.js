import { getLatestTeasers } from '../api/listing';
import { parseEntities } from '../helper/parseEntity';
const listCount = 18;

export default async function list(req, res, next) {
    try {
        const pageNo = parseInt(req.query.pageNo, 10);
        const {filter, listName} = req.query;
        const skip =  ((pageNo-1) * listCount) + 2; // the initial page data has 2 more items than load more
        const listResp = await getLatestTeasers(listCount, skip, filter);

        const basePath = listName ? `/${listName}` : `/`;
        let previousPage = null;
        if (pageNo > 1) {
            let path = `${basePath}?pageNo=${pageNo - 1}`;
            if (pageNo === 2) {
                path = `${basePath}`;
            }

            previousPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            }
        }

        let nextPage = null;
        if (skip + listResp.data.length < listResp.totalCount) {
            const path = `${basePath}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `${basePath}?pageNo=${pageNo}` : basePath;
        const currentPage = {
            path,
            url: `${req.app.config.site.host}${path}`
        };

        res.body = {
            list: {
                listName: listName || 'home',
                params: {
                    ...req.query,
                    pageNo
                },
                items: [parseEntities(listResp.data)],
                previous: previousPage,
                current: currentPage,
                next: nextPage
            }
        };

        next();
    } catch(error) {
        next(error);
    }
}
