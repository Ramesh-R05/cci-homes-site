import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import { filterErrors, restoreErrors } from '../../../../utils/propTypeWarningFilter';
import ShallowTestWrapperFactory from '../../../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const AdsWrapperStub = Context.createStubComponentWithChildren();

const ContentSlot = proxyquire('../../../../../app/components/templates/pageTemplate/slots/contentSlot', {
    '@bxm/ad/lib/google/components/standardPageAdsWrapper': AdsWrapperStub
}).default;

const TestWrapper = new ShallowTestWrapperFactory(ContentSlot);

describe('ContentSlot component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.isEmptyRender()).to.be.true;
            });
        });

        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    Component: Context.createStubComponent(),
                    contentProps: {
                        someProp: true
                    }
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('spreads the contentProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.deep.eq(testProps.contentProps);
            });
        });

        describe('with withAdsWrapper prop set to true', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    Component: Context.createStubComponent(),
                    contentProps: {
                        someProp: true
                    },
                    withAdsWrapper: true
                });
            });

            it('renders the AdsWrapper component', () => {
                expect(wrapper.find(AdsWrapperStub).isEmptyRender()).to.be.false;
            });

            it('renders the renders the component passed as the Component prop wrapped with the AdsWrapper component', () => {
                expect(
                    wrapper
                        .find(AdsWrapperStub)
                        .find(testProps.Component)
                        .isEmptyRender()
                ).to.be.false;
            });

            it('spreads the contentProps prop onto the component passed as the Component prop', () => {
                expect(
                    wrapper
                        .find(AdsWrapperStub)
                        .find(testProps.Component)
                        .props()
                ).to.deep.eq(testProps.contentProps);
            });
        });

        describe('with invalid props', () => {
            describe('Component prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper();
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    expect(wrapper.isEmptyRender()).to.be.true;
                });
            });

            describe('Component prop not a function', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({
                        Component: true
                    });
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    expect(wrapper.isEmptyRender()).to.be.true;
                });
            });
        });
    });
});
