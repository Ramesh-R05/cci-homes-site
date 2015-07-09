/**
 * @jsx React.DOM
 */

var Context = require('@bxm/flux').betterMockComponentContext();
var TestUtils = Context.TestUtils;
var testData = require('../../mock/gallery');
var moment = require('moment');
var proxyquire = require('proxyquire').noCallThru();

var GalleryDetailAside = proxyquire('../../../app/components/gallery/aside', {
    "react/addons": Context.React,
    "../Ads/NativeLogo": Context.createStubComponent(),
    '@bxm/ad/lib/google/components/ad': Context.createStubComponent(),
    '../../utils/markdown': {parseAsElement: Context.createStubComponent},
    '@bxm/ui/lib/markdown/components/contentBody': Context.createStubComponent(),
    '@noCallThru': true
});


describe('GalleryAside', function() {
    var reactModule;

    describe('Gallery aside with all the data', function() {
        var gallery = testData.entity,
            slides = {
                index: 0,
                shouldShowNext: false,
                active: {
                    url: ''
                }
            };

        var expectedDate = moment(gallery.dateCreated).format('ll'),
            expectedSummary = gallery.body,
            expectedSubSection = 'Test Topic';

        before(function() {
            reactModule = Context.mountComponent(GalleryDetailAside, {
                gallery: gallery,
                galleryItems: gallery.galleryItems,
                activeGalleryItem: gallery.galleryItems[0],
                activeGalleryItemIndex: 0,
                nextGallery: testData.previous.entity
            });
        });

        after(Context.cleanup);

        it('should have the date displayed as ' + expectedDate, function() {
            var date = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery__date');
            date.getDOMNode().textContent.should.equal(expectedDate);
        });

        it('should have the subsection displayed as ' + expectedSubSection, function() {
            var subSection = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery__subSection');
            subSection.getDOMNode().textContent.should.equal(expectedSubSection);
        });
    });
});
