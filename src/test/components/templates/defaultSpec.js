import React from 'react';
import ReactDOM from 'react-dom';
import { betterMockComponentContext } from '@bxm/flux';
import PropTypes from 'prop-types';
import forOwn from 'lodash/object/forOwn';
import cloneDeep from 'lodash/lang/cloneDeep';
import { localeData } from '../../mock/config';
import { entity } from '../../mock/articles';
import clone from 'lodash/lang/clone';
import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const { TestUtils } = Context;

const HeaderStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponentWithChildren();
const ListingFooterStub = Context.createStubComponent();
const offCanvasStub = Context.createStubComponent();

const HomeHeader = Context.createStubComponent();
const BrandHeader = Context.createStubComponent();
const SectionHeader = Context.createStubComponent();

const AdsWrapperStub = Context.createStubComponentWithChildren();

const HomePageStub = Context.createStubComponent();
const ArticleStub = Context.createStubComponent();
const BrandStub = Context.createStubComponent();
const NavSectionStub = Context.createStubComponent();
const TagStub = Context.createStubComponent();
const CampaignStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();
const ListingRendererStub = Context.createStubComponent();

const Error404Stub = Context.createStubComponent();
const Error500Stub = Context.createStubComponent();

const toggleMenuStub = sinon.stub();

let reactModuleInstance;

function mockErrorHandlerBuilder(code) {
    switch (code) {
        case 404:
            return Error404Stub;
        case 500:
        default:
            return Error500Stub;
    }
}

const getBrandStub = () => {
    return { logo: '/assets/svgs/belle.svg' };
};

const Default = proxyquire('../../../app/components/templates/default', {
    react: React,
    '@bxm/nav/lib/components/hamburgerWrapper': Component => {
        return class extends React.Component {
            render() {
                reactModuleInstance = Component;
                return <Component {...this.props} toggleSideMenu={toggleMenuStub} />;
            }
        };
    },
    '@bxm/site-header': HeaderStub,
    '../home/home': HomePageStub,
    '../article/page': ArticleStub,
    '../section/tag/section': TagStub,
    '../off-canvas/offCanvas': offCanvasStub,
    '../section/navigationTag/section': NavSectionStub,
    '../brand/section': BrandStub,
    '../section/sponsorTag/section': CampaignStub,
    '../gallery/gallery': GalleryStub,
    '../site-footer': SiteFooterStub,
    '../listings/components/listingFooter': ListingFooterStub,
    '../brand/header': BrandHeader,
    '../home/header': HomeHeader,
    '../section/header': SectionHeader,
    '@bxm/ad/lib/google/components/standardPageAdsWrapper': AdsWrapperStub,
    '../error/errorHandlerBuilder': mockErrorHandlerBuilder,
    '../brand/utilities/getBrand': getBrandStub,
    '../listings/templates/listingRenderer': ListingRendererStub,
    picturefill: {}
});

const headerNavItems = [
    { name: 'Real Homes', url: '/real-homes' },
    { name: 'Bedroom', url: '/bedroom' },
    { name: 'Kitchen', url: '/kitchen' },
    { name: 'DIY', url: '/diy' }
];

const hamburgerNavItems = [
    { name: 'Lifestyle', url: '/lifestyle' },
    { name: 'Beer', url: '/beer' },
    { name: 'Luxury Homes', url: '/luxury-homes' },
    { name: 'Win', url: '/win' }
];

const categoriesItems = [
    {
        title: 'Artists & Galleries',
        displayName: 'Artists & Galleries',
        url: '/directory/artists-and-galleries',
        imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/homes/2019/04/29/20015/Galleries.jpg',
        urlName: 'artist-and-galleries'
    },
    {
        title: 'Architects & Builders',
        displayName: 'Architects & Builders',
        url: '/directory/architects-and-builders',
        imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/homes/2019/04/29/20016/Builders.jpg',
        urlName: 'architects-and-builders'
    },
    {
        title: 'Interior Designers',
        displayName: 'Interior Designers',
        url: '/directory/interior-designers',
        imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/homes/2019/04/29/20017/Interior-Designers.jpg',
        urlName: 'interior-designers'
    },
    {
        title: 'Furniture & Interiors',
        displayName: 'Furniture & Interiors',
        url: '/directory/furniture-and-interiors',
        imageUrl: 'https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/homes/2019/04/29/20018/Furniture-and-Interiors.jpg',
        urlName: 'furniture-and-interiors'
    }
];

const contactForm = {};

function getDefaultContent() {
    const content = clone(entity);
    content.urlName = 'belle';
    content.title = 'Belle';
    content.tagsDetails = undefined;
    return content;
}

const defaultStoreData = {
    PageStore: {
        headerNavItems,
        content: getDefaultContent(),
        error: undefined
    },
    ListingSingleStore: {
        headerNavItems,
        content: getDefaultContent(),
        error: undefined,
        contactForm
    }
};

let storeData = defaultStoreData;

function resetStoreData() {
    storeData = cloneDeep(defaultStoreData);
}

Context.addStore('PageStore', {
    getContent() {
        return storeData.PageStore.content;
    },
    getTheme() {
        return {};
    },
    getErrorStatus() {
        return storeData.PageStore.error;
    }
});

Context.addStore('NavigationStore', {
    getHeaderItems() {
        return headerNavItems;
    },
    getHamburgerItems() {
        return hamburgerNavItems;
    }
});

Context.addStore('DirectoryStore', {
    getContent() {
        return storeData.PageStore.content;
    },
    getHeaderItems() {
        return headerNavItems;
    },
    getHamburgerItems() {
        return hamburgerNavItems;
    },
    getCategoriesItems() {
        return categoriesItems;
    },
    getErrorStatus() {
        return storeData.PageStore.error;
    }
});

Context.addStore('EmailStore', {
    getContactForm() {
        return contactForm;
    }
});

describe('Default Component template', () => {
    let reactModule;
    let currentInstance;
    let wrapper;
    let template;
    let header;
    let sectionHeader;
    let sideMenu;
    let footer;
    let adsWrapper;
    let listingsWrapper;

    const sectionBrandsDataStub = {
        belle: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/belle.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/belle.svg',
            social: {
                facebook: 'https://www.facebook.com/BelleMagazineAu',
                twitter: 'https://twitter.com/BelleMagazineAu',
                instagram: 'https://instagram.com/bellemagazineau/?hl=en'
            }
        }
    };

    const configToStub = {
        get: () => localeData,
        brands: {
            section: sectionBrandsDataStub
        },
        site: {
            name: 'homes to love'
        }
    };

    const contextConfigStub = {
        key: 'config',
        type: PropTypes.object,
        value: configToStub,
        executeAction: () => {}
    };

    beforeEach(() => {
        resetStoreData();
    });

    afterEach(() => {
        Context.cleanup;
    });

    describe('Error Handling', () => {
        it('shows 500 error if content is not specified', () => {
            storeData.PageStore.content = null;
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            expect(TestUtils.findRenderedComponentWithType(reactModule, Error500Stub)).to.exist;
        });

        it('shows 500 error if content is not known', () => {
            storeData.PageStore.content = { nodeType: 'UnknownHomepage', title: 'UnknownHomepage' };
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
            storeData.PageStore.content = { nodeType: 'Homepage', title: 'something else', url: '/' };
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            currentInstance = TestUtils.findRenderedComponentWithType(reactModule, reactModuleInstance);
            sideMenu = TestUtils.findRenderedComponentWithType(reactModule, offCanvasStub);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            footer = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
            adsWrapper = TestUtils.findRenderedComponentWithType(reactModule, AdsWrapperStub);
        });

        it(`sets Header 'navItems' prop correctly to array`, () => {
            expect(header.props.navItems).to.eql(headerNavItems);
        });

        it(`sets SideMenu 'items' prop to array`, () => {
            expect(sideMenu.props.navItems).to.eql(hamburgerNavItems);
        });

        it(`shows the footer`, () => {
            expect(ReactDOM.findDOMNode(footer)).to.exist;
        });

        it('sets the toggleMenu prop on Header to be toggleMenu instance method', () => {
            expect(header.props.toggleMenu).to.eq(currentInstance.toggleMenu);
        });

        it('renders the AdsWrapper component', () => {
            expect(ReactDOM.findDOMNode(adsWrapper)).to.exist;
        });
    });

    describe('Premium Listing Page', () => {
        beforeEach(() => {
            // TODO = refactor these stores so that they don't rely on other store data in the setup
            storeData.PageStore.content = { nodeType: 'PremiumListing', title: 'premium listing test' };
            reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
            footer = TestUtils.findRenderedComponentWithType(reactModule, ListingFooterStub);
            listingsWrapper = TestUtils.findRenderedComponentWithType(reactModule, ListingRendererStub);
        });

        it('does not render the AdsWrapper component', () => {
            // TODO - check that this doesn't get rendered
        });

        it('renders the listings container', () => {
            expect(ReactDOM.findDOMNode(listingsWrapper)).to.exist;
        });
    });

    describe('header and footer visibility', () => {
        forOwn(
            {
                Homepage: {
                    ContentHeaderHandler: HomeHeader,
                    ContentHandler: HomePageStub
                },
                HomesArticle: {
                    ContentHeaderHandler: HomeHeader,
                    ContentHandler: ArticleStub
                },
                NavigationSection: {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: NavSectionStub
                },
                TagSection: {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: TagStub
                },
                BrandSection: {
                    ContentHeaderHandler: BrandHeader,
                    ContentHandler: BrandStub
                },
                Campaign: {
                    ContentHeaderHandler: SectionHeader,
                    ContentHandler: CampaignStub
                },
                Gallery: {
                    ContentHandler: ArticleStub
                }
            },
            (metadata, nodeType) => {
                const { ContentHeaderHandler, ContentHandler, excludeAdsWrapper } = metadata;

                describe(`for nodeType "${nodeType}"`, () => {
                    before(() => {
                        storeData.PageStore.content.nodeType = nodeType;
                        reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                        header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
                        footer = TestUtils.findRenderedComponentWithType(reactModule, SiteFooterStub);
                    });

                    it('returns the correct Header Handler title for Navigation, Tag, and Campaign Section node types', () => {
                        storeData.PageStore.content.nodeType = nodeType;
                        storeData.PageStore.content.title = 'My Section Header';
                        reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                        if (nodeType === 'NavigationSection' || nodeType === 'TagSection' || nodeType === 'Campaign') {
                            sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
                            expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.title);
                        }
                    });

                    // TODO - Refactor so these actually test something
                    // it('returns the correct handler', () => {
                    //     if (nodeType === 'Homepage' || nodeType === 'BrandSection') {
                    //         wrapper = TestUtils.findRenderedComponentWithType(reactModule, AdsWrapper);
                    //         template = TestUtils.findRenderedComponentWithType(wrapper, ContentHandler);
                    //     } else {
                    //         template = TestUtils.findRenderedComponentWithType(reactModule, ContentHandler);
                    //     }
                    // });
                });
            }
        );
    });

    describe('with NavSectionHeader and TagsDetails', () => {
        describe('when tagsDetails is defined', () => {
            before(() => {
                resetStoreData();
            });
            after(() => {
                Context.cleanup;
            });

            it('ContentHeadingHandler should use displayName from tagsDetails as title prop', () => {
                storeData.PageStore.content.nodeType = 'NavigationSection';
                storeData.PageStore.content.tagsDetails = [{ displayName: 'My Display Name' }];
                reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
                expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.tagsDetails[0].displayName);
            });
        });

        describe('when tagsDetails is undefined', () => {
            before(() => {
                resetStoreData();
                storeData.PageStore.content.nodeType = 'NavigationSection';
                storeData.PageStore.content.tagDetails = undefined;
                reactModule = Context.mountComponent(Default, {}, [contextConfigStub]);
                sectionHeader = TestUtils.findRenderedComponentWithType(reactModule, SectionHeader);
            });
            after(() => {
                Context.cleanup;
            });
            it('ContentHeadingHandler should use the default value as a title prop ', () => {
                expect(sectionHeader.props.title).to.deep.equal(storeData.PageStore.content.title);
            });
        });
    });

    describe('with theme', () => {
        const mockTheme = {
            headerSmallBackground: 'url',
            headerMediumBackground: 'url',
            headerLargeBackground: 'url;'
        };

        describe('when theme is active for nodeType', () => {
            before(() => {
                wrapper = shallow(<Default />, {
                    context: {
                        ...contextConfigStub,
                        config: { site: { name: 'homes' } },
                        getStore() {
                            return {
                                on() {},
                                getContent: () => {},
                                getTheme: () => mockTheme,
                                getHeaderItems: () => [],
                                getHamburgerItems: () => [],
                                getCategoriesItems: () => [],
                                getErrorStatus: () => {},
                                getContactForm: () => {}
                            };
                        }
                    }
                });
            });
            it('passes the theme to the Header component', () => {
                const headerComponentWrapper = wrapper
                    .dive()
                    .dive()
                    .find(HeaderStub);

                expect(headerComponentWrapper.prop('theme')).to.eq(mockTheme);
            });
            it('sets the isExpanded prop on the Header component to true', () => {
                const headerComponentWrapper = wrapper
                    .dive()
                    .dive()
                    .find(HeaderStub);
                expect(headerComponentWrapper.prop('isExpanded')).to.be.true;
            });
        });
    });

    describe('component methods', () => {
        describe('toggleMenu', () => {
            let wrapper;

            before(() => {
                wrapper = shallow(<Default />, {
                    context: {
                        ...contextConfigStub,
                        config: { site: { name: 'homes' } },
                        getStore() {
                            return {
                                on() {},
                                getContent: () => {},
                                getTheme: () => {},
                                getHeaderItems: () => [],
                                getHamburgerItems: () => [],
                                getCategoriesItems: () => [],
                                getErrorStatus: () => {},
                                getContactForm: () => {}
                            };
                        }
                    }
                });
            });

            it('should call the toggleSideMenu prop as a function', () => {
                wrapper
                    .dive()
                    .dive()
                    .instance()
                    .toggleMenu();

                expect(toggleMenuStub.calledOnce).to.be.true;
                expect(toggleMenuStub.calledWith('left')).to.be.true;
            });
        });
    });
});
