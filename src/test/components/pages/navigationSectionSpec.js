import proxyquire, { noCallThru } from 'proxyquire';

import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const SearchHeaderStub = Context.createStubComponent();
const NavigationTagSectionStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();

const { NavigationSection } = proxyquire('../../../app/components/pages/navigationSection', {
    '@bxm/site-header': SiteHeaderStub,
    '../section/header': SearchHeaderStub,
    '../section/navigationTag/section': NavigationTagSectionStub,
    '../site-footer': SiteFooterStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub
});

const TestWrapper = new ShallowWrapperFactory(NavigationSection);

describe('NavigationSectionPage component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;

        before(() => {
            const searchTotal = 10;
            const title = 'search term';

            [wrapper, testProps] = TestWrapper({
                content: { value: 1 },
                theme: {},
                contentErrorStatus: {},
                currentNavigateError: {},
                headerNavItems: ['item 1', 'item 2', 'item 3'],
                hamburgerNavItems: ['hamburger item 1', 'hamburger item 2', 'hamburger item 3'],
                currentUrl: '/',
                articles: [{ name: 'article 1' }, { name: 'article 2' }, { name: 'article 3' }],
                list: { items: ['foo'] },
                listNextParams: { prev: 1234 },
                hero: { title: 123 },
                searchTotal,
                title
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
                classModifier: 'navigation-section-page',
                hamburgerNavItems: testProps.hamburgerNavItems,
                headerNavItems: testProps.headerNavItems,
                currentUrl: testProps.currentUrl,
                contentProps: {
                    content: testProps.content,
                    articles: testProps.articles,
                    list: testProps.list,
                    listNextParams: testProps.listNextParams,
                    galleries: testProps.galleries,
                    hero: testProps.hero
                },
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                withAdsWrapper: true,
                HeaderComponent: SiteHeaderStub,
                ContentHeaderComponent: SearchHeaderStub,
                ContentComponent: NavigationTagSectionStub,
                FooterComponent: SiteFooterStub,
                useContentTitle: false,
                headerProps: {
                    permanentlyFixedIfShorterThan: 49,
                    theme: testProps.theme,
                    isExpanded: false,
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

    describe('when content has a nodetype of CommercialTagSection', () => {
        let wrapper;

        before(() => {
            const searchTotal = 10;
            const title = 'search term';

            [wrapper] = TestWrapper({
                content: { value: 1, nodeType: 'CommercialTagSection' },
                theme: {},
                contentErrorStatus: {},
                currentNavigateError: {},
                headerNavItems: ['item 1', 'item 2', 'item 3'],
                hamburgerNavItems: ['hamburger item 1', 'hamburger item 2', 'hamburger item 3'],
                currentUrl: '/',
                articles: [{ name: 'article 1' }, { name: 'article 2' }, { name: 'article 3' }],
                list: { items: ['foo'] },
                listNextParams: { prev: 1234 },
                hero: { title: 123 },
                searchTotal,
                title
            });
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('renders the Renderer component', () => {
            expect(wrapper.find(TemplateRendererStub).exists()).to.be.true;
        });

        it('sets the useContentTitle prop on templateProps to true', () => {
            expect(wrapper.find(TemplateRendererStub).prop('templateProps').useContentTitle).to.be.true;
        });
    });
});
