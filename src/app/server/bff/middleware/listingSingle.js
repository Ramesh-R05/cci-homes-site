import makeRequest from '../../makeRequest';
import { parseEntity } from '../helper/parseEntity';
import transformListingGalleries from '../helper/transformListingGalleries';
import filterEmptyItems from '../helper/filterEmptyItems';

export default async function listingSingle(req, res, next) {
    try {
        const { query } = req;
        const { id, preview } = query;

        const saved = `?saved=${!!preview}`;

        if (!id) {
            next();

            return;
        }

        const directoryListingEntity = await makeRequest(`${req.app.locals.config.services.remote.entity}/HOMES-${id}${saved}`);

        if (!directoryListingEntity) {
            next();

            return;
        }

        // TODO - redirect when a CardListing tries to access a page it shouldn't be able to access
        const listingNodeTypes = ['CardListing', 'StandardListing', 'EnhancedListing', 'PremiumListing'];

        if (!listingNodeTypes.includes(directoryListingEntity.nodeTypeAlias)) {
            next();

            return;
        }

        const parsedEntity = parseEntity(directoryListingEntity);

        res.body = {
            ...res.body,
            entity: {
                ...parsedEntity,
                linkedGalleries: transformListingGalleries(directoryListingEntity.galleries),
                testimonials: parsedEntity.testimonials && filterEmptyItems(parsedEntity.testimonials, 'message')
            }
        };

        next();
    } catch (error) {
        next(error);
    }
}
