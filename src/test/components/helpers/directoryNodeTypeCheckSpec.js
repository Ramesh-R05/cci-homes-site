import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const DirectoryHomeStub = Context.createStubComponent();
const ListingCategoryStub = Context.createStubComponent();
const ListingRendererStub = Context.createStubComponent();

const DirectoryNodeTypeCheck = proxyquire('../../../app/components/helpers/directoryNodeTypeCheck', {
    '../listings/components/directoryHome': DirectoryHomeStub,
    '../listings/templates/listingCategory': ListingCategoryStub,
    '../listings/templates/listingRenderer': ListingRendererStub
}).default;

describe('DirectoryNodeTypeCheck higher order component', () => {
    describe('when passed a valid component', () => {
        describe('with valid content in the props', () => {
            [
                { nodeType: 'CardListing', classModifier: 'directory-listing-page', Stub: ListingRendererStub, componentName: 'ListingRenderer' },
                { nodeType: 'EnhancedListing', classModifier: 'directory-listing-page', Stub: ListingRendererStub, componentName: 'ListingRenderer' },
                { nodeType: 'PremiumListing', classModifier: 'directory-listing-page', Stub: ListingRendererStub, componentName: 'ListingRenderer' },
                { nodeType: 'DirectoryHome', classModifier: 'directory-home-page', Stub: DirectoryHomeStub, componentName: 'DirectoryHome' },
                {
                    nodeType: 'ListingsByCategory',
                    classModifier: 'directory-category-page',
                    Stub: ListingCategoryStub,
                    componentName: 'ListingCategory'
                }
            ].forEach(({ nodeType, classModifier, Stub, componentName }) => {
                describe(`and nodetype is ${nodeType}`, () => {
                    let wrapper;
                    let StubbedChild;
                    let testProps;

                    before(() => {
                        StubbedChild = Context.createStubComponent;

                        const TestWrapper = new ShallowWrapperFactory(DirectoryNodeTypeCheck(StubbedChild));

                        [wrapper, testProps] = TestWrapper({
                            content: {
                                nodeType
                            },
                            otherProps: {
                                val: true
                            }
                        });
                    });

                    it('it renders the component', () => {
                        expect(wrapper.isEmptyRender()).to.be.false;
                    });

                    it(`spreads the props onto the passed component`, () => {
                        expect(wrapper.find(StubbedChild).props()).to.deep.eq({
                            ...testProps,
                            ContentComponent: Stub,
                            classModifier
                        });
                    });

                    it(`it passes the ${componentName} component as the Content component prop`, () => {
                        expect(wrapper.find(StubbedChild).prop('ContentComponent')).to.deep.eq(Stub);
                    });

                    it(`it sets the classModifier prop on the component to '${classModifier}'`, () => {
                        expect(wrapper.find(StubbedChild).prop('classModifier')).to.deep.eq(classModifier);
                    });
                });
            });
        });

        describe('with invalid content in the props', () => {
            let wrapper;
            let StubbedChild;
            let testProps;

            before(() => {
                StubbedChild = Context.createStubComponent;

                const TestWrapper = new ShallowWrapperFactory(DirectoryNodeTypeCheck(StubbedChild));

                [wrapper, testProps] = TestWrapper({
                    content: {},
                    otherProps: {
                        val: true
                    }
                });
            });

            it('spreads the props onto the passed component', () => {
                expect(wrapper.find(StubbedChild).props()).to.deep.eq({ ...testProps, classModifier: undefined, ContentComponent: undefined });
            });

            it('does not set the ContentComponent prop', () => {
                expect(wrapper.find(StubbedChild).prop('ContentComponent')).to.be.undefined;
            });

            it('does not set the classModifier prop', () => {
                expect(wrapper.find(StubbedChild).prop('classModifier')).to.be.undefined;
            });
        });
    });
});
