import {betterMockComponentContext} from '@bxm/flux';
import forOwn from 'lodash/object/forOwn';
import cloneDeep from 'lodash/lang/cloneDeep';
import {localeData} from '../../mock/config';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const config = {
    get: () => {}
};

// ----------------------------------------------------------------------------- Stub components

const HeaderStub = Context.createStubComponent();
const UniHeaderStub = Context.createStubComponent();
const HomepageStub = Context.createStubComponent();
const HomesArticleStub = Context.createStubComponent();
const TagSectionStub = Context.createStubComponent();
const NavigationTagSectionStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();
const SideMenuStub = Context.createStubComponent();
const FooterStub = Context.createStubComponentWithChildren();


// ----------------------------------------------------------------------------- Store config

const headerItems = [
    { name: 'Real Homes', url: '/real-homes' },
    { name: 'Bedroom', url: '/bedroom' },
    { name: 'Kitchen', url: '/kitchen' },
    { name: 'DIY', url: '/diy' }];

const defaultStoreData = {
    MenuStore: {
        sideMenuOpen: false
    },
    AppStore: {
        headerItems
    },
    PageStore: {
        content: { some: 'content' },
        error: undefined
    }
};

let storeData;
function resetStoreData() {
    storeData = cloneDeep(defaultStoreData);
}

Context.addStore('PageStore', {
    getContent() {
        return storeData.PageStore.content;
    },
    getErrorStatus() {
        return storeData.PageStore.error;
    }
});

Context.addStore('MenuStore', {
    isSideMenuOpen() {
        return storeData.MenuStore.sideMenuOpen;
    }
});

Context.addStore('AppStore', {
    getHeaderItems() {
        return headerItems;
    }
});

// ----------------------------------------------------------------------------- Load with mocks

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
    '../header/header': HeaderStub,
    '../side-menu/sideMenu': SideMenuStub,
    '../home/home': HomepageStub,
    '../article/page': HomesArticleStub,
    '../section/tag/section': TagSectionStub,
    '../header/uniheader' : UniHeaderStub,
    '@bxm/article/lib/bridgeUtils/partsFactory': {initalizeParts(){}},
    '../section/navigationTag/section': NavigationTagSectionStub,
    '@bxm/gallery/lib/components/page/gallery': GalleryStub,
    '../footer/footer': FooterStub,
    '../error/errorHandlerBuilder': mockErrorHandlerBuilder,
    '@bxm/config': { load: () => { return config } },
    'picturefill': {}
});

// ----------------------------------------------------------------------------- tests

describe('Default Component template', () => {
    let reactModule;
    let template;
    let header;
    let sideMenu;
    let footer;
    let data;

    before( () => {
        data = sinon.stub(config, 'get').returns(localeData);
    });

    beforeEach( () => {
        resetStoreData();
    });

    after( () => {
        data.restore();
    });

    describe('Error Handling', () => {
        it('shows 500 error if nodeType is unknown', () => {
            storeData.PageStore.content = { nodeType: 'RickRoll' };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 500 error if content is not specified', () => {
            storeData.PageStore.content = null;
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 404 error when error status code is 404', () => {
            storeData.PageStore.content = null;
            storeData.PageStore.error = { status: 404 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error404Stub)[0]).to.exist;
        });

        it('shows 500 error when error status code is 500', () => {
            storeData.PageStore.error = { status: 500 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 500 error when error status code is unknown', () => {
            storeData.PageStore.error = { status: -1 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });
    });

    describe('Home Page', () => {
        beforeEach(() => {
            storeData.PageStore.content = { nodeType: 'Homepage' };
            reactModule = Context.mountComponent(Default);
            sideMenu = TestUtils.findRenderedComponentWithType(reactModule, SideMenuStub);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            footer = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
        });


        it(`sets Header 'isSideMenuOpen' prop to 'false'`, () => {
            expect(header.props.isSideMenuOpen).to.be.false;
        });


        it(`sets Header 'navItems' prop correctly to array`, () => {
            expect(header.props.navItems).to.eql(headerItems);
        });

        it(`sets SideMenu 'open' prop to 'false'`, () => {
            expect(sideMenu.props.open).to.be.false;
        });

        it(`sets SideMenu 'items' prop to array`, () => {
            expect(sideMenu.props.navItems).to.eql(headerItems);
        });

        it(`sets SideMenu 'data' prop properly`, () => {
            expect(sideMenu.props.data).to.eql(localeData);
        });

        it(`sets Footer 'config' prop properly`, () => {
            expect(footer.props.config).to.eql(localeData);
        });
    });

    describe('Uniheader', () => {
        describe('when on home page', () => {
            before( () => {
                resetStoreData();
                storeData.PageStore.content = { nodeType: 'Homepage', url: '/' };
                reactModule = Context.mountComponent(Default);
            });
            it('should render the uniheader', () => {
                TestUtils.findRenderedComponentWithType(reactModule, UniHeaderStub);
            });
        });

        describe('when not on home page', () => {
            let UniHeader;
            before( () => {
                resetStoreData();
                storeData.PageStore.content = { nodeType: 'Homepage', url: '/real-living/' };
                reactModule = Context.mountComponent(Default);
                UniHeader = TestUtils.scryRenderedComponentsWithType(reactModule, UniHeaderStub)[0];
            });
            it('should not render the uniheader', () => {
                expect(ReactDOM.findDOMNode(UniHeader)).not.to.exist;
            });
        });
    });

    describe('header and footer visibility', () => {
        forOwn({
            'Homepage': {
                component: HomepageStub,
                hideHeader: false,
                isExpanded: true,
                hideFooter: false
            },
            'HomesArticle': {
                component: HomesArticleStub,
                hideHeader: false,
                isExpanded: false,
                hideFooter: true
            },
            'NavigationSection': {
                component: NavigationTagSectionStub,
                hideHeader: false,
                isExpanded: false,
                hideFooter: false
            },
            'TagSection': {
                component: TagSectionStub,
                hideHeader: false,
                isExpanded: false,
                hideFooter: false
            },
            'Gallery': {
                component: GalleryStub,
                hideHeader: true,
                isExpanded: false,
                hideFooter: true
            }
        }, (metadata, nodeType) => {
            const {component, hideFooter, hideHeader, isExpanded} = metadata;

            describe(`for nodeType "${nodeType}"`, () => {
                before(() => {
                    storeData.PageStore.content = {nodeType};
                    reactModule = Context.mountComponent(Default);
                    header = TestUtils.scryRenderedComponentsWithType(reactModule, HeaderStub)[0];
                    footer = TestUtils.scryRenderedComponentsWithType(reactModule, FooterStub)[0];
                });

                it('returns the correct handler', () => {
                    template = TestUtils.scryRenderedComponentsWithType(reactModule, component);
                    expect(template).to.have.length(1);
                });

                it(`${hideFooter ? 'hides' : 'shows'} the footer`, () => {
                    if (hideFooter) {
                        expect(ReactDOM.findDOMNode(footer)).not.to.exist;
                    } else {
                        expect(ReactDOM.findDOMNode(footer)).to.exist;
                    }
                });

                if (!hideHeader) {
                    it(`shows ${isExpanded ? 'an expanded' : 'a regular'} header`, () => {
                        if (isExpanded) {
                            expect(header.props.isExpanded).to.be.true;
                        } else {
                            expect(header.props.isExpanded).not.to.be.true;
                        }
                    });
                }
            });
        });
    });
});
