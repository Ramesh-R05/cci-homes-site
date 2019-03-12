import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';
import proxyquire, { noCallThru } from 'proxyquire';
import { shallow } from 'enzyme';

const Context = betterMockComponentContext();
const { React } = Context;

noCallThru();

const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();

const Header = proxyquire('../../../app/components/brand/header', {
    react: React,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const TestWrapper = new ShallowWrapperFactory(Header);

describe('Brand Header', () => {
    describe('with all props', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                title: 'Belle',
                logo: 'http://image.com'
            });
        });

        it(`should render the component`, () => {
            expect(wrapper.find('.section__heading').exists()).to.be.true;
        });

        it(`should render 1 brand logo`, () => {
            expect(wrapper.find('.brand-section__header-logo').exists()).to.be.true;
        });

        it(`should render the logo image`, () => {
            expect(wrapper.find('.brand-section__logo-image').exists()).to.be.true;
        });

        it(`should pass the correct props to the logo image`, () => {
            expect(wrapper.find('.brand-section__logo-image').props()).to.deep.eq({
                src: testProps.logo,
                alt: testProps.title,
                className: 'brand-section__logo-image'
            });
        });

        it(`should render one sticky Ad`, () => {
            expect(wrapper.find(StickyAdStub)).to.have.length(1);
        });
    });

    describe('without the logo prop', () => {
        let wrapper;

        before(() => {
            filterErrors();
            [wrapper] = TestWrapper();
        });

        after(() => {
            restoreErrors();
        });

        it('should not be rendered', () => {
            expect(wrapper.find('.section__heading').exists()).to.be.false;
        });
    });
});
