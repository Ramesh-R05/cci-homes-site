import ShallowTestWrapperFactory from '../../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../../utils/propTypeWarningFilter';
import { betterMockComponentContext } from '@bxm/flux';
import FooterSlot from '../../../../../app/components/templates/pageTemplate/slots/footerSlot';

const Context = betterMockComponentContext();
const TestWrapper = new ShallowTestWrapperFactory(FooterSlot);

describe('FooterSlot component', () => {
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
                    footerProps: {
                        someProp: true
                    }
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('spreads the footerProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.deep.eq(testProps.footerProps);
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
