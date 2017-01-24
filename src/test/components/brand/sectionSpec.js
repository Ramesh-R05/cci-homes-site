import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as articlesMock} from '../../mock/articles';
import exposeProps from '../../test-util/exposeProps';
import clone from 'lodash/lang/clone';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const FeaturedStub = Context.createStubComponent();
const GroupStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyStub = Context.createStubComponentWithChildren();

const Section = proxyquire('../../../app/components/brand/section', {
    'react': React,
    './featured': FeaturedStub,
    './articleGroup': GroupStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/behaviour/lib/components/sticky': StickyStub,
});

let brandArticlesStore = articlesMock;

Context.addStore('PageStore', {
    getContent() {
        let content = clone(entity);
        content.urlName = 'belle';
        content.title = 'Belle';
        return content;
    },
    getItems() {
        return brandArticlesStore;
    }
});

describe(`Brand Section`, () => {
    let reactModule;

    const sectionBrandsConfigStub = {
        belle: {
            subscribe: {
                "image": "/assets/images/brand-pages/subscribe/belle.jpg",
                "link": "https://www.magshop.com.au/store/homestolove"
            },
            logo: "/assets/svgs/belle.svg",
            social: {
                "facebook": "https://www.facebook.com/BelleMagazineAu",
                "twitter": "https://twitter.com/BelleMagazineAu",
                "instagram": "https://instagram.com/bellemagazineau/?hl=en"
            }
        }
    };

    const defaultPropsStub = {
        brandConfig: sectionBrandsConfigStub
    };

    afterEach(Context.cleanup);

    describe(`Without sideMenu prop and 12 articles`, () => {
        const sectionClassName = 'container';
        let section;
        let group;
        let featured;
        let ads;

        before(() => {
            brandArticlesStore = articlesMock.slice(0, 13);
            reactModule = Context.mountComponent(Section, defaultPropsStub);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            featured = TestUtils.findRenderedComponentWithType(reactModule, FeaturedStub);
            group = TestUtils.findRenderedComponentWithType(reactModule, GroupStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(ReactDOM.findDOMNode(section)).to.exist;
        });

        // Featured articles
        it(`should pass down the featured articles to the featured component`, () => {
            expect(featured.props.articles).to.deep.equal(articlesMock.slice(0, 7));
        });

        it(`should pass down the brand and section brandConfig`, () => {
            expect(featured.props.brand).to.equal('Belle');
            expect(featured.props.brandConfig).to.deep.equal(sectionBrandsConfigStub);
        });

        // Group Articles
        it(`should pass down the other articles to the group component`, () => {
            expect(group.props.articles).to.deep.equal(articlesMock.slice(7, 13));
        });

        // Ads
        describe(`Ads`, () => {
            const numberOfAds = 3;
            it(`should have ${numberOfAds} AdStubs`, () => {
                expect(ads.length).to.eq(numberOfAds);
            });

            it(`should have the relevant props for the 1st ad`, () => {
                const size = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                const targets = { position: 2 };
                expect(ads[0].props.sizes).to.deep.equal(size);
                expect(ads[0].props.targets).to.deep.equal(targets);
            });

            it(`should have the relevant props for the 2nd ad`, () => {
                const sizes = {
                    large: ['mrec', 'double-mrec']
                };
                const targets = { position: 2 };
                expect(ads[1].props.sizes).to.deep.equal(sizes);
                expect(ads[1].props.targets).to.deep.equal(targets);
            });

            it(`should have the relevant props for the 3rd ad`, () => {
                const sizes={
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                const targets = { position: 4 };
                expect(ads[2].props.sizes).to.deep.equal(sizes);
                expect(ads[2].props.targets).to.deep.equal(targets);
            });

        });

    });

    describe(`Without sideMenu prop and 13 articles`, () => {
        let groups;

        before(() => {
            brandArticlesStore = articlesMock.slice(0, 13);
            reactModule = Context.mountComponent(Section, {});
            groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
        });

        // Group Articles
        it(`should render 1 group components`, () => {
            expect(groups.length).to.equal(1);
        });

        it(`should pass down the other articles to the group component`, () => {
            expect(groups[0].props.articles).to.deep.equal(articlesMock.slice(7, 13));
        });
    });

    describe(`side menu behavior`, () => {
        let domNode;

        before(() => {
            reactModule = Context.mountComponent(exposeProps(Section), {});
            domNode = ReactDOM.findDOMNode(reactModule).getAttribute('class');
        });

        it(`should have class name "side-menu-slider"`, () => {

            expect(domNode).to.contain('side-menu-slider');
        });

        it(`should default to closed state`, () => {
            expect(domNode).to.not.contain('side-menu-slider--side-menu-open');
        });

        it(`should open when isSideMenuOpen is true`, () => {
            reactModule.setProps({ isSideMenuOpen: true });
            domNode = ReactDOM.findDOMNode(reactModule).getAttribute('class');
            expect(domNode).to.contain('side-menu-slider--side-menu-open');
        });
    });
});
