import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const SectionHeaderStub = Context.createStubComponent();
const CampaignSectionStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();

const { CampaignPage } = proxyquire('../../../app/components/pages/campaign', {
    '@bxm/site-header': SiteHeaderStub,
    '../section/header': SectionHeaderStub,
    '../section/sponsorTag/section': CampaignSectionStub,
    '../site-footer': SiteFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub
});

const TestWrapper = new ShallowWrapperFactory(CampaignPage);

describe('CampaignPage component', () => {
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
                currentUrl: '/',
                articles: ['article 1', 'article 2', 'article 3'],
                list: { items: ['foo'] },
                listNextParams: { prev: 1234 }
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
                classModifier: 'campaign-section-page',
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content,
                    articles: testProps.articles,
                    list: testProps.list,
                    listNextParams: testProps.listNextParams
                },
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: true,
                HeaderComponent: SiteHeaderStub,
                ContentHeaderComponent: SectionHeaderStub,
                ContentComponent: CampaignSectionStub,
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
