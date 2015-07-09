function setNextGalleryIndex(galleries, currentGallery, currentGalleryIndex) {
    let galleryIndex = currentGalleryIndex;
    // If current gallery is the first one, set index to 0
    if (galleries[0].id === currentGallery.id) {
        galleryIndex = 0;
    }

    // If first view of gallery or last gallery go to start
    if (currentGalleryIndex === -1 || currentGalleryIndex === galleries.length - 1) {
        galleryIndex = 0;
    } else {
        galleryIndex = currentGalleryIndex + 1;
    }

    return galleryIndex;
}

module.exports = {
    setNextGalleryIndex: setNextGalleryIndex
};
