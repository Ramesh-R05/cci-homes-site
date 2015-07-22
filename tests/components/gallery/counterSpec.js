/**
 * @jsx React.DOM
 */
var Context = require('@bxm/flux').betterMockComponentContext();
var TestUtils = Context.TestUtils;
var testData = require('../../mock/gallery');
var proxyquire = require('proxyquire');

var GalleryDetailCounter = proxyquire('../../../app/components/gallery/counter', {
    "react": Context.React,
    '@bxm/ui/lib/social/components/SocialShareBlock': Context.createStubComponent()
});

describe('GalleryCounter', function() {
    var reactModule,
        galleryItems = testData.entity.galleryItems,
        activeGalleryItem = galleryItems[0];
    activeGalleryItem.index = 1;

    after(Context.cleanup);

    describe('Gallery Header Counter', function() {
        var props = {
            galleryItems: galleryItems,
            activeGalleryItem: activeGalleryItem,
            numAds: 0,
            showGalleryCompletedItem: false
        };

        before(function() {
            reactModule = Context.mountComponent(GalleryDetailCounter, props);
        });

        it('should display the correct current slide count to ' + (activeGalleryItem.index), function() {
            var currentSlideIndexNode = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery__slide-current');
            currentSlideIndexNode.getDOMNode().textContent.should.equal((activeGalleryItem.index).toString());


        });

        it('should display the correct last slide count to ' + (galleryItems.length), function() {
            var lastSlideIndexNode = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery__slide-last');
            lastSlideIndexNode.getDOMNode().textContent.should.equal((galleryItems.length).toString());
        });
    });
});
