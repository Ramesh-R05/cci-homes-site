import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();

const SiteHeaderStub = Context.createStubComponent();
const SiteFooterStub = Context.createStubComponent();
const PageTemplateStub = Context.createStubComponent();
const TemplateRendererStub = Context.createStubComponent();

const { Error } = proxyquire('../../../app/components/pages/error', {
    '../site-footer': SiteFooterStub,
    '@bxm/site-header': SiteHeaderStub,
    '../templates/pageTemplate/PageTemplate': PageTemplateStub,
    '../templates/templateRenderer': TemplateRendererStub
});

const TestWrapper = new ShallowWrapperFactory(Error);

describe('ErrorPage component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                contentErrorStatus: { status: 404 },
                currentNavigateError: { status: 404 },
                currentUrl: '/404'
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
                classModifier: 'error-page',
                currentUrl: testProps.currentUrl,
                contentErrorStatus: testProps.contentErrorStatus,
                currentNavigateError: testProps.currentNavigateError,
                HeaderComponent: SiteHeaderStub,
                FooterComponent: SiteFooterStub
            });
        });

        it('passes the PageTemplate component as the template prop to the Renderer', () => {
            expect(wrapper.find(TemplateRendererStub).prop('Template')).to.eq(PageTemplateStub);
        });
    });
});
