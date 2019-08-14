export default function transformListingGalleries(galleries = []) {
    if (!galleries || !Array.isArray(galleries)) {
        return [];
    }

    return galleries.reduce((accum, gallery) => {
        const accumulatedGalleryData = [...accum];
        const { galleryItems } = gallery;

        if (!galleryItems || !galleryItems.length) {
            return accumulatedGalleryData;
        }

        const firstImage = galleryItems[0];

        accumulatedGalleryData.push({
            url: firstImage.url,
            id: gallery.id,
            name: gallery.name,
            caption: firstImage.caption,
            galleryItems
        });

        return accumulatedGalleryData;
    }, []);
}
