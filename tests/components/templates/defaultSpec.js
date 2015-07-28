import {betterMockComponentContext} from '@bxm/flux';
import {forOwn} from 'lodash/object';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

let content;
Context.addStore('EntityStore', {
    getContent() {
        return content;
    }
});

let isSideMenuOpen = false;
let navItems = [
    { name: 'Home tours', url: '/home-tours' },
    { name: 'Interiors', url: '/interiors' },
    { name: 'Outdoor', url: '/outdoor' },
    { name: 'Renovate', url: '/renovate' }
];
Context.addStore('MenuStore', {
    isSideMenuOpen() {
        return isSideMenuOpen;
    },
    getNavItems() {
        return navItems;
    }
});

const NetworkHeaderStub = Context.createStubComponent();
const HeaderStub = Context.createStubComponent();
const HomepageStub = Context.createStubComponent();
const HomesArticleStub = Context.createStubComponent();
const SectionStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();
const SideMenuStub = Context.createStubComponent();
const proxyquire = require('proxyquire').noCallThru();
const Default = proxyquire('../../../app/components/templates/default', {
    'react': React,
    'react/addons': React,
    '@bxm/header/lib/header/header': NetworkHeaderStub,
    '../header/header': HeaderStub,
    '../side-menu/sideMenu': SideMenuStub,
    '../home/home': HomepageStub,
    '../article/section': HomesArticleStub,
    '../section/section': SectionStub,
    '../gallery/gallery': GalleryStub
});

describe('Default Component template', () => {
    let reactModule;
    let template;
    let networkHeader;
    let header;
    let sideMenu;

    it('does not render if content is not specified', () => {
        content = undefined;
        reactModule = Context.mountComponent(Default);
        expect(React.findDOMNode(reactModule)).to.be.null;
    });

    it('does not render if nodeType is unknown', () => {
        content = { nodeType: 'RickRoll' };
        reactModule = Context.mountComponent(Default);
        expect(React.findDOMNode(reactModule)).to.be.null;
    });

    describe('store data', () => {
        before(() => {
            content = { nodeType: 'Homepage' };
            reactModule = Context.mountComponent(Default);
            sideMenu = TestUtils.findRenderedComponentWithType(reactModule, SideMenuStub);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
        });

        it('sets Header "isSideMenuOpen" prop to "false"', () => {
            expect(header.props.isSideMenuOpen).to.be.false;
        });

        it('sets Header "isSideMenuOpen" prop to "false"', () => {
            expect(header.props.navItems).to.eql(navItems);
        });

        it('sets SideMenu "open" prop to "false"', () => {
            expect(sideMenu.props.open).to.be.false;
        });

        it('sets SideMenu "items" prop to array', () => {
            expect(sideMenu.props.navItems).to.eql(navItems);
        });
    });

    describe('header visibility', () => {
        forOwn({
            'Homepage': {
                component: HomepageStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: true
            },
            'HomesArticle': {
                component: HomesArticleStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: false
            },
            'NavigationSection': {
                component: SectionStub,
                hideNetworkHeader: false,
                hideHeader: false,
                isExpanded: false
            },
            'Gallery': {
                component: GalleryStub,
                hideNetworkHeader: true,
                hideHeader: true,
                isExpanded: false
            }
        }, (metadata, nodeType) => {
            const {component, hideNetworkHeader, hideHeader, isExpanded} = metadata;

            describe(`for nodeType "${nodeType}"`, () => {
                before(() => {
                    content = { nodeType };
                    reactModule = Context.mountComponent(Default);
                    header = TestUtils.scryRenderedComponentsWithType(reactModule, HeaderStub)[0];
                });

                it('returns the correct handler', () => {
                    template = TestUtils.findRenderedComponentWithType(reactModule, component);
                    expect(template).to.exist;
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
