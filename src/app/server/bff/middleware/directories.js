import makeRequest from '../../makeRequest';
import { parseEntity, parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';
import getDirectoryFilters from '../api/directoryFilters';

export default async function directoriesMiddleware(req, res, next) {
    const baseDirectoriesQuery = "tagsDetails/fullName eq 'food_Homes_navigation_Directories'";

    try {
        let filterString = baseDirectoriesQuery;
        let topItems = null;
        let remainingItems = [];

        const { filters, includeOnline } = req.query;
        const includeOnlineAsBool = (includeOnline === 'true' && true) || false;

        if (filters) {
            filterString = includeOnlineAsBool
                ? `${baseDirectoriesQuery} and (tagsDetails/fullName eq '${filters}' or tagsDetails/fullName eq 'location_online')`
                : `${baseDirectoriesQuery}${filters
                      .split(',')
                      .reduce(
                          (accumFilterString, currentFilterString) => `${accumFilterString} and tagsDetails/fullName eq '${currentFilterString}'`,
                          ''
                      )}`;
        }

        const entityResponse = await makeRequest(`${req.app.locals.config.services.remote.entity}/section/directories`);
        const filteredDirectoriesResponse = await getLatestTeasers(100, 0, filterString);

        const directoryItems = (filteredDirectoriesResponse && filteredDirectoriesResponse.data) || [];
        const directoryFilters = getDirectoryFilters();

        if (directoryItems.length > 6) {
            topItems = directoryItems.slice(0, 6);
            remainingItems = directoryItems.slice(6, directoryItems.length);
        }

        const sectionTag = entityResponse.tagsDetails[0];
        entityResponse.kingtag = (sectionTag && sectionTag.urlName) || '';

        const topDirectories = parseEntities(topItems || directoryItems);
        const remainingDirectories = parseEntities(remainingItems);

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            topDirectories,
            remainingDirectories,
            directoryFilters
        };

        next();
    } catch (error) {
        next(error);
    }
}
