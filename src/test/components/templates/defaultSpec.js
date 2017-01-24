import {betterMockComponentContext} from '@bxm/flux';
import forOwn from 'lodash/object/forOwn';
import cloneDeep from 'lodash/lang/cloneDeep';
import {localeData} from '../../mock/config';
import {entity} from '../../mock/articles';
import clone from 'lodash/lang/clone';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const config = {
    get: () => {}
};

const UniHeaderStub = Context.createStubComponent();
const SiteHeaderStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponentWithChildren();
const SideMenuStub = Context.createStubComponent();

const HomeHeader = Context.createStubComponent();
const BrandHeader = Context.createStubComponent();
const SectionHeader = Context.createStubComponent();

const AdsWrapper = Context.createStubComponentWithChildren();

const HomePageStub = Context.createStubComponent();
const ArticleStub = Context.createStubComponent();
const BrandStub = Context.createStubComponent();
const NavSectionStub = Context.createStubComponent();
const TagStub = Context.createStubComponent();
const CampaignStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();

const Error404Stub = Context.createStubComponent();
const Error500Stub = Context.createStubComponent();

function mockErrorHandlerBuilder(code) {
    switch (code) {
        case 404: return Error404Stub;
        case 500: return Error500Stub;
    }
}

const Default = proxyquire('../../../app/components/templates/default', {
    'react': React,
    '../header/header': SiteHeaderStub,
    '../side-menu/sideMenu': SideMenuStub,
    '../home/home': HomePageStub,
    '../article/page': ArticleStub,
    '../section/tag/section': TagStub,
    '../header/uniheader' : UniHeaderStub,
    '@bxm/article/lib/bridgeUtils/partsFactory': {initalizeParts(){}}, // TODO - deprecated??
    '../section/navigationTag/section': NavSectionStub,
    '../brand/section': BrandStub,
    '../section/sponsorTag/section': CampaignStub,
    '@bxm/gallery/lib/components/page/gallery': GalleryStub,
    '../footer/footer': SiteFooterStub,
    '../brand/header': BrandHeader,
    '../home/header': HomeHeader,
    '../section/header': SectionHeader,
    '@bxm/ad/lib/google/components/standardPageAdsWrapper': AdsWrapper,
    '../error/errorHandlerBuilder': mockErrorHandlerBuilder,
    '@bxm/config': { load: () => { return config } },
    'picturefill': {}
});

const defaultStoreData = {
    MenuStore: {
        sideMenuOpen: false
    },

    PageStore: {
        headerNavItems,
        content: getDefaultContent(),
        error: undefined
    }
};

let storeData = defaultStoreData;

const headerNavItems = [
    { name: 'Real Homes', url: '/real-homes' },
    { name: 'Bedroom', url: '/bedroom' },
    { name: 'Kitchen', url: '/kitchen' },
    { name: 'DIY', url: '/diy' }
];

function getDefaultContent() {
    let content = clone(entity);
    content.urlName = 'belle';
    content.title = 'Belle';
    content.tagsDetails = undefined;
    return content;
}

function resetStoreData() {
    storeData = cloneDeep(defaultStoreData);
}

Context.addStore('PageStore', {
    getContent() {
        return storeData.PageStore.content;
    },
    getErrorStatus() {
        return storeData.PageStore.error;
    },
    getHeaderItems() {
        return headerNavItems;
    }
});

Context.addStore('MenuStore', {
    isSideMenuOpen() {
        return storeData.MenuStore.sideMenuOpen;
    }
});

describe('Default Component template', () => {
    let reactModule;
    let renderedDOM;
    let wrapper;
    let template;
    let uniheader;
    let header;
    let sectionHeader;
    let sideMenu;
    let footer;
    let data;

    const sectionBrandsDataStub = {
        "belle": {
            "subscribe": {
                "image": "/assets/images/brand-pages/subscribe/belle.jpg",
                "link": "https://www.magshop.com.au/store/homestolove"
            },
            "logo": "/assets/svgs/belle.svg",
            "social": {
                "facebook": "https://www.facebook.com/BelleMagazineAu",
                "twitter": "https://twitter.com/BelleMagazineAu",
                "instagram": "https://instagram.com/bellemagazineau/?hl=en"
            }
        }
    };

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            sectionBrands: sectionBrandsDataStub
        }
    };

    before( () => {
        data = sinon.stub(config, 'get').returns(localeData);
    });

    beforeEach( () => {
        resetStoreData();
    });

    after( () => {
        data.restore();
    });

    afterEach( () => {
        Context.cleanup;
    });

    describe('Error Handling', () => {

        it('shows 500 error if content is not specified', () => {
            storeData.PageStore.content = null;
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error500Stub)).to.exist;
        });

        it('shows 500 error if content is not known', () => {
            storeData.PageStore.content = {nodeType: 'UnknownHomepage'};
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error500Stub)).to.exist;
        });

        it('shows 404 error when error status code is 404', () => {
            storeData.PageStore.content = null;
            storeData.PageStore.error = { status: 404 };
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error404Stub)).to.exist;
        });

        it('shows 500 error when error status code is 500', () => {
            storeData.PageStore.error = { status: 500 };
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error500Stub)).to.exist;
        });

        it('shows 500 error when error status code is unknown', () => {
            storeData.PageStore.error = { status: -1 };
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error500Stub)).to.exist;
        });
    });

    describe('Home Page', () => {
        beforeEach(() => {
            storeData.PageStore.content = { nodeType: 'Homepage' };
            reactModule = Context.mountComponent(Default);
            sideMenu = TestUtils.findRenderedComponentWithType(reactModule, SideMenuStub);
            header = TestUtils.findRenderedComponentWithType(reactModule, SiteHeaderStub);
            footer = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
        });

        it(`sets Header 'isSideMenuOpen' prop to 'false'`, () => {
            expect(header.props.isSideMenuOpen).to.be.false;
        });

        it(`sets Header 'navItems' prop correctly to array`, () => {
            expect(header.props.navItems).to.eql(headerNavItems);
        });

        it(`sets SideMenu 'open' prop to 'false'`, () => {
            expect(sideMenu.props.open).to.be.false;
        });

        it(`sets SideMenu 'items' prop to array`, () => {
            expect(sideMenu.props.navItems).to.eql(headerNavItems);
        });

        it(`sets SideMenu 'data' prop properly`, () => {
            expect(sideMenu.props.data).to.eql(localeData);
        });

        it(`sets Footer 'config' prop properly`, () => {
            expect(footer.props.config).to.eql(localeData);
        });
    });

    describe('Uniheader', () => {
        const totalDOMChildrenAtHomePage = 6;

        describe('when on home page', () => {
            before( () => {
                resetStoreData();
                storeData.PageStore.content = { nodeType: 'Homepage', url: '/' };
                reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                renderedDOM = ReactDOM.findDOMNode(reactModule);
            });
            it('should render the uniheader', () => {
                expect(renderedDOM.children.length).to.eq(totalDOMChildrenAtHomePage);
            });
        });

        describe('when not on home page', () => {
            before( () => {
                resetStoreData();
                storeData.PageStore.content = { nodeType: 'NavigationSection', url: '/real-living/' };
                reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                renderedDOM = ReactDOM.findDOMNode(reactModule);
            });
            it('should not render the uniheader', () => {
                expect(renderedDOM.children.length).to.eq(totalDOMChildrenAtHomePage - 1);
            });
        });
    });

    describe('header and footer visibility', () => {
        forOwn({
            'Homepage': {
                ContentHeaderHandler: HomeHeader,
                ContentHandler: HomePageStub,
                hideHeader: false,
                hideFooter: false
            },
            'HomesArticle': {
                ContentHeaderHandler: HomeHeader,
                ContentHandler: ArticleStub,
                hideHeader: false,
                hideFooter: true
            },
            'NavigationSection': {
                ContentHeaderHandler: SectionHeader,
                ContentHandler: NavSectionStub,
                hideHeader: false,
                hideFooter: false
            },
            'TagSection': {
                ContentHeaderHandler: SectionHeader,
                ContentHandler: TagStub,
                hideHeader: false,
                hideFooter: false
            },
            'BrandSection': {
                ContentHeaderHandler: BrandHeader,
                ContentHandler: BrandStub,
                hideHeader: false,
                hideFooter: false
            },
            'Campaign': {
                ContentHeaderHandler: SectionHeader,
                ContentHandler: CampaignStub,
                hideHeader: false,
                hideFooter: false
            },
            'Gallery': {
                ContentHandler: GalleryStub,
                hideHeader: true,
                hideFooter: true
            }
        }, (metadata, nodeType) => {
            const {ContentHeaderHandler, ContentHandler, hideFooter, hideHeader} = metadata;

            describe(`for nodeType "${nodeType}"`, () => {
                before(() => {
                    storeData.PageStore.content.nodeType = nodeType;
                    reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                    if (!hideHeader) {
                        header = TestUtils.findRenderedComponentWithType(reactModule, SiteHeaderStub);
                    }
                    if (!hideFooter) {
                        footer = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
                    }
                });

                it('returns the correct Header Handler title for Navigation, Tag, and Campaign Section node types', () => {
                    storeData.PageStore.content.nodeType = nodeType;
                    storeData.PageStore.content.title = "My Section Header";
                    reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                    if (nodeType === 'NavigationSection' || nodeType === 'TagSection' || nodeType === 'Campaign') {
                        sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
                        expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.title);
                    }
                });

                it('returns the correct handler', () => {
                    if (nodeType === 'Homepage' || nodeType === 'BrandSection') {
                        wrapper = TestUtils.findRenderedComponentWithType(reactModule, AdsWrapper);
                        template = TestUtils.findRenderedComponentWithType(wrapper, ContentHandler);
                    } else {
                        template = TestUtils.findRenderedComponentWithType(reactModule, ContentHandler);
                    }
                });

                if (!hideFooter) {
                    it(`${hideFooter ? 'hides' : 'shows'} the footer`, () => {
                        if (hideFooter) {
                            expect(ReactDOM.findDOMNode(footer)).not.to.exist;
                        } else {
                            expect(ReactDOM.findDOMNode(footer)).to.exist;
                        }
                    });
                }
            });
        });
    });

    describe(`with NavSectionHeader and Tag Details`, () => {
        let reactModule;
        let sectionHeader;

        beforeEach(() => {
            resetStoreData();
        });

        afterEach(Context.cleanup);

        it(`when defined tagsDetails should use tagsDetails displayName instead of title prop in the ContentHeadingHandler component`, () => {
            storeData.PageStore.content.nodeType = 'NavigationSection';
            storeData.PageStore.content.tagsDetails = [
                { displayName: 'My Display Name' }
            ];
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
            expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.tagsDetails[0].displayName);
        });

        it(`when undefined tagsDetails should pass down the title prop to the ContentHeadingHandler component`, () => {
            storeData.PageStore.content.nodeType = 'NavigationSection';
            storeData.PageStore.content.tagDetails = undefined;
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
            expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.title);
        });
    });
});
