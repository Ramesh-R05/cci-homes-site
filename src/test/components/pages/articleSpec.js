import proxyquire, { noCallThru } from 'proxyquire';

import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const HomeHeaderStub = Context.createStubComponent();
const ArticleContentSectionStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();
const getBrandStub = sinon.stub();

const { ArticlePage } = proxyquire('../../../app/components/pages/article', {
    '@bxm/site-header': SiteHeaderStub,
    '../home/header': HomeHeaderStub,
    '../article/page': ArticleContentSectionStub,
    '../site-footer': SiteFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub,
    '../brand/utilities/getBrand': getBrandStub
});

const TestWrapper = new ShallowWrapperFactory(ArticlePage);

describe('Article page component', () => {
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
                    currentUrl: '/'
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
                classModifier: 'article-content-page',
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content,
                    brandConfig: brandMock
                },
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: true,
                HeaderComponent: SiteHeaderStub,
                ContentHeaderComponent: HomeHeaderStub,
                ContentComponent: ArticleContentSectionStub,
                FooterComponent: SiteFooterStub,

                headerProps: {
                    permanentlyFixedIfShorterThan: 49,
                    theme: testProps.theme,
                    isExpanded: true,
                    SubHeaderComponent: null,
                    subHeaderComponentProps: {},
                    wrapperClassName: 'header',
                    headerClassName: 'header__inner'
                }
            });
        });

        it('passes the PageTemplate component as the template prop to the Renderer', () => {
            expect(wrapper.find(TemplateRendererStub).prop('Template')).to.eq(PageTemplateStub);
        });
    });
});
