import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const BrandHeaderStub = Context.createStubComponent();
const BrandSectionStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();
const getBrandStub = sinon.stub();

const { BrandPage } = proxyquire('../../../app/components/pages/brand', {
    '@bxm/site-header': SiteHeaderStub,
    '../brand/header': BrandHeaderStub,
    '../brand/section': BrandSectionStub,
    '../site-footer': SiteFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub,
    '../brand/utilities/getBrand': getBrandStub
});

const TestWrapper = new ShallowWrapperFactory(BrandPage);

describe('Brand page component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;
        let brandMock;

        before(() => {
            brandMock = {
                logo: 'foo124'
            };

            const config = {
                brands: []
            };

            const source = 'australian house and garden';

            getBrandStub.withArgs(config, source).returns(brandMock);

            [wrapper, testProps] = TestWrapper(
                {
                    content: { value: 1, source },
                    theme: {},
                    contentErrorStatus: {},
                    currentNavigateError: {},
                    headerNavItems: ['item 1', 'item 2', 'item 3'],
                    hamburgerNavItems: ['hamburger item 1', 'hamburger item 2', 'hamburger item 3'],
                    currentUrl: '/',
                    articles: ['article 1', 'article 2', 'article 3'],
                    list: { items: ['foo'] },
                    hero: { title: 'article name' },
                    listNextParams: { prev: 1234 }
                },
                {
                    config
                }
            );
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('renders the Renderer component', () => {
            expect(wrapper.find(TemplateRendererStub).exists()).to.be.true;
        });

        it('passes the correct templateProps as to the Renderer component', () => {
            expect(wrapper.find(TemplateRendererStub).prop('templateProps')).to.deep.eq({
                classModifier: 'brand-page',
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content,
                    articles: testProps.articles,
                    list: testProps.list,
                    listNextParams: testProps.listNextParams,
                    hero: testProps.hero
                },
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: true,
                HeaderComponent: SiteHeaderStub,
                ContentHeaderComponent: BrandHeaderStub,
                ContentComponent: BrandSectionStub,
                FooterComponent: SiteFooterStub,

                headerProps: {
                    permanentlyFixedIfShorterThan: 49,
                    theme: testProps.theme,
                    isExpanded: true,
                    wrapperClassName: 'header',
                    headerClassName: 'header__inner'
                },
                contentHeaderProps: { logo: brandMock.logo }
            });
        });

        it('passes the PageTemplate component as the template prop to the Renderer', () => {
            expect(wrapper.find(TemplateRendererStub).prop('Template')).to.eq(PageTemplateStub);
        });
    });
});
