import get from 'lodash/object/get';
import { parseEntities } from '../helper/parseEntity';
import parseHeaderMetaData from '../helper/parseHeaderMetaData';
import getSearchResults from '../api/search';

const searchResultTeaserCount = 6;
const searchCount = 14;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function searchMiddleware(req, res, next) {
    try {
        const pageNo = parseInt(get(req, 'query.pageNo', 1), 10);
        const query = get(req, 'query.q', null);
        const from = (pageNo - 1) * searchCount;
        const searchDataResp = await getSearchResults(searchCount, from, query);
        const basePath = `/search/${query}`;

        let previousPage = null;

        if (pageNo > 1) {
            const prevPageNo = pageNo - 1;
            const prevFrom = (prevPageNo - 1) * searchCount;
            const path = `${basePath}?q=${query}&size=${searchCount}&from=${prevFrom}&pageNo=${prevPageNo}`;
            previousPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        let nextPage = null;

        if (from + searchDataResp.results.length < searchDataResp.total) {
            const nextPageNo = pageNo + 1;
            const nextFrom = (nextPageNo - 1) * searchCount;
            const path = `${basePath}?q=${query}&size=${searchCount}&from=${nextFrom}&pageNo=${nextPageNo}`;
            nextPage = {
                path,
                url: `${req.app.locals.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `${basePath}?q=${query}&size=${searchCount}&from=${from}&pageNo=${pageNo}` : basePath;
        const currentPage = {
            path,
            url: `${req.app.locals.config.site.host}${path}`
        };

        const decodedQuery = decodeURI(query);
        const formattedQuery = capitalizeFirstLetter(decodedQuery);

        const entity = {
            contentTitle: formattedQuery,
            url: currentPage.url,
            pageTitle: capitalizeFirstLetter(formattedQuery),
            pageMetaDescription: `${formattedQuery} search results`
        };

        res.body = {
            ...res.body,
            search: {
                total: searchDataResp.total
            },
            headerMetaData: { ...parseHeaderMetaData(entity, get(res, 'body.headerMetaData', {})), robots: 'NOINDEX,FOLLOW' },
            latestTeasers: pageNo > 1 ? [] : parseEntities(searchDataResp.results.slice(0, searchResultTeaserCount)),
            list: {
                listName: 'search',
                params: {
                    q: query,
                    from,
                    size: searchCount,
                    pageNo
                },
                items: [pageNo > 1 ? parseEntities(searchDataResp.results) : parseEntities(searchDataResp.results.slice(searchResultTeaserCount))],
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
