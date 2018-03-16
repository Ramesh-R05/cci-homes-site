import RSS from '@bxm/rss-builder';
import makeRequest from './makeRequest';
import createItemData from './rss/createItemData';
import createChannelData from './rss/createChannelData';
import config from '../config';
import logger from '../../logger';
const skip = 0;
const listCount = 10;

export function getLatestTeasers(top = 20, filter) {
    let query = '?$select=id';
    if (filter) {
        query += `&$filter=${filter}`;
    }

    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;
    return makeRequest(`${config.services.remote.listings}/teasers/${query}`).then(res => res).catch((err) => {
        logger.error(err);
        return [];
    });
}

// eslint-disable-next-line no-unused-vars
export default async function rss(req, res, next) {
    try {
        const { protocol, hostname, originalUrl, params } = req;
        const { section } = params;

        const summary = originalUrl.includes('summary');

        const homepageResp = await makeRequest(`${config.services.remote.entity}/homepage`);

        const channel = createChannelData(homepageResp, { protocol, hostname, originalUrl });

        const brand = config.brands.uniheader.find(b => b.id === section);

        let listingQuery = 'nodeTypeAlias eq %27Article%27 or nodeTypeAlias eq %27HomesArticle%27 or nodeTypeAlias ne %27Gallery%27';
        if (section === config.site.prefix.toLowerCase()) {
            listingQuery = `(${listingQuery}) and source eq ''`;
        } else if (section && brand) {
            listingQuery = `(${listingQuery}) and source eq '${brand.title.replace("'", "''")}'`;
        }

        const latestTeasersResp = await getLatestTeasers(listCount, listingQuery);
        const ids = [];
        ((latestTeasersResp && latestTeasersResp.data) || []).forEach((teaser) => {
            ids.push(teaser.id);
        });

        const entitiesResp = await makeRequest(`${config.services.remote.entity}/${ids.join(',')}`);

        let items;
        if (Array.isArray(entitiesResp)) {
            items = entitiesResp.map(entity => createItemData(entity, summary));
        } else {
            items = [createItemData(entitiesResp, summary)];
        }

        const feed = new RSS(channel);
        items.forEach(entity => feed.item(entity));

        res.header('Cache-Control', 'public, max-age=60');
        res.set('Content-Type', 'text/xml');
        res.send(feed.xml().replace(/[\u001f\u001e]/g, ''));
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
}
