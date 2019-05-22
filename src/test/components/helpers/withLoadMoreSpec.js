import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const DirectoryHomeStub = Context.createStubComponent();
const ListingCategoryStub = Context.createStubComponent();
const ListingRendererStub = Context.createStubComponent();

const WithLoadMore = proxyquire('../../../app/components/helpers/withLoadMore', {
    '../listings/components/directoryHome': DirectoryHomeStub,
    '../listings/templates/listingCategory': ListingCategoryStub,
    '../listings/templates/listingRenderer': ListingRendererStub
});

describe('WithLoadMore higher order component', () => {
    describe('when passed a valid component', () => {
        describe('and it is initial render', () => {
            let wrapper;
            let StubbedChild;
            let testProps;

            before(() => {
                StubbedChild = Context.createStubComponent;

                const TestWrapper = new ShallowWrapperFactory(WithLoadMore(StubbedChild));

                [wrapper, testProps] = TestWrapper({
                    content: {},
                    otherProps: {
                        val: true
                    }
                });
            });

            it('renders the passed component', () => {
                expect(wrapper.find(StubbedChild).isEmptyRender()).to.be.false;
            });

            it('spreads the props onto the passed component', () => {
                expect(wrapper.find(StubbedChild).props()).to.deep.eq({ ...testProps });
            });
        });

        describe('and the listNextParams props change to the same value', () => {
            let wrapper;
            let StubbedChild;
            let shouldComponentUpdateSpy;
            let ignoredProp;

            before(() => {
                StubbedChild = Context.createStubComponent;

                const TestWrapper = new ShallowWrapperFactory(WithLoadMore(StubbedChild));

                [wrapper] = TestWrapper({
                    listNextParams: {
                        pageNo: 1
                    },
                    content: {},
                    otherProps: {
                        val: true
                    }
                });

                shouldComponentUpdateSpy = sinon.spy(wrapper.instance(), 'shouldComponentUpdate');

                ignoredProp = 'some string value';

                wrapper.setProps({
                    listNextParams: {
                        pageNo: 1
                    },
                    ignoredProp
                });
            });

            it('should call shouldComponentUpdate only once', () => {
                expect(shouldComponentUpdateSpy).to.have.property('callCount', 1);
            });

            it('shouldComponent update should return false', () => {
                expect(shouldComponentUpdateSpy.returned(false)).to.be.equal(true);
            });

            it('does not re-render the component with the new props', () => {
                expect(wrapper.find(StubbedChild).props()).not.to.include({ ignoredProp });
            });
        });

        describe('and listNextParams props change to a different value', () => {
            let wrapper;
            let StubbedChild;
            let shouldComponentUpdateSpy;
            let updatedProps;

            before(() => {
                StubbedChild = Context.createStubComponent;

                const TestWrapper = new ShallowWrapperFactory(WithLoadMore(StubbedChild));

                [wrapper] = TestWrapper({
                    listNextParams: {
                        pageNo: 1
                    },
                    content: {},
                    otherProps: {
                        val: true
                    }
                });

                shouldComponentUpdateSpy = sinon.spy(wrapper.instance(), 'shouldComponentUpdate');

                updatedProps = {
                    listNextParams: {
                        pageNo: 2
                    }
                };

                wrapper.setProps({ listNextParams: updatedProps.listNextParams });
            });

            it('should call shouldComponentUpdate only once', () => {
                expect(shouldComponentUpdateSpy).to.have.property('callCount', 1);
            });

            it('shouldComponent update should return true', () => {
                expect(shouldComponentUpdateSpy.returned(true)).to.be.equal(true);
            });

            it('re renders the component with the new props', () => {
                expect(wrapper.find(StubbedChild).props()).to.include({ listNextParams: updatedProps.listNextParams });
            });
        });
    });
});
