function lhrWidget() {
    this.selectors = {
        feedList: '.article-feed-container.container.row ul.feed__items li.feed-item',
        feedImages: '.article-feed-container.container.row ul.feed__items li.feed-itema.teaser__image'
    };

    this.feedListCount = function() {};

    this.feedImagesCount = function() {};

    return this;
}

module.exports = lhrWidget;
