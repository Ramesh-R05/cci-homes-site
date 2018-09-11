var section_page = {

    //Page Elements
    sectionTitle: '.section__heading__title h1',
    sectionTopFeed: '.section__featured',
    sectionTopFeedTeaser: '.section__featured article.teaser.teaser--img-top',
    sectionTopFeedTeaserImg: '.section__featured article.teaser.teaser--img-top a.teaser__image',
    sectionTopFeedTeaserTitle: '.section__featured article.teaser.teaser.teaser--img-top .teaser__title',
    sectionTopFeedTeaserSource: '.section__featured article.teaser.teaser.teaser--img-top .teaser__source',
    sectionTopTeasers: '.section__featured .teaser--img-top',

    //Repeatable Bottom Component
    sectionRepeatableSectionTeaser: '.repeatable-component article.teaser',
    sectionRepeatableSectionTeaserImg: '.repeatable-component article.teaser a.teaser__image',
    sectionRepeatableSectionTeaserTitle: '.repeatable-component article.teaser .teaser__title',
    sectionRepeatableSectionTeaserSource: '.repeatable-component article.teaser .teaser__source',
    sectionBottomTeasers: '.repeatable-component .section__row:nth-child(1) .teaser--img-left',
    sectionRepeatableSectionTeaserAfterLoadMore: '.repeatable-component .section__row:nth-child(2) article.teaser',

    //LoadMore Feed

    sectionLoadMoreFeed: '.repeatable-component .section__row:nth-child(2) .teaser--img-left',

    //Sticky Mobile banner
    sectionStickyMobileBanner: '.sticky-block.sticky-block--at-bottom.sticky-block--out-of-view',

    // custom masthead
    customMastHead: '.header .header-banner',
    customMastHeadMobile: '.header--expanded > .header__inner'    
};

module.exports = section_page;
