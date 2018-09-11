import { betterMockComponentContext } from '@bxm/flux';
import { entity, articles as articlesMock } from '../../mock/articles';
import exposeProps from '../../test-util/exposeProps';
import cloneDeep from 'lodash/lang/cloneDeep';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const RepeatableStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();

const NavigationTagFeaturedStub = Context.createStubComponent();
const NavigationTagRailStub = Context.createStubComponent();
const NavigationTagListStub = Context.createStubComponent();
const StickyMobileAdStub = Context.createStubComponent();

const Section = proxyquire('../../../app/components/section/section', {
    react: React,
    '../repeatable': RepeatableStub,
    './featured': NavigationTagFeaturedStub,
    './rail': NavigationTagRailStub,
    './list': NavigationTagListStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyMobileAdStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const featuredArticles = articlesMock.slice(1, 4);
const navigationTags = ['Test'];

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        isFeatureEnabled: () => false,
        polar: {
            details: {
                sectionTopFeed: [
                    {
                        index: 0,
                        label: 'section_top_feed_1',
                        targets: { kw: 'section_top_feed_1' }
                    }
                ],
                sectionBottomFeed: [
                    {
                        index: 1,
                        label: 'section_bottom_feed_1',
                        targets: { kw: 'section_bottom_feed_1' }
                    }
                ]
            }
        }
    }
};

const defaultProps = {
    articles: articlesMock,
    content: {
        nodeType: 'NavigationSection',
        id: 'HOMES-1158',
        tagsDetails: [{ displayName: 'Section Heading with Tags Details' }],
        title: 'Home Tours'
    },
    isSideMenuOpen: false
};

const directoriesProps = {
    articles: articlesMock,
    content: {
        nodeType: 'NavigationSection',
        id: 'HOMES-1160',
        tagsDetails: [{ displayName: 'Section Heading with Tags Details' }],
        title: 'Directories'
    },
    isSideMenuOpen: false
};

let customProps;
function resetProps() {
    customProps = cloneDeep(defaultProps);
}

describe(`Section`, () => {
    let reactModule;

    afterEach(Context.cleanup);

    describe(`SectionNavigation nodeType with Home Tours title`, () => {
        const sectionClassName = 'section__landing';
        const contextConfigStubEnabled = {
            key: 'config',
            type: '',
            value: {
                isFeatureEnabled: () => true,
                polar: {
                    details: {
                        sectionTopFeed: [
                            {
                                index: 0,
                                label: 'section_top_feed_1',
                                targets: { kw: 'section_top_feed_1' }
                            }
                        ],
                        sectionBottomFeed: [
                            {
                                index: 1,
                                label: 'section_bottom_feed_1',
                                targets: { kw: 'section_bottom_feed_1' }
                            }
                        ]
                    }
                }
            }
        };
        let section;
        let ads;
        let navigationTagFeaturedComponent;
        let repeatableComponent;

        before(() => {
            reactModule = Context.mountComponent(Section, defaultProps, [contextConfigStubEnabled]);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            navigationTagFeaturedComponent = TestUtils.findRenderedComponentWithType(reactModule, NavigationTagFeaturedStub);
            repeatableComponent = TestUtils.findRenderedComponentWithType(reactModule, RepeatableStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(ReactDOM.findDOMNode(section)).to.exist;
        });

        describe(`Number of AdStubs`, () => {
            const numberOfAds = 1;
            it(`should have ${numberOfAds} AdStubs`, () => {
                expect(ads.length).to.eq(numberOfAds);
            });
        });

        describe(`middle leaderboard`, () => {
            const expectedClassname = 'ad--section-middle-leaderboard';
            it(`should contain the classname prop ${expectedClassname}`, () => {
                expect(ads[0].props.className).to.contain(expectedClassname);
            });

            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
            });
        });

        it('should render a featured component with the correct nativeAdConfig prop', () => {
            expect(navigationTagFeaturedComponent.props.polarTargets[0].label).to.eq('section_top_feed_1');
        });

        it('should render a repeatable component with the correct nativeAdConfig prop', () => {
            expect(repeatableComponent.props.polarTargets[0].label).to.eq('section_bottom_feed_1');
        });
    });

    describe(`SectionNavigation nodeType with Directories title`, () => {
        const sectionClassName = 'section__landing';
        const contextConfigStubEnabled = {
            key: 'config',
            type: '',
            value: {
                isFeatureEnabled: () => true,
                polar: {
                    details: {
                        sectionTopFeed: [
                            {
                                index: 0,
                                label: 'section_top_feed_1',
                                targets: { kw: 'section_top_feed_1' }
                            }
                        ],
                        sectionBottomFeed: [
                            {
                                index: 1,
                                label: 'section_bottom_feed_1',
                                targets: { kw: 'section_bottom_feed_1' }
                            }
                        ]
                    }
                }
            }
        };
        let navigationTagFeaturedComponent;
        let repeatableComponent;

        before(() => {
            reactModule = Context.mountComponent(Section, directoriesProps, [contextConfigStubEnabled]);
            navigationTagFeaturedComponent = TestUtils.findRenderedComponentWithType(reactModule, NavigationTagFeaturedStub);
            repeatableComponent = TestUtils.findRenderedComponentWithType(reactModule, RepeatableStub);
        });

        it('should render a featured component with the correct nativeAdConfig prop', () => {
            expect(navigationTagFeaturedComponent.props.polarTargets.length).to.eq(0);
        });

        it('should render a repeatable component with the correct nativeAdConfig prop', () => {
            expect(repeatableComponent.props.polarTargets.length).to.eq(0);
        });
    });
});
