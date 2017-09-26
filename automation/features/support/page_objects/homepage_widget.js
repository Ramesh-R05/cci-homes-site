var homepage_widget = {

    //Hero Element
    heroElmt: '.home-section--top .teaser--hero',
    heroImgUrl: '.home-section--top .teaser--hero img',
    heroImgLink: '.home-section--top .teaser--hero .teaser__image',
    heroTitle: '.home-section--top .teaser--hero .teaser__title',
    heroTitleLink: '.home-section--top .teaser--hero .teaser__title>a',
    heroShortTeaser: '.home-section--top .teaser--hero .teaser__summary',
    heroSource: '.home-section--top .teaser--hero .teaser__source',
    heroSourceLink: '.home-section--top .teaser--hero .teaser__source>a',
    heroTag: ".home-section--top .teaser--hero .teaser__tags [class^='tag-']",
    primaryHeroTag: ".teaser--hero .tag-primary",
    secondaryHeroTag: ".teaser--hero .tag-secondary",

    //latest real home
    latestHomeTitle: '.latest-real-homes .latest-real-homes__title',
    latestHomeTeasers: '.latest-real-homes .teaser.teaser--latest-real-homes',

    //mobile Hero Element
    mobHeroElmt: '.home-section--top .teaser--hero-img-top',
    mobHeroImgUrl: '.home-section--top .teaser--hero-img-top img',
    mobHeroImgLink: '.home-section--top .teaser--hero-img-top .teaser__image',
    mobHeroTitle: '.home-section--top .teaser--hero-img-top .teaser__title',
    mobHeroTitleLink: '.home-section--top .teaser--hero-img-top .teaser__title>a',
    mobHeroShortTeaser: '.home-section--top .teaser--hero-img-top .teaser__summary',
    mobHeroTag: ".home-section--top .teaser--hero-img-top .teaser__tags [class^='tag-']",
    mobPrimaryHeroTag: ".teaser--hero-img-top .tag-primary",
    mobSecondaryHeroTag: ".teaser--hero-img-top .tag-secondary",

    //Top feed
    topTeasers: '.home-section--top .teaser--img-top',
    topTeaserImgs: '.home-section--top .teaser--img-top img',
    topTeaserTitles: '.home-section--top .teaser--img-top .teaser__title',
    topTeaserTags: ".home-section--top .teaser--img-top .teaser__tags [class^='tag-']",
    topTeaserTagLinks: ".home-section--top .teaser--img-top .teaser__tags [class^='tag-'] a",


    //Bottom feed
    bottomTeasers: '.repeatable-component .section__row:nth-child(1) .teaser--img-left',
    bottomTeaserImgs: '.home-section--bottom .teaser img',
    bottomTeaserTitles: '.home-section--bottom .teaser__title',
    bottomTeaserTags: ".home-section--bottom .teaser__tags [class^='tag-']",
    bottomTeaserTagLinks: ".home-section--bottom .teaser__tags [class^='tag-'] a",

    //LoadMore Feed
    loadMoreFeed: '.repeatable-component .section__row:nth-child(2) .teaser--img-left',
    stickyMobileBanner: '.home-section .sticky-block.sticky-block--at-bottom.sticky-block--out-of-view',

    // RHR
    newsletterSignUpBtn: '.newsletter-subscribe__button .button--link'

    // ----------- Currently the below are not use, this can be decommision if is no required
    //heroStyle: '.content-wrapper .stripe-bg',
    //trendingTitle: '.trending__caption.hide-for-xlarge-up img',
    //bottomFeed: '.teaser__list.teaser-view-list',
    //teaserImgUrl: '.teaser__image img',
    //topFeedNumber: '.teaser__list.teaser-view-grid article.teaser',
    //topFeedImg: '.teaser__list.teaser-view-grid .teaser__image',
    //topCustomLabel: '.teaser__list.teaser-view-grid .teaser__badge',
    //topFeedLongTitles: '.teaser__list.teaser-view-grid .teaser__title',
    //topFeedShortTeasers: '.teaser__list.teaser-view-grid .teaser__summary-wrap',
    //topFeedImgUrls: '.teaser__list.teaser-view-grid .teaser__image img',
    //topFeedTeaserTitle: '.teaser__list.teaser-view-grid .teaser__title a',
    //bottomFeedNumber: '.teaser__list.teaser-view-list article.teaser',
    //bottomFeedTeaserImg: '.teaser__list.teaser-view-list .teaser__image ',
    //bottomFeedTeaserTitle: '.teaser__list.teaser-view-list .teaser__title a',
    //bottomFeedImgUrls: '.teaser__list.teaser-view-list .teaser__image img',
    //bottomCustomLabel:'.teaser__list.teaser-view-list .teaser__badge, teaser__sub-section',
    //bottomFeedLongTitles: '.teaser__list.teaser-view-list .teaser__title',
    //bottomFeedShortTeasers: '.teaser__list.teaser-view-list .teaser__summary-wrap',
    //bottomFeedImg: '.teaser__list.teaser-view-list .teaser__image',

};
module.exports = homepage_widget;
