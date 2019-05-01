import get from 'lodash.get';
import set from 'lodash.set';

const CLOUDFRONT = 'd3lp4xedbqa8a5.cloudfront.net';
const COUGAR = 'cdn.assets.cougar.bauer-media.net.au';

export const httpsSet = (obj, path) => {
    let url = get(obj, path);

    if (typeof url === 'string' && !url.startsWith('https') && !url.startsWith('/api/asset?url=')) {
        url = url.replace(new RegExp(`http://(${CLOUDFRONT}|${COUGAR})`, 'ig'), `https://${CLOUDFRONT}`);
        set(obj, path, url.startsWith('https') ? url : `/api/asset?url=${encodeURIComponent(url)}`);
    }
};

const itemLists = ['body.items', 'body.leftHandSide.items', 'body.latestVideos', 'body.entity.featuredIn'];

const imageUrls = [
    'body.entity.imageUrl',
    'body.entity.imageFacebookUrl.url',
    'data.magcover.moduleImageUrl',
    'body.hero.imageUrl',
    'body.entity.cardImage.url',
    'body.entity.businessLogo.url',
    'body.entity.contentFacebookImageUrl.source'
];

export default function https(req, res, next) {
    try {
        imageUrls.forEach(imageUrl => {
            httpsSet(res, imageUrl);
        });

        itemLists.forEach(i => {
            get(res, i, []).forEach(item => {
                httpsSet(item, 'imageUrl');
            });
        });

        get(res, 'body.entity.body', []).forEach(item => {
            switch (item.type) {
                case 'image':
                    httpsSet(item, 'content.url');
                    break;

                case 'whooshka':
                    httpsSet(item, 'content.url');
                    break;

                case 'image-revealer':
                    httpsSet(item, 'content.left.url');
                    httpsSet(item, 'content.right.url');
                    break;

                case 'related-content':
                    item.content.forEach(related => {
                        httpsSet(related, 'imageUrl');
                    });
                    break;

                case 'portrait-image':
                    httpsSet(item, 'content.url');
                    break;

                case 'gallery':
                    httpsSet(item, 'content[0].imageUrl');
                    break;
                default:
            }
        });

        get(res, 'body.entity.galleryItems', []).forEach(item => {
            httpsSet(item, 'url');
        });

        get(res, 'body.moreGalleries', []).forEach(item => {
            httpsSet(item, 'imageUrl');
        });

        get(res, 'body.list.items', []).forEach(item => {
            item.forEach(listItem => {
                httpsSet(listItem, 'imageUrl');
            });
        });

        get(res, 'body.latestTeasers', []).forEach(item => {
            httpsSet(item, 'imageUrl');
        });

        get(res, 'body.topDirectories', []).forEach(item => {
            httpsSet(item, 'imageUrl');
        });

        get(res, 'body.remainingDirectories', []).forEach(item => {
            httpsSet(item, 'imageUrl');
        });

        get(res, 'body.entity.profileGallery', []).forEach(item => {
            httpsSet(item, 'url');
        });

        get(res, 'body.entity.products', []).forEach(item => {
            httpsSet(item.image, 'url');
        });

        get(res, 'body.entity.heroGallery', []).forEach(item => {
            httpsSet(item, 'url');
        });

        get(res, 'body.entity.linkedGalleries', []).forEach(item => {
            httpsSet(item, 'url');

            item.galleryItems.forEach(galleryitem => {
                httpsSet(galleryitem, 'url');
            });
        });

        ['current', 'previous', 'next'].forEach(item => {
            const name = `body.list.${item}.url`;
            const value = get(res, name, '');

            if (value !== '') {
                set(res, name, value.replace('http://', 'https://'));
            }
        });

        next();
    } catch (error) {
        next(error);
    }
}

export { itemLists, imageUrls };
