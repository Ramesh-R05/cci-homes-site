var gallery_widget = {
    //Locators identified by className
    headerLogo: '.icon-logo',
    galleryLongTitle: '.gallery__title',
    galleryDescription: '.gallery__summary-text',
    galleryImg: 'img.gallery__slide-image',
    galleryCustomLabel: '.gallery__subsection',
    galleryNextButton: 'button.gallery__nav.gallery__nav--next',
    galleryPrevButton: 'button.gallery__nav.gallery__nav--prev',
    galleryLastSlide: '.icon-arrow-next',
    moreGalleries: '.gallery__next-aside',
    nextGallery: '.gallery__next h5',
    nextGalName: '.gallery__next h2',
    nextGalTeaser: '.gallery__next-main .teaser__title',
    currentImgNum: '.gallery__slide-current',
    lastImgNum: '.gallery__slide-last',
    galleryDate: '.gallery__date',
    galleryCaption: '.gallery-caption__content',
    imgCaption: '.gallery-caption__content',
    toggleMore: '.gallery-caption__toggle--more',
    toggleLess: '.gallery-caption__toggle--less',
    videoWrapper: '.video-wrapper video',
    videoPlayWrap: '.video-wrapper',
    videoAdPlay: '.vjs-ad-playing',
    videoId: 'data-video-id',
    playButton: '.vjs-big-play-button',
    imageCountMobile: "header .gallery__slide-count",
    imageCountDesktop: "footer .gallery__slide-count",
    //Locators identified by Xpath
    imgCount: "//*[@id='app']/div/section/section[1]/section/footer/div[1]/span",
    imgCountMobile: "//*[@id='app']/div/section/header/div/span",

};
module.exports = gallery_widget;
