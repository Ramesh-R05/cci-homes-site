import { betterMockComponentContext } from '@bxm/flux';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const proxyquire = require('proxyquire').noCallThru();

const AdStub = Context.createStubComponent();
const MainStub = Context.createStubComponent();
const AsideStub = Context.createStubComponent();

let reactModuleInstance;
let expectedKeywords = ["Toronto",  "Nav Item"];


const ViewportStub = (CompositeComponent) => {
    return class extends React.Component {
        render() {
            reactModuleInstance = CompositeComponent;
            return <CompositeComponent { ...this.props } />;
        }
    }
};

let initializeStub = () => {};
let nextGalleryStub = () => {};
let getKeywordsFromTagsStub = () => { return expectedKeywords};
let getFirstTagNameForCategoryStub = () => {};
let adsWrapperStub = Context.createStubComponentWithChildren();

const GalleryActionsStub = {
    initialize(...args) {
        initializeStub(...args);
    },
    nextGallery(...args) {
        nextGalleryStub(...args);
    }
};

const GallerySection = proxyquire('../../../app/components/gallery/gallery', {
    'react': React,
    '@bxm/gallery/lib/components/page/main': MainStub,
    '@bxm/gallery/lib/components/page/aside': AsideStub,
    '@bxm/gallery/lib/actions/gallery': GalleryActionsStub,
    '@bxm/behaviour/lib/components/resizeViewport': ViewportStub,
    '@bxm/ad/lib/utils/tagsUtils': {
        getKeywordsFromTags: getKeywordsFromTagsStub
    },
    '@bxm/tags/lib/utils' : {
        getFirstTagNameForCategory: getFirstTagNameForCategoryStub
    },
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/standardPageAdsWrapper' : adsWrapperStub
});

const gallery = {
    summary: 'Gallery Summary',
    title: 'Gallery Title',
    name: 'GalleryName',
    tagsDetails: [{
        name: 'location:citytown:Toronto',
        fullName: 'Toronto'
    }, {
        name: 'location:Homes navigation:Nav Item',
        fullName: 'Nav Item'
    }],
    imageUrl: 'http://image.com/image.jpg',
    dateCreated: '1/1/2000',
    siteUrl: 'http://homestolove.com.au',
    url: '/url-1234',
    id: 'HOMES-1234'
};

const galleryItems = [{ title: 'Gallery Item 1 Title' }];
const nextGallery = { title: 'Next Gallery Title', galleryItems: ['hello'] };
const numAds = 1;
const totalItems = 1;
const activeIndex = 0;
const activeItem = 0;
const currentSlideAd = 0;
const ads = { data: {}, id: 1, rendered: false, viewed: false, failed: false };
const isAdSlideItem = false;
const isAdViewed = false;

function addStores() {
    Context.addStore('GalleryPageStore', {
        getGallery: () => gallery,
        getGalleryItems: () => galleryItems,
        getNextGallery: () => nextGallery,
        getNumAds: () => numAds
    });

    Context.addStore('AdStore', {
        getAds: () => ads,
        getCurrentSlideAd: () => currentSlideAd
    });

    Context.addStore('GalleryStore', {
        getTotalItems: () => totalItems,
        getActiveIndex: () => activeIndex,
        getActiveItem: () => activeItem,
        isGalleryCompletedItemActive: true,
        isAdSlideItem: () => isAdSlideItem,
        isAdViewed: () => isAdViewed
    });
}

describe('GallerySection', () => {
    let reactModule;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: {
                hamburgers: []
            },
            site: {
                name: 'Dolly',
                shortName: ''
            },
            global: {
                breakpoints: { largeRangeMin: '1000px' }
            },
            get: () => 'test'
        }
    };
    before(addStores);
    after(Context.cleanup);

    describe('on initial render', () => {
        let galleryMain;
        let galleryAside;
        let ad;

        before(() => {
            initializeStub = sinon.stub();
            reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
            galleryMain = TestUtils.findRenderedComponentWithType(reactModule, MainStub);
            galleryAside = TestUtils.findRenderedComponentWithType(reactModule, AsideStub);
            ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        });

        it('should render the ad', () => {
            expect(ad.props).to.deep.eq({
                reloadOnResourceChange: 0,
                className: "gallery__mobile-ad row",
                label: {active: false},
                displayFor: ['small', 'medium', 'large', 'xlarge'],
                sizes: {
                    large: 'leaderboard',
                    medium: 'leaderboard',
                    small: 'banner'
                },
                targets: {
                    keyword: expectedKeywords,
                    position: 1
                }
            });
        });

        it('should render the Gallery Main Section', () => {
            expect(galleryMain.props.keyword).to.deep.eq(['Toronto', 'Nav Item']);
            expect(galleryMain.props).to.deep.contain({
                activeGalleryItem: activeItem,
                activeGalleryItemIndex: activeIndex,
                gallery,
                galleryItems,
                isGalleryCompletedItemActive: true,
                nextGallery,
                numAds,
                totalItems
            });
        });

        it('should render the Gallery Aside Section', () => {
            expect(galleryAside.props.keyword).to.deep.eq(['Toronto', 'Nav Item']);
            expect(galleryAside.props).to.deep.contain({
                activeGalleryItem: activeItem,
                activeGalleryItemIndex: activeIndex,
                gallery,
                galleryItems,
                isGalleryCompletedItemActive: true,
                nextGallery,
                numAds,
                totalItems,
                showSocialShare: true
            });
        });

        it('should initalise the page', () => {
            expect(initializeStub.args[0][1]).to.deep.eq({
                galleryTitle: gallery.title,
                items: galleryItems
            });
        });
    });

    describe('#componentWillUpdate', () => {
        let galleryComp;
        beforeEach(() => {
            reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
            galleryComp = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
            initializeStub = sinon.stub();
        });

        it('should not re-initalise the gallery', () => {
            expect(initializeStub).to.not.have.been.called;
            galleryComp.componentWillUpdate({ galleryItems });
            expect(initializeStub).to.not.have.been.called;
        });

        it('should should re-initalise the gallery', () => {
            const nextGalleryProps = { id: 'testID', title: 'testTitle' };
            expect(initializeStub).to.not.have.been.called;
            galleryComp.componentWillUpdate({ galleryItems: [], gallery: nextGalleryProps });
            expect(initializeStub).to.have.been.called;
            expect(initializeStub.args[0][1]).to.deep.eq({
                galleryId: nextGalleryProps.id,
                galleryTitle: nextGalleryProps.title,
                items: []
            });
        });
    });

    describe('#onNextGalleryClick', () => {
        let galleryComp;
        beforeEach(() => {
            reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
            galleryComp = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
            nextGalleryStub = sinon.stub();
        });

        it('should set the nextGallery data', () => {
            expect(nextGalleryStub).to.not.have.been.called;
            galleryComp.onNextGalleryClick();
            expect(nextGalleryStub).to.have.been.called;
            expect(nextGalleryStub.args[0][1]).to.deep.eq({
                galleryTitle: nextGallery.title,
                gallery: nextGallery,
                items: nextGallery.galleryItems,
                totalItems: nextGallery.galleryItems.length,
                activeIndex: 0,
                activeItem: nextGallery.galleryItems[0]
            });
        });
    });

    describe('#componentWillReceiveProps', () => {
        let galleryComp;
        describe('when the window width is large', () => {
            beforeEach(() => {
                reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
                galleryComp = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
                galleryComp.componentWillReceiveProps({ viewport: { height: 1000, width: 1500 } });
            });

            it('should set the galleryHeight state in the correct pixels', () => {
                expect(galleryComp.state.galleryHeight).to.eq(`${1000 - reactModuleInstance.headerHeight}px`);
            });
        });

        describe('when the window width is small', () => {
            beforeEach(() => {
                reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
                galleryComp = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
                galleryComp.componentWillReceiveProps({ viewport: { height: 1000, width: 500 } });
            });

            it('should set the galleryHeight state in the correct pixels', () => {
                expect(galleryComp.state.galleryHeight).to.eq('auto');
            });
        });
    });

    describe('#onPop', () => {
        let galleryComp;
        let reloadStub;
        let prevLocation;
        let prevStyles;

        beforeEach(() => {
            reloadStub = sinon.stub(document.location, 'reload');
            prevLocation = document.location.pathname;
            prevStyles = document.body.style;
            reactModule = Context.mountComponent(GallerySection, {}, [contextConfigStub]);
            galleryComp = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
        });

        afterEach(() => {
            document.location.pathname = prevLocation;
            document.body.style = prevStyles;
        });

        describe('when on the same gallery page', () => {
            beforeEach(() => {
                document.location.pathname = gallery.url;
            });

            it('should not call the reload and hide the body element', () => {
                expect(document.body.style.display).to.eq('')
                expect(reloadStub).to.not.have.been.called;
                galleryComp.onPop();
                expect(document.body.style.display).to.eq('none');
                expect(reloadStub).to.have.been.called;
            });
        });
    });
});
