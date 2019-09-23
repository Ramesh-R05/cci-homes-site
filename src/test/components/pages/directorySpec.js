import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';
import listingCategoriesMock from '../../mock/listingCategories';

noCallThru();

const Context = betterMockComponentContext();

const DirectoryHeaderStub = Context.createStubComponent();

const ListingFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();

const { DirectoryPage } = proxyquire('../../../app/components/pages/directory', {
    '../listings/components/DirectoryHeader': DirectoryHeaderStub,
    '../listings/components/listingFooter': ListingFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub
});

const TestWrapper = new ShallowWrapperFactory(DirectoryPage);

describe('DirectoryPage component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                content: { value: 1 },
                theme: {},
                classModifier: 'directory-home-page',
                ContentComponent: Context.createStubComponent(),
                contentErrorStatus: {},
                currentNavigateError: {},
                headerNavItems: ['item 1', 'item 2', 'item 3'],
                hamburgerNavItems: ['hamburger item 1', 'hamburger item 2', 'hamburger item 3'],
                listingCategories: listingCategoriesMock,
                currentUrl: '/'
            });
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('renders the Renderer component', () => {
            expect(wrapper.find(TemplateRendererStub).exists()).to.be.true;
        });

        it('passes the correct templateProps as to the Renderer component', () => {
            expect(wrapper.find(TemplateRendererStub).prop('templateProps')).to.deep.eq({
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content
                },
                ContentComponent: testProps.ContentComponent,
                classModifier: testProps.classModifier,
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: false,
                HeaderComponent: DirectoryHeaderStub,
                FooterComponent: ListingFooterStub,
                headerProps: {
                    permanentlyFixedIfShorterThan: 49,
                    theme: testProps.theme,
                    isExpanded: false,
                    wrapperClassName: 'header',
                    headerClassName: 'header__inner',
                    content: testProps.content
                },
                footerProps: {
                    categories: testProps.listingCategories
                }
            });
        });

        it('passes the PageTemplate component as the template prop to the Renderer', () => {
            expect(wrapper.find(TemplateRendererStub).prop('Template')).to.eq(PageTemplateStub);
        });
    });
});
