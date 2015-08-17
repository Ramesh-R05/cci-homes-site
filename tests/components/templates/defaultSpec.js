import {betterMockComponentContext} from '@bxm/flux';
import forOwn from 'lodash/object/forOwn';
import cloneDeep from 'lodash/lang/cloneDeep';
import {localeData} from '../../mock/config';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const config = {
    get: () => {}
};

// ----------------------------------------------------------------------------- Stub components

const NetworkHeaderStub = Context.createStubComponent();
const HeaderStub = Context.createStubComponent();
const HomepageStub = Context.createStubComponent();
const HomesArticleStub = Context.createStubComponent();
const SectionStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();
const SideMenuStub = Context.createStubComponent();
const FooterStub = Context.createStubComponentWithChildren();
const proxyquire = require('proxyquire').noCallThru();

// ----------------------------------------------------------------------------- Store config

const navItems = [
    { name: 'Home tours', url: '/home-tours' },
    { name: 'Interiors', url: '/interiors' },
    { name: 'Outdoor', url: '/outdoor' },
    { name: 'Renovate', url: '/renovate' }
];
const defaultStoreData = {
    MenuStore: {
        navItems,
        sideMenuOpen: false
    },
    EntityStore: {
        content: { some: 'content' },
        error: undefined
    }
};

let storeData;
function resetStoreData() {
    storeData = cloneDeep(defaultStoreData);
}

Context.addStore('EntityStore', {
    getContent() {
        return storeData.EntityStore.content;
    },
    getErrorStatus() {
        return storeData.EntityStore.error;
    }
});

Context.addStore('MenuStore', {
    isSideMenuOpen() {
        return storeData.MenuStore.sideMenuOpen;
    },
    getNavItems() {
        return storeData.MenuStore.navItems;
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
    'react/addons': React,
    '@bxm/header/lib/header/header': NetworkHeaderStub,
    '../header/header': HeaderStub,
    '../side-menu/sideMenu': SideMenuStub,
    '../home/home': HomepageStub,
    '../article/section': HomesArticleStub,
    '../section/section': SectionStub,
    '../gallery/gallery': GalleryStub,
    '../footer/footer': FooterStub,
    '../error/errorHandlerBuilder': mockErrorHandlerBuilder,
    '@bxm/config': { load: () => { return config } }
});

describe('Default Component template', () => {
    let reactModule;
    let template;
    let networkHeader;
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
            storeData.EntityStore.content = { nodeType: 'RickRoll' };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 500 error if content is not specified', () => {
            storeData.EntityStore.content = null;
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 404 error when error status code is 404', () => {
            storeData.EntityStore.content = null;
            storeData.EntityStore.error = { status: 404 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error404Stub)[0]).to.exist;
        });

        it('shows 500 error when error status code is 500', () => {
            storeData.EntityStore.error = { status: 500 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });

        it('shows 500 error when error status code is unknown', () => {
            storeData.EntityStore.error = { status: -1 };
            reactModule = Context.mountComponent(Default);
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, Error500Stub)[0]).to.exist;
        });
    });

    describe('Home Page', () => {
        beforeEach(() => {
            storeData.EntityStore.content = { nodeType: 'Homepage' };
            reactModule = Context.mountComponent(Default);
            sideMenu = TestUtils.findRenderedComponentWithType(reactModule, SideMenuStub);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            footer = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
        });

        it(`sets Header 'isSideMenuOpen' prop to 'false'`, () => {
            expect(header.props.isSideMenuOpen).to.be.false;
        });

        it(`sets Header 'navItems' prop correctly to array`, () => {
            expect(header.props.navItems).to.eql(navItems);
        });

        it(`sets SideMenu 'open' prop to 'false'`, () => {
            expect(sideMenu.props.open).to.be.false;
        });

        it(`sets SideMenu 'items' prop to array`, () => {
            expect(sideMenu.props.navItems).to.eql(navItems);
        });

        it(`sets SideMenu 'data' prop properly`, () => {
            expect(sideMenu.props.data).to.eql(localeData);
        });

        it(`sets Footer 'data' prop properly`, () => {
            expect(footer.props.data).to.eql(localeData);
        });
    });

    describe('header and footer visibility', () => {
        forOwn({
            'Homepage': {
                component: HomepageStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: true,
                hideFooter: false
            },
            'HomesArticle': {
                component: HomesArticleStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: false,
                hideFooter: true
            },
            'NavigationSection': {
                component: SectionStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: false,
                hideFooter: false
            },
            'Gallery': {
                component: GalleryStub,
                hideNetworkHeader: true,
                hideHeader: true,
                isExpanded: false,
                hideFooter: true
            }
        }, (metadata, nodeType) => {
            const {component, hideFooter, hideNetworkHeader, hideHeader, isExpanded} = metadata;

            describe(`for nodeType "${nodeType}"`, () => {
                before(() => {
                    storeData.EntityStore.content = {nodeType};
                    reactModule = Context.mountComponent(Default);
                    header = TestUtils.scryRenderedComponentsWithType(reactModule, HeaderStub)[0];
                    footer = TestUtils.scryRenderedComponentsWithType(reactModule, FooterStub)[0];
                });

                it('returns the correct handler', () => {
                    template = TestUtils.scryRenderedComponentsWithType(reactModule, component);
                    expect(template).to.have.length(1);
                });

                it(`${hideNetworkHeader ? 'hides' : 'shows'} the network header`, () => {
                    networkHeader = TestUtils.scryRenderedComponentsWithType(reactModule, NetworkHeaderStub);
                    expect(networkHeader).to.have.length(hideNetworkHeader ? 0 : 1);
                });

                it(`${hideHeader ? 'hides' : 'shows'} the header`, () => {
                    if (hideHeader) {
                        expect(React.findDOMNode(header)).not.to.exist;
                    } else {
                        expect(React.findDOMNode(header)).to.exist;
                    }
                });

                it(`${hideFooter ? 'hides' : 'shows'} the footer`, () => {
                    if (hideFooter) {
                        expect(React.findDOMNode(footer)).not.to.exist;
                    } else {
                        expect(React.findDOMNode(footer)).to.exist;
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
