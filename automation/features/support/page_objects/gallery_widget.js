var gallery_widget = {
    //Locators identified by className
    headerLogo: '.header-logo a',
    galleryLongTitle: '.article__title',
    galleryDescription: '.content-body-container.article__body.article__body--top-border',
    galleryImg: '.gallery__item-image img',
    galleryCustomLabel: '.gallery__subsection',
    gallerySource: '.article__header .article-header-source a',
    gallerySourceImg: '.article__header .article-header-source img',
    galleryDate: '.article__header > .article__date-created',
    galleryCaption: '.gallery__caption',
    imgCaption: '.gallery__caption',
    youtubeItem: '.gallery__item-youtube',
    videoWrapper: '.video-wrapper',
    videoPlayWrap: '.video-wrapper',
    videoAdPlay: '.vjs-ad-playing',
    videoId: 'data-video-id',
    playButton: '.vjs-big-play-button',
    imageCount: ".gallery__item-count:nth-child(1)",
    galleryFacebook: '.social-share-block .icon-facebook',
    galleryPinterest: '.social-share-block .icon-pinterest',
    authorText: '.article-header-author__name',
    //Locators identified by Xpath
    imgCount: "//*[@id='app']/div/section/section[1]/section/footer/div[1]/span",
    imgCountMobile: "//*[@id='app']/div/section/header/div/span"
};
module.exports = gallery_widget;
