function wn_header_widget() {

    this.selectors = {
        ToLove: 'header.global-header nav.tl-header div.left.tl-header__button',
        moreLink: 'a=More'
    };

    this.clickMobileMenu = function () {
        browser.waitForVisible(this.selectors.ToLove, 5000).click;
    };

    this.hoverMore = function (x,y) {
        browser.moveToObject(this.selectors.moreLink,x,y);
    };

    return this;

}

module.exports = wn_header_widget;
