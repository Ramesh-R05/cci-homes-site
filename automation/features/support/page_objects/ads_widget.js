var ads_widget = {

    leaderBoard: '.ad--section-top-leaderboard',
    midLeaderBoard: '.ad--section-middle-leaderboard',
    bottomLeaderBoard: '.ad--section-bottom-leaderboard',
    mrec: '.ad--section-mrec',
    articleAdBeneathShortTeaser: '.ad.ad--beneath-short-teaser.ad--bottom-label.hide-for-print',
    articleAdAfterBodyContent: '.ad.ad--article-before-recommendations.ad--bottom-label.hide-for-print',
    topFeedMrec: '.brand-section--top .ad--section-mrec',
    bottomFeedMrec: '.brand__body--bottom .ad--section-mrec',

    //homes page
    homepagetopFeedMrec: '.home-section--top .ad--section-mrec',
    homepageBottomFeedMrec: '.home-section--bottom .ad--section-mrec',
    homepageMrecTopFeedSticky: '.home-section--top>div .fixed-column--sticky>div',
    homepageMrecBottomFeedSticky: '.home-section--bottom>div .fixed-column--sticky>div',
    homepageLoadMoreStickyMrec: 'div.repeatable-component>div:nth-child(2) .ad--section-mrec [id^=gpt-slot-]',

    //section page
    sectionpagetopFeedMrec: 'div.section__landing.side-menu-slider > div > div:nth-child(3) > div > div.section__row > div > div > div',
    sectionpageBottomFeedMrec: '.repeatable-component .ad--section-mrec',

    mrecTopFeedSticky: '.brand-section--top>div .fixed-column--sticky>div',
    mrecBottomFeedSticky: '.brand__body--bottom>div .fixed-column--sticky>div',
    middleLeaderBoard: '.ad--section-leaderboard',
    middleMrec: '.ad--teaser-list',
    articleTopLeaderBoard: '.ad--article-top',
    articleBottomLeaderBoard: '.ad--article-beneath-recommendations',
    articleLeaderBoard: 'div.ad.ad--section-top-leaderboard.ad--bottom-label.hide-for-print',
    articleLHSMrec: '.feed-ad',//verifying MRECS in RHS, using article feed container to uniquely identify
    articleBottomMrec: '.ad--article-before-recommendations',
    topMobileBanner: '.ad--beneath-hero',
    homesTopMobileBanner: '.ad--beneath-short-teaser',
    homesBottomMobileBanner: '.ad--article-beneath-recommendations',
    adTopLeaderboard: '.section__heading .ad--section-top-leaderboard [id^=gpt-slot-] iframe', //homepage, section, article
    adBottomLeaderboard: '.content-wrapper .ad--section-top-leaderboard > [id^=gpt-slot-]', //homepage, section, article, gallery

    adMrecRHRFeed1: 'ul.feed__items li.feed-ad:nth-child(3) [id^=gpt-slot-] iframe', //article
    adMrecRHRFeed2: 'ul.feed__items li.feed-ad:nth-child(9) [id^=gpt-slot-] iframe', //article
    adMrecRHRFeed3: 'ul.feed__items li.feed-ad:nth-child(15) [id^=gpt-slot-] iframe', //article
    adMrecRHRFeed4: 'ul.feed__items li.feed-ad:nth-child(21) [id^=gpt-slot-] iframe', //article
    adMrecRHRFeed5: '.carriage  [id^=gpt-slot-]', //only on vertical gallery
    adMrecUnderHeroArticle: '.ad--beneath-hero [id^=gpt-slot-]', //article
    adMrecAboveRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //article

    adMrecBetweenGalleryImages1: '.gallery__feed-item--ad:nth-child(4)', //vertical gallery,
    adMrecBetweenGalleryImages2: '.gallery__feed-item--ad:nth-child(9)', //vertical gallery
    adTopLeaderboardGallery: '.ad.gallery__mobile-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adMrecBottomRightGallery: '.ad.gallery__aside-ad.ad--top-label [id^=gpt-slot-]', //gallery
    adMrecInSlideGallery: '.ad.gallery__slide-ad.ad--bottom-label [id^=gpt-slot-]', //gallery
    adBottomLeaderboardGallery: '.ad.gallery__footer-ad.ad--top-label', //gallery

    adWallpaperBrandPage: '.ad--wallpaper [id^=gpt-slot-]', //brand
    adLeftSideBrandPage: '.ad--sidepanel-left [id^=gpt-slot-]', //brand
    adRightSideBrandPage: '.ad--sidepanel-right [id^=gpt-slot-]', //brand
    adOutOfPageBrandPage: '#inskinanchor' //brand


};

module.exports = ads_widget;
