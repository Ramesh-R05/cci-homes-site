import ShallowTestWrapperFactory from '../../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../../utils/propTypeWarningFilter';
import { betterMockComponentContext } from '@bxm/flux';
import HeaderSlot from '../../../../../app/components/templates/pageTemplate/slots/headerSlot';

const Context = betterMockComponentContext();
const TestWrapper = new ShallowTestWrapperFactory(HeaderSlot);

describe('HeaderSlot component', () => {
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
                    currentUrl: '/',
                    navItems: [1, 2, 3],
                    toggleMenuFunc: sinon.stub(),
                    siteName: 'homes to love',
                    headerProps: {
                        someProp: true
                    }
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('sets the currentUrl prop on the passedComponent', () => {
                expect(wrapper.find(testProps.Component).prop('currentUrl')).to.eq(testProps.currentUrl);
            });

            it('sets the navItems prop on the passedComponent', () => {
                expect(wrapper.find(testProps.Component).prop('navitems')).to.eq(testProps.navitems);
            });

            it('sets the toggleMenu prop on the passedComponent', () => {
                expect(wrapper.find(testProps.Component).prop('toggleMenu')).to.eq(testProps.toggleMenuFunc);
            });

            it('sets the siteName prop on the passedComponent', () => {
                expect(wrapper.find(testProps.Component).prop('siteName')).to.eq(testProps.siteName);
            });

            it('spreads the headerProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.include(testProps.headerProps);
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
