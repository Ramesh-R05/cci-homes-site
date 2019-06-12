var homepage_widget = {
    //Hero Element
    heroElmt: '.home-section__featured .teaser--hero',
    heroImgUrl: '.home-section__featured .teaser--hero img',
    heroImgLink: '.home-section__featured .teaser--hero .teaser__image',
    heroTitle: '.home-section__featured .teaser--hero .teaser__title',
    heroTitleLink: '.home-section__featured .teaser--hero .teaser__title>a',
    heroShortTeaser: '.home-section__featured .teaser--hero .teaser__summary',
    heroSource: '.home-section__featured .teaser--hero .teaser__brand-image',
    heroSourceLink: '.home-section__featured .teaser--hero .teaser__source>a',
    heroTag:
        ".home-section__featured .teaser--hero .teaser__tags [class^='tag-']",
    primaryHeroTag: '.home-section__featured .tag-primary',
    secondaryHeroTag: '.home-section__featured .tag-secondary',

    //mobile Hero Element
    mobHeroElmt: '.home-section__featured .teaser--hero',
    mobHeroImgUrl: '.home-section__featured .teaser--hero img',
    mobHeroImgLink: '.home-section__featured .teaser--hero .teaser__image',
    mobHeroTitle:
        '.home-section__featured  .teaser--hero-img-top .teaser__title',
    mobHeroTitleLink:
        '.home-section__featured  .teaser--hero .teaser__title > a',
    mobHeroShortTeaser:
        '.home-section__featured  .teaser--hero-img-top .teaser__summary',
    mobHeroTag:
        ".home-section__featured  .teaser--hero-img-top .teaser__tags [class^='tag-']",
    mobPrimaryHeroTag: '.teaser--hero-img-top .tag-primary',
    mobSecondaryHeroTag: '.teaser--hero-img-top .tag-secondary',

    //Feed
    topFeedTeaserImg: 'article.teaser--img-top img',
    topFeedTeaserImgLink: 'article.teaser--img-top a.teaser__image',
    topFeedTeaserTitle: 'article.teaser--img-top .teaser__title a',
    topFeedTeaserTag: 'article.teaser--img-top .teaser__tags .tag-primary a',
    bottomFeedTeaserImg:
        '.repeatable-component article.teaser--img-left .teaser__image img',
    bottomFeedTeaserImgLink:
        '.repeatable-component article.teaser--img-left a.teaser__image',
    bottomFeedTeaserTitle:
        '.repeatable-component article.teaser--img-left .teaser__title a',
    bottomFeedTeaserTag:
        '.repeatable-component article.teaser--img-left .teaser__tags .tag-primary a',

    //Top feed
    topTeasers: '.home-section__featured .teaser--img-top',
    topTeaserImgs: 'section .teaser--img-top img',
    topTeaserTitles: 'section .teaser--img-top .teaser__title',
    topTeaserTags: "section .teaser--img-top .teaser__tags [class^='tag-']",
    topTeaserTagLinks:
        "section .teaser--img-top .teaser__tags [class^='tag-'] a",

    //Bottom feed
    bottomTeasers: '.repeatable-component .row:nth-child(1) .teaser--img-left',
    bottomTeaserImgs: '.repeatable-component section .teaser img',
    bottomTeaserTitles: '.repeatable-component section .teaser__title',
    bottomTeaserTags:
        ".repeatable-component section .teaser__tags [class^='tag-']",
    bottomTeaserTagLinks:
        ".repeatable-component section .teaser__tags [class^='tag-'] a",

    //LoadMore Feed
    loadMoreFeed:
        '.repeatable-component .section__row:nth-child(2) .teaser--img-left',
    stickyMobileBanner:
        '.home-section .sticky-block.sticky-block--at-bottom.sticky-block--out-of-view',
    loadMoreFeedTeaserImg:
        '.repeatable-component div:nth-child(2) article:nth-child(2) .teaser__image img',
    loadMoreFeedTeaserImgLink:
        '.repeatable-component div:nth-child(2) article:nth-child(2) .teaser__image',

    // RHR
    newsletterSignUpBtn: '.newsletter-subscribe__button .button--link'
};
module.exports = homepage_widget;
