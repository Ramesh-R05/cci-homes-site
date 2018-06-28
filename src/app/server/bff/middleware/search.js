import get from 'lodash/object/get';
import { parseEntities } from '../helper/parseEntity';
import parseHeaderMetaData from '../helper/parseHeaderMetaData';
import getSearchResults from '../api/search';
import parseModule from '../helper/parseModule';

const searchResultTeaserCount = 6;
const searchCount = 14;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function searchMiddleware(req, res, next) {
    try {
        let pageNo = 1;
        if (req.query) {
            pageNo = parseInt(req.query.pageNo || pageNo, 10);
        }
        const query = req.query.params ? get(req, 'query.params.query', '') : get(req, 'query.q', '');
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
        const headerNavigation = req.data.headernavigation;

        req.data.entity = {
            contentTitle: formattedQuery,
            url: currentPage.url,
            pageTitle: capitalizeFirstLetter(formattedQuery),
            pageMetaDescription: `${formattedQuery} search results`
        };

        res.body = {
            search: {
                total: searchDataResp.total
            },
            headerMetaData: parseHeaderMetaData(req.data.entity, get(req, 'data.headerMetaData', {})),
            latestTeasers: pageNo > 1 ? [] : parseEntities(searchDataResp.results.slice(0, searchResultTeaserCount)),
            list: {
                listName: 'search',
                params: {
                    q: query,
                    from,
                    size: searchCount,
                    pageNo
                },
                items: [
                    pageNo > 1 ? parseEntities(searchDataResp.results) : parseEntities(searchDataResp.results.slice(searchResultTeaserCount))
                ],
                previous: previousPage,
                current: currentPage,
                next: nextPage
            },
            headerNavigation
        };

        // Custom robots for Search Results page
        res.body.headerMetaData = {
            ...res.body.headerMetaData,
            robots: 'NOINDEX,FOLLOW'
        };

        if (get(req, 'data.theme')) {
            res.body.theme = req.data.theme;
        }

        if (get(req, 'data.magcover')) {
            res.body.magCover = req.data.magcover;
        }

        if (get(req, 'data.footer')) {
            res.body.footer = parseModule(req.data.footer);
        }

        next();
    } catch (error) {
        next(error);
    }
}
