import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { shallow } from 'enzyme';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const SVGSTub = Context.createStubComponentWithChildren();
const TeaserStub = Context.createStubComponent();
const BrandSwitcherStub = Context.createStubComponent();

const FeaturedBrandsSection = proxyquire('../../../app/components/featuredBrandsSection/featuredBrandsSection', {
    react: React,
    'react-inlinesvg': SVGSTub,
    '../teaser/teaser': TeaserStub,
    '@bxm/shared-ui/lib/brandSwitcher': BrandSwitcherStub
}).default;

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        features: {
            lipstick: {
                enabled: true
            }
        }
    }
};

const contextMock = {
    config: {
        features: {
            lipstick: {
                enabled: true
            }
        }
    }
};

const testWrapper = (props = {}, context = {}) => {
    return shallow(<FeaturedBrandsSection {...props} />, { context });
};

const featuredBrandsProp = {
    items: [
        { id: 'brand1', url: '/brand1' },
        { id: 'brand2', url: '/brand2' },
        { id: 'brand3', url: '/brand3' }
    ]
};

const latestBrandItemsProp = {
    brand1: ['latest1', 'latest2', 'latest3'],
    brand2: ['latest4', 'latest5', 'latest6'],
    brand3: ['latest7', 'latest8', 'latest9']
};

const mockProps = {
    featuredBrands: featuredBrandsProp,
    latestBrandItems: latestBrandItemsProp
};

describe('Latest Brand Content', () => {
    let reactModule;
    let teasers;
    let BrandSwitcher;

    describe('with all props', () => {
        before(() => {
            reactModule = Context.mountComponent(
                FeaturedBrandsSection,
                { featuredBrands: featuredBrandsProp, latestBrandItems: latestBrandItemsProp },
                [contextConfigStub]
            );
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            BrandSwitcher = TestUtils.scryRenderedComponentsWithType(reactModule, BrandSwitcherStub);
        });

        it('should render the BrandSwitcher component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            expect(BrandSwitcher).to.exist;
        });

        it('should render 3 teaser components', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            expect(teasers.length).to.equal(3);
        });
    });

    describe('state', () => {
        describe('selectedBrand', () => {
            let wrapper;
            const displayLatestItemsSpy = sinon.spy(FeaturedBrandsSection.prototype, 'displayLatestItems');
            describe('default state', () => {
                before(() => {
                    wrapper = testWrapper(mockProps, contextMock);
                });

                it('sets the state to the first featuredBrand item passed id', () => {
                    const expectedProps = {
                        featuredBrands: {
                            items: [
                                { id: 'brand1', url: '/brand1' },
                                { id: 'brand2', url: '/brand2' },
                                { id: 'brand3', url: '/brand3' }
                            ]
                        },
                        latestBrandItems: {
                            brand1: ['latest1', 'latest2', 'latest3'],
                            brand2: ['latest4', 'latest5', 'latest6'],
                            brand3: ['latest7', 'latest8', 'latest9']
                        }
                    };
                    expect(wrapper.state('selectedBrand').id).to.eql(expectedProps.featuredBrands.items[0].id);
                });
            });

            describe('when a brand is selected', () => {
                before(() => {
                    wrapper = testWrapper(mockProps, contextMock);
                });

                it('calls displayLatestItems with the correct args', () => {
                    wrapper.instance().displayLatestItems({}, featuredBrandsProp.items[0]);
                    expect(displayLatestItemsSpy).to.be.called;
                });

                it('changes the shown content to the items from the selected brand', () => {
                    const expectedProps = {
                        featuredBrands: {
                            items: [
                                { id: 'brand1', url: '/brand1' },
                                { id: 'brand2', url: '/brand2' },
                                { id: 'brand3', url: '/brand3' }
                            ]
                        },
                        latestBrandItems: {
                            brand1: ['latest1', 'latest2', 'latest3'],
                            brand2: ['latest4', 'latest5', 'latest6'],
                            brand3: ['latest7', 'latest8', 'latest9']
                        }
                    };

                    wrapper.instance().displayLatestItems({}, featuredBrandsProp.items[1]);
                    expect(wrapper.instance().props.latestBrandItems[wrapper.state('selectedBrand').id]).to.eql(
                        expectedProps.latestBrandItems[featuredBrandsProp.items[1].id]
                    );
                });
            });
        });
    });
});
