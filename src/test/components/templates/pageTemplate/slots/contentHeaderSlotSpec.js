import ShallowTestWrapperFactory from '../../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../../utils/propTypeWarningFilter';
import { betterMockComponentContext } from '@bxm/flux';
import ContentHeaderSlot from '../../../../../app/components/templates/pageTemplate/slots/contentHeaderSlot';

const Context = betterMockComponentContext();
const TestWrapper = new ShallowTestWrapperFactory(ContentHeaderSlot);

describe('ContentHeaderSlot component', () => {
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
                    contentHeaderProps: {
                        someProp: true
                    },
                    contentProps: {
                        content: {
                            tagsDetails: [{ displayName: 'testDisplayName' }]
                        }
                    }
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('sets the title prop on the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).prop('title')).to.eq(testProps.contentProps.content.tagsDetails[0].displayName);
            });

            it('sets the sponsorName prop on the component passed as the Component prop to the default value', () => {
                expect(wrapper.find(testProps.Component).prop('sponsorName')).to.eq('homes_sponsor');
            });

            it('spreads the contentHeadeProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.include({ ...testProps.contentHeaderProps });
            });
        });

        describe('with a sponsor in the content', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    Component: Context.createStubComponent(),
                    contentHeaderProps: {
                        someProp: true
                    },
                    contentProps: {
                        content: { sponsor: 'some sponsor name', tagsDetails: [{ displayName: 'testDisplayName' }] },
                        contentTitle: 'test'
                    }
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('sets the title prop on the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).prop('title')).to.eq(testProps.contentProps.content.tagsDetails[0].displayName);
            });

            it('sets the sponsorName prop on the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).prop('sponsorName')).to.eq(testProps.contentProps.content.sponsor);
            });

            it('spreads the contentHeadeProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.include({ ...testProps.contentHeaderProps });
            });
        });

        describe('with useContentTitle prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    Component: Context.createStubComponent(),
                    contentHeaderProps: {
                        someProp: true
                    },
                    contentProps: {
                        content: { contentTitle: 'page title', sponsor: 'some sponsor name' }
                    },
                    useContentTitle: true
                });
            });

            it('renders the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).isEmptyRender()).to.be.false;
            });

            it('sets the title prop on the component passed as the Component prop equal to the contentTitle in the contentProps', () => {
                expect(wrapper.find(testProps.Component).prop('title')).to.eq(testProps.contentProps.content.contentTitle);
            });

            it('sets the sponsorName prop on the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).prop('sponsorName')).to.eq(testProps.contentProps.content.sponsor);
            });

            it('spreads the contentHeadeProps prop onto the component passed as the Component prop', () => {
                expect(wrapper.find(testProps.Component).props()).to.include({ ...testProps.contentProps.contentHeaderProps });
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
