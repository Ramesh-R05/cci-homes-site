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

    //Other elements to support the test
    articleFooter: '.article__footer',

    // =======For Ads Location

    // For ad wrapper
    adWrapper_TopLeaderboard_For_Viewability : '.section__heading div .sticky-block', //homepage, index, brand, gallery, article
    adWrapper_BottomLeaderboard_Home: '.site-wrapper .row + div > .sticky-block', //homepage, index, brand, gallery, article
    adWrapper_BottomLeaderboard_Section: '.site-wrapper .section__row + div > .sticky-block', //homepage, index, brand, gallery, article
    adWrapper_BottomLeaderboard_Brand: '.site-wrapper .brand__body + div > .sticky-block',
    adWrapper_BottomLeaderboard_Content: '.site-wrapper .article-section + div .sticky-block', //homepage, index, brand, gallery, article

    //outside
    ad_TopLeaderboard: '.section__heading .ad--section-top-leaderboard [id^=ad-gpt-slot-]', //homepage, index, brand, gallery, article
    ad_MiddleLeaderboard: '.site-wrapper .ad--section-middle-leaderboard [id^=ad-gpt-slot-]', //homepage, index, brand, gallery, article
    ad_BottomLeaderboard: '.site-wrapper .ad--section-bottom-leaderboard [id^=ad-gpt-slot-]', //homepage, index, brand
    ad_Teads: '.ad--slot-teads [id^=ad-gpt-slot-]', //gallery, article

    //RHS
    ad_TopMrecRhs_Homepage: '.home-section--top .fixed-column--sticky .ad--section-mrec [id^=ad-gpt-slot-]', //homepage
    ad_TopMrecRhs_Section: '.container > .section__row:nth-child(1) .fixed-column--sticky  .ad--section-mrec [id^=ad-gpt-slot-]', //navigation, tag
    ad_TopMrecRhs_Brand: '.brand-section--top .fixed-column--sticky .ad--section-mrec [id^=ad-gpt-slot-]', //brand
    ad_BottomMrecRhs: '.repeatable-component .section__row .fixed-column--sticky .ad--section-mrec [id^=ad-gpt-slot-]', //homepage, index, brand
    ad_MrecRhs1: '.feed-ad:nth-child(3) [id^=ad-gpt-slot-]', //gallery, article
    ad_MrecRhs2: '.feed-ad:nth-child(9) [id^=ad-gpt-slot-]', //gallery, article
    ad_MrecRhs3: '.feed-ad:nth-child(15) [id^=ad-gpt-slot-]', //gallery, article
    ad_MrecRhs4: '.feed-ad:nth-child(21) [id^=ad-gpt-slot-]', //gallery, article
    ad_StickyMrecRhs: '.sticky-block.rhs-ads [id^=ad-gpt-slot-]', //gallery

    //Additional
    ad_OutOfPage: '.ad--out-of-page [id^=ad-gpt-slot-]', //homepage, index, brand
    ad_LeftSidePanel: '.ad--sidepanel-left [id^=ad-gpt-slot-]', //homepage, index, brand
    ad_RightSidePanel: '.ad--sidepanel-right [id^=ad-gpt-slot-]', //homepage, index, brand
    ad_Wallpaper: '.ad--wallpaper [id^=ad-gpt-slot-]', //homepage, index, brand

    //Polar
    ad_PolarHomeTopTeaser1_Desktop: '.top-teasers article:nth-child(3) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage
    ad_PolarHomeTopTeaser1_Mobile: '.top-teasers article:nth-child(4) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage
    ad_PolarHomeTopTeaser6_Desktop: '.top-teasers article:nth-child(8) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage
    ad_PolarHomeTopTeaser6_Mobile: '.top-teasers article:nth-child(9) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage
    ad_PolarNavTopTeaser1_Desktop: '.section__featured article:nth-child(1) .ad--bottom-label [id^=ad-gpt-slot-]', //navigation section & tag
    ad_PolarNavTopTeaser1_Mobile: '.section__featured article:nth-child(1) .ad--bottom-label [id^=ad-gpt-slot-]', //navigation section & tag
    ad_PolarNavTopTeaser6_Desktop: '.section__featured article:nth-child(6) .ad--bottom-label [id^=ad-gpt-slot-]', //navigation section & tag
    ad_PolarNavTopTeaser6_Mobile: '.section__featured article:nth-child(7) .ad--bottom-label [id^=ad-gpt-slot-]', //navigation section & tag
    ad_PolarBrandTopTeaser1_Desktop: '.brand-section--top-teasers li:nth-child(2) .ad--bottom-label [id^=ad-gpt-slot-]', //brand
    ad_PolarBrandTopTeaser1_Mobile: '.brand-section--top-teasers li:nth-child(2) .ad--bottom-label [id^=ad-gpt-slot-]', //brand
    ad_PolarBrandTopTeaser6_Desktop: '.brand-section--top-teasers li:nth-child(7) .ad--bottom-label [id^=ad-gpt-slot-]', //brand
    ad_PolarBrandTopTeaser6_Mobile: '.brand-section--top-teasers li:nth-child(7) .ad--bottom-label [id^=ad-gpt-slot-]', //brand
    ad_PolarBottomTeaser2_Desktop: '.repeatable-component .section__row:nth-child(1) article.teaser:nth-child(2) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarBottomTeaser2_Mobile: '.repeatable-component .section__row:nth-child(1) article.teaser:nth-child(3) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarBottomTeaser6_Desktop: '.repeatable-component .section__row:nth-child(1) article.teaser:nth-child(6) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarBottomTeaser6_Mobile: '.repeatable-component .section__row:nth-child(1) article.teaser:nth-child(7) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarLoadMore2_Desktop: '.repeatable-component .section__row:nth-child(2) article.teaser:nth-child(2) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarLoadMore2_Mobile: '.repeatable-component .section__row:nth-child(2) article.teaser:nth-child(3) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarLoadMore6_Desktop: '.repeatable-component .section__row:nth-child(2) article.teaser:nth-child(6) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarLoadMore6_Mobile: '.repeatable-component .section__row:nth-child(2) article.teaser:nth-child(7) .ad--bottom-label [id^=ad-gpt-slot-]', //homepage, section
    ad_PolarRHS2: '.feed__container .feed-item:nth-child(2) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery, article
    ad_PolarRHS5: '.feed__container .feed-item:nth-child(6) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery, article
    ad_PolarRHS9: '.feed__container .feed-item:nth-child(11) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery, article
    ad_PolarRHS14: '.feed__container .feed-item:nth-child(17) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery, article
    ad_PolarRelatedContentInBody: '.content-body-container .content-body__related-content .feed-item:nth-child(1) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery, article
    ad_PolarRelatedContentAfterSlide7: '.gallery__feed-item--ad:nth-child(9) .content-body__related-content .feed-item:nth-child(1) .ad--bottom-label [id^=ad-gpt-slot-]', //gallery
    ad_PolarCarouselFeed: '.feed-carousel-content-items [id^=ad-gpt-slot-]', //gallery, article

    //After Load More
    ad_LoadMoreMrecRhs: '.repeatable-component .section__row:nth-child(2) .fixed-column--sticky .ad--section-mrec [id^=ad-gpt-slot-]', //homepage, index, brand

    //Body
    ad_MrecAfterSlide3: '.gallery__feed-item--ad:nth-child(4) .gallery__ad [id^=ad-gpt-slot-]', //gallery
    ad_MrecAfterSlide7: '.gallery__feed-item--ad:nth-child(9) .gallery__ad [id^=ad-gpt-slot-]', //gallery

    //For Mobile
    ad_MrecUnderHeroTeaser: '.top-teasers .ad--section-mrec [id^=ad-gpt-slot-]', //mobile homepage
    ad_MrecUnderHeroTeaser_Section: '.section__featured .ad--section-mrec [id^=ad-gpt-slot-]', //mobile index
    ad_MrecUnderHeroTeaser_Brand: '.ad--section-mrec-top-1 [id^=ad-gpt-slot-]', //mobile brand
    ad_MrecInBottomFeed: '.repeatable-component .ad--section-mrec [id^=ad-gpt-slot-]', //mobile homepage, index, brand
    ad_LoadMoreMrecInBottomFeed: '.repeatable-component .section__row:nth-child(2) .ad--section-mrec [id^=ad-gpt-slot-]', //mobile homepage, index, brand
    ad_MrecBeforeRecommendation: '.ad--article-before-recommendations [id^=ad-gpt-slot-]', //mobile gallery
    ad_MrecUnderHeroImage: '.ad--beneath-short-teaser [id^=ad-gpt-slot-]', //mobile article

    //--Non-ad element
    gallerySlide3: '.gallery__feed-item:nth-child(3)', //for 'I should see MREC ad between images'
    gallerySlide7: '.gallery__feed-item:nth-child(8)', //for 'I should see MREC ad between images'

    // Vertical Gallery
    galleryNativeAd: '.ad--article-native',
    galleryNativeAdDfp: '.ad--article-native [id^=ad-gpt-slot-]',
    //
    stickyTopBanner: '.sticky-block--at-top',
    stickyBottomBanner: '.sticky-block--at-bottom'
};

module.exports = ads_widget;
