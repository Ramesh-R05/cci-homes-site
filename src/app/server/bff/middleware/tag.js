import makeRequest from '../../makeRequest';
import {parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function tag(req, res, next) {
    try {
        const itemsCount = 11;
        const listCount = 9;
        let {tag} = req.query;

        if (!tag) {
            next();
            return;
        }

        // TODO: temporary solution to fix old `/tag/<tag>` urls
        // this will be fixed when the site uses tagsDetails.urlName for tag urls
        tag = decodeURIComponent(tag.toLowerCase());
        tag = tag.replace(/\s*-\s*/g, '-')
            .replace(/\s*\/\s*/g, '-')
            .replace(/"|'|,|\$/g, '')
            .replace(/(\d+)\s*\+.*/g, 'more-than-$1')
            .replace(/<\s*\$?/g, 'less-than-')
            .replace(/\s*&\s*/g, '-and-')
            .replace(/\s+/g, '-');

        let pageNo = parseInt(req.query.pageNo || 1, 10);

        const skip =  (pageNo-1) * (itemsCount + listCount);
        const tagData = await makeRequest(`${req.app.config.services.remote.tag}/tags/?urlName=${tag}`)
            .then(({ data }) => {
                if (!data.length) return {};
                const {
                    displayName: title,
                    urlName,
                    createdAt: dateCreated
                } = data[0];
                return {
                    title,
                    urlName,
                    dateCreated
                };
            })
            .catch(() => {});

        const latestTeasersResp = await getLatestTeasers(itemsCount + listCount, skip, tag, 'tagsDetails/urlName');

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        let previousPage = null;
        if (pageNo > 1) {
            let path = `/tags/${tag}?pageNo=${pageNo - 1}`;
            if (pageNo === 2) {
                path = `/tags/${tag}`;
            }
            previousPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            }
        }

        let nextPage = null;
        if (skip + latestTeasers.length < latestTeasersResp.totalCount) {
            const path = `/tags/${tag}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `/tags/${tag}?pageNo=${pageNo}` : `/tags/${tag}`;
        const currentPage = {
            path,
            url: `${req.app.config.site.host}${path}`
        };

        const list = {
            listName: tag,
            params: {
                pageNo,
                filterValue: tag,
                filterProperty: 'tagsDetails/urlName'
            },
            items: [
                parseEntities(latestTeasers.slice(itemsCount))
            ],
            previous: previousPage,
            current: currentPage,
            next: nextPage
        };

        res.body = {
            ...res.body,
            entity: {
                ...tagData,
                nodeType: 'TagSection'
            },
            items: parseEntities(latestTeasers.slice(0, itemsCount)),
            list
        };

        next();
    } catch(error) {
        next(error);
    }
}
