import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const HomeContentHeaderStub = Context.createStubComponent();
const HomeContent = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();

const { HomePage } = proxyquire('../../../app/components/pages/home', {
    '@bxm/site-header': SiteHeaderStub,
    '../home/header': HomeContentHeaderStub,
    '../home/homeContent': HomeContent,
    '../site-footer': SiteFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub
});

const TestWrapper = new ShallowWrapperFactory(HomePage);

describe('HomePage component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                content: { value: 1 },
                theme: {},
                contentErrorStatus: {},
                currentNavigateError: {},
                headerNavItems: ['item 1', 'item 2', 'item 3'],
                hamburgerNavItems: ['hamburger item 1', 'hamburger item 2', 'hamburger item 3'],
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
                classModifier: 'home-page',
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content
                },
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: true,
                HeaderComponent: SiteHeaderStub,
                ContentHeaderComponent: HomeContentHeaderStub,
                ContentComponent: HomeContent,
                FooterComponent: SiteFooterStub,
                headerProps: {
                    permanentlyFixedIfShorterThan: 49,
                    theme: testProps.theme,
                    isExpanded: true,
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
