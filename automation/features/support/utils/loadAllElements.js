//This function is to ensure all elements in content body and gallery container are loaded completely before validating any ads below the body. e.g. bottom leader board, sticky MREC
function loadAllElements(page) {
    switch(page) {
        case 'article':
            loadBodyContainer();
            break;
        case 'gallery':
            loadBodyContainer();
            loadGalleryContainer();
            break;
    }
}

// Sub function for body container on both article and gallery pages
function loadBodyContainer() {
    var bodyElements = browser.getAttribute('article > section.content-body-container > *', 'class');
    var element;
    for (var i = 1; i <= bodyElements.length; ++i) {
        element = 'article > section.content-body-container > *:nth-child(' + i + ')';
        browser.scroll(element);
        browser.waitForVisible(element,5000);
    }
}

// Sub function for gallery container on gallery page
function loadGalleryContainer(){
    var galleryElements = browser.getAttribute('article > section.gallery-container > *', 'class');
    var element;
    for (var i = 1; i <= galleryElements.length; ++i) {
        element = 'article > section.gallery-container > *:nth-child(' + i + ')';
        browser.scroll(element);
        browser.waitForVisible(element,5000);
    }
}

module.exports = loadAllElements;
