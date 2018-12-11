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

    //Feed
    topFeedTeaserImg: 'article.teaser--img-top img',
    topFeedTeaserImgLink: 'article.teaser--img-top a.teaser__image',
    topFeedTeaserTitle: 'article.teaser--img-top .teaser__title a',
    topFeedTeaserTag: "article.teaser--img-top .teaser__tags .tag-primary a",
    bottomFeedTeaserImg: '.repeatable-component article.teaser--img-left img',
    bottomFeedTeaserImgLink: '.repeatable-component article.teaser--img-left a.teaser__image',
    bottomFeedTeaserTitle: '.repeatable-component article.teaser--img-left .teaser__title a',
    bottomFeedTeaserTag: ".repeatable-component article.teaser--img-left .teaser__tags .tag-primary a",

    //Top feed
    topTeasers: 'section.home-section--top .teaser--img-top',
    topTeaserImgs: 'section .teaser--img-top img',
    topTeaserTitles: 'section .teaser--img-top .teaser__title',
    topTeaserTags: "section .teaser--img-top .teaser__tags [class^='tag-']",
    topTeaserTagLinks: "section .teaser--img-top .teaser__tags [class^='tag-'] a",

    //Bottom feed
    bottomTeasers: '.repeatable-component .section__row:nth-child(1) .teaser--img-left',
    bottomTeaserImgs: '.repeatable-component section .teaser img',
    bottomTeaserTitles: '.repeatable-component section .teaser__title',
    bottomTeaserTags: ".repeatable-component section .teaser__tags [class^='tag-']",
    bottomTeaserTagLinks: ".repeatable-component section .teaser__tags [class^='tag-'] a",

    //LoadMore Feed
    loadMoreFeed: '.repeatable-component .section__row:nth-child(2) .teaser--img-left',
    stickyMobileBanner: '.home-section .sticky-block.sticky-block--at-bottom.sticky-block--out-of-view',
    loadMoreFeedTeaserImg: '.repeatable-component div:nth-child(2) article:nth-child(2) .teaser__image img',
    loadMoreFeedTeaserImgLink: '.repeatable-component div:nth-child(2) article:nth-child(2) .teaser__image',

    // RHR
    newsletterSignUpBtn: '.newsletter-subscribe__button .button--link',
};
module.exports = homepage_widget;
