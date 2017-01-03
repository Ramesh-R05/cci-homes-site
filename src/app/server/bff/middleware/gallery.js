import {getLatestTeasers} from '../api/listing'
import {parseEntities} from '../helper/parseEntity';


export default async function gallery(req, res, next) {

    try {

        const {entity} = res.body;

        if (!entity || entity.nodeType !== 'Gallery') {
            next();
            return;
        }

        const galleryItems = await getLatestTeasers(10, 0, 'Gallery', 'nodeTypeAlias');
        res.body.moreGalleries = parseEntities(galleryItems.data);

        next();

    } catch(error) {
        next(error);
    }
}



