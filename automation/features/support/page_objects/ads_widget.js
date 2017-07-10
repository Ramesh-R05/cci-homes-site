var ads_widget = {

    //For checking attribute of sticky ads
    homepageMrecTopFeedSticky: '.home-section--top>div .fixed-column--sticky>div',
    homepageMrecBottomFeedSticky: '.home-section--bottom>div .fixed-column--sticky>div',
    mrecTopFeedSticky: '.brand-section--top>div .fixed-column--sticky>div',
    mrecBottomFeedSticky: '.brand__body--bottom>div .fixed-column--sticky>div',
    sectionMrecTopFeedSticky: '.container>div .fixed-column--sticky>div',
    sectionMrecBottomFeedSticky: '.section__row>div .fixed-column--sticky>div',
    bottomSticky: 'div.sticky-block.sticky-block--at-bottom.sticky-block--out-of-view',

    //For checking number of ads
    mrec: '.ad--section-mrec',
    articleLeaderBoard: 'div.ad.ad--section-top-leaderboard.ad--bottom-label.hide-for-print',
    articleRHSMrec: '.feed-ad',

 // =======For Ads Location
    //outside
    ad_TopLeaderboard: '.section__heading__ad > .ad--section-top-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_MiddleLeaderboard: '.site-wrapper .ad--section-middle-leaderboard [id^=gpt-slot-]', //homepage, index, brand, gallery, article
    ad_BottomLeaderboard: '.site-wrapper .ad--section-bottom-leaderboard [id^=gpt-slot-]', //homepage, index, brand
    ad_BottomLeaderboard_Article: '.site-wrapper .ad--section-top-leaderboard [id^=gpt-slot-]', //gallery, article
    ad_Teads: '.ad--slot-teads [id^=gpt-slot-]', //gallery, article

    //RHS
    ad_TopMrecRhs_Homepage: '.home-section--top .fixed-column--sticky .ad--section-mrec [id^=gpt-slot-]', //homepage
    ad_TopMrecRhs_Section: '.container > .section__row:nth-child(1) .fixed-column--sticky  .ad--section-mrec [id^=gpt-slot-]', //navigation, tag
    ad_TopMrecRhs_Brand: '.brand-section--top .fixed-column--sticky .ad--section-mrec [id^=gpt-slot-]', //brand
    ad_BottomMrecRhs: '.repeatable-component .section__row .fixed-column--sticky .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand
    ad_MrecRhs1: '.feed-ad:nth-child(3) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs2: '.feed-ad:nth-child(9) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs3: '.feed-ad:nth-child(15) [id^=gpt-slot-]', //gallery, article
    ad_MrecRhs4: '.feed-ad:nth-child(21) [id^=gpt-slot-]', //gallery, article
    ad_StickyMrecRhs: '.sticky-block.rhs-ads [id^=gpt-slot-]', //gallery

    //Additional
    ad_OutOfPage: '.ad--out-of-page [id^=gpt-slot-]', //homepage, index, brand
    ad_LeftSidePanel: '.ad--sidepanel-left [id^=gpt-slot-]', //homepage, index, brand
    ad_RightSidePanel: '.ad--sidepanel-right [id^=gpt-slot-]', //homepage, index, brand
    ad_Wallpaper: '.ad--wallpaper [id^=gpt-slot-]', //homepage, index, brand

    //After Load More
    ad_LoadMoreMrecRhs: '.repeatable-component .section__row:nth-child(2) .fixed-column--sticky .ad--section-mrec [id^=gpt-slot-]', //homepage, index, brand

    //Body
    ad_MrecAfterSlide3: '.gallery__feed-item--ad:nth-child(4) [id^=gpt-slot-]', //gallery
    ad_MrecAfterSlide7: '.gallery__feed-item--ad:nth-child(9) [id^=gpt-slot-]', //gallery

    //For Mobile
    ad_MrecUnderHeroTeaser: '.top-teasers [id^=gpt-slot-]', //mobile homepage
    ad_MrecUnderHeroTeaser_Section: '.section__featured [id^=gpt-slot-]', //mobile index
    ad_MrecUnderHeroTeaser_Brand: '.ad--section-mrec-top-1 [id^=gpt-slot-]', //mobile brand
    ad_MrecInBottomFeed: '.repeatable-component [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_LoadMoreMrecInBottomFeed: '.repeatable-component .section__row:nth-child(2) .ad--section-mrec [id^=gpt-slot-]', //mobile homepage, index, brand
    ad_MrecBeforeRecommendation: '.ad--article-before-recommendations [id^=gpt-slot-]', //mobile gallery
    ad_MrecUnderHeroImage: '.ad--beneath-short-teaser [id^=gpt-slot-]', //mobile article

    //--Non-ad element
    gallerySlide3: '.gallery__feed-item:nth-child(3)', //for 'I should see MREC ad between images'
    gallerySlide7: '.gallery__feed-item:nth-child(8)' //for 'I should see MREC ad between images'
};

module.exports = ads_widget;
