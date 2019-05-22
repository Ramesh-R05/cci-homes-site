import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const StandardPageAdsWrapperStub = Context.createStubComponentWithChildren();
const OffCanvasStub = Context.createStubComponent();
const ContentHeaderSlotStub = Context.createStubComponent();
const ContentSlotStub = Context.createStubComponent();
const HeaderSlotStub = Context.createStubComponent();
const FooterSlotStub = Context.createStubComponent();
const errorRendererStub = sinon.stub();

const PageTemplate = proxyquire('../../../app/components/templates/pageTemplate/PageTemplate', {
    '@bxm/ad/lib/google/components/standardPageAdsWrapper': StandardPageAdsWrapperStub,
    '../../off-canvas/offCanvas': OffCanvasStub,
    './slots/contentHeaderSlot': ContentHeaderSlotStub,
    './slots/contentSlot': ContentSlotStub,
    './slots/headerSlot': HeaderSlotStub,
    './slots/footerSlot': FooterSlotStub,
    './slots/errorRenderer': errorRendererStub
});

const TestWrapper = new ShallowWrapperFactory(PageTemplate);

const selectors = {
    root: 'page-template',
    offCanvasWrapper: '.page-template__off-canvas-wrapper',
    headerSlotDiv: '.page-template__header',
    contentHeaderSlotDiv: '.page-template__content-header',
    contentSlotDiv: '.page-template__content',
    footerSlotDiv: '.page-template__footer'
};

describe('PageTemplate component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;
        let testContext;

        before(() => {
            errorRendererStub.returns(false);

            [wrapper, testProps, testContext] = TestWrapper(
                {
                    HeaderComponent: Context.createStubComponent(),
                    ContentComponent: Context.createStubComponent(),
                    contentProps: {
                        tagsDetails: [{ displayName: 'test-tag' }]
                    },
                    FooterComponent: Context.createStubComponent(),
                    menuClasses: 'off-canvas-open',
                    currentUrl: '/page',
                    toggleMenu: sinon.stub()
                },
                {
                    config: { site: { name: 'homesToLove' } }
                }
            );
        });

        after(() => {
            errorRendererStub.reset;
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('applies the menu classes to the off canvas wrapper div', () => {
            const { offCanvasWrapper } = selectors;

            expect(wrapper.find(offCanvasWrapper).prop('className')).to.include(testProps.menuClasses);
        });

        it('renders the OffCanvas component with the correct props', () => {
            expect(wrapper.find(OffCanvasStub).props()).to.deep.eq({
                navItems: PageTemplate.defaultProps.hamburgerNavItems,
                currentUrl: testProps.currentUrl,
                toggleSideMenu: testProps.toggleMenu
            });
        });

        it('renders the HeaderSlot in the correct div', () => {
            const { headerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(headerSlotDiv)
                    .find(HeaderSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the HeaderSlot with the correct props', () => {
            expect(wrapper.find(HeaderSlotStub).props()).to.deep.eq({
                Component: testProps.HeaderComponent,
                currentUrl: testProps.currentUrl,
                navItems: PageTemplate.defaultProps.headerNavItems,
                toggleMenuFunc: testProps.toggleMenu,
                siteName: testContext.config.site.name,
                headerProps: PageTemplate.defaultProps.headerProps
            });
        });

        it('renders the ContentSlot within the correct div', () => {
            const { contentSlotDiv } = selectors;

            expect(
                wrapper
                    .find(contentSlotDiv)
                    .find(ContentSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the ContentSlot with the correct props', () => {
            expect(wrapper.find(ContentSlotStub).props()).to.deep.eq({
                Component: testProps.ContentComponent,
                contentProps: testProps.contentProps,
                withAdsWrapper: false
            });
        });

        it('renders the footer within the correct div', () => {
            const { footerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(footerSlotDiv)
                    .find(FooterSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the FooterSlot with the correct props', () => {
            expect(wrapper.find(FooterSlotStub).props()).to.deep.eq({
                Component: testProps.FooterComponent,
                footerProps: PageTemplate.defaultProps.footerProps
            });
        });
    });

    describe('with contentHeaderComponent prop', () => {
        let wrapper;
        let testProps;
        let testContext;

        before(() => {
            errorRendererStub.returns(false);

            [wrapper, testProps, testContext] = TestWrapper(
                {
                    HeaderComponent: Context.createStubComponent(),
                    ContentComponent: Context.createStubComponent(),
                    contentProps: {
                        tagsDetails: [{ displayName: 'test-tag' }]
                    },
                    FooterComponent: Context.createStubComponent(),
                    menuClasses: 'off-canvas-open',
                    currentUrl: '/page',
                    toggleMenu: sinon.stub(),
                    ContentHeaderComponent: Context.createStubComponent(),
                    useContentTitle: true,
                    contentHeaderProps: { foo: 'bar' }
                },
                {
                    config: { site: { name: 'homesToLove' } }
                }
            );
        });

        after(() => {
            errorRendererStub.reset;
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('applies the menu classes to the off canvas wrapper div', () => {
            const { offCanvasWrapper } = selectors;

            expect(wrapper.find(offCanvasWrapper).prop('className')).to.include(testProps.menuClasses);
        });

        it('renders the OffCanvas component with the correct props', () => {
            expect(wrapper.find(OffCanvasStub).props()).to.deep.eq({
                navItems: PageTemplate.defaultProps.hamburgerNavItems,
                currentUrl: testProps.currentUrl,
                toggleSideMenu: testProps.toggleMenu
            });
        });

        it('renders the HeaderSlot in the correct div', () => {
            const { headerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(headerSlotDiv)
                    .find(HeaderSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the HeaderSlot with the correct props', () => {
            expect(wrapper.find(HeaderSlotStub).props()).to.deep.eq({
                Component: testProps.HeaderComponent,
                currentUrl: testProps.currentUrl,
                navItems: PageTemplate.defaultProps.headerNavItems,
                toggleMenuFunc: testProps.toggleMenu,
                siteName: testContext.config.site.name,
                headerProps: PageTemplate.defaultProps.headerProps
            });
        });

        it('renders the ContentHeaserSlot in the correct div', () => {
            const { contentHeaderSlotDiv } = selectors;

            expect(
                wrapper
                    .find(contentHeaderSlotDiv)
                    .find(ContentHeaderSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the ContentHeaderSlot with the correct props', () => {
            expect(wrapper.find(ContentHeaderSlotStub).props()).to.deep.eq({
                Component: testProps.ContentHeaderComponent,
                contentProps: testProps.contentProps,
                useContentTitle: testProps.useContentTitle,
                contentHeaderProps: testProps.contentHeaderProps
            });
        });

        it('renders the ContentSlot within the correct div', () => {
            const { contentSlotDiv } = selectors;

            expect(
                wrapper
                    .find(contentSlotDiv)
                    .find(ContentSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the ContentSlot with the correct props', () => {
            expect(wrapper.find(ContentSlotStub).props()).to.deep.eq({
                Component: testProps.ContentComponent,
                contentProps: testProps.contentProps,
                withAdsWrapper: false
            });
        });

        it('renders the footer within the correct div', () => {
            const { footerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(footerSlotDiv)
                    .find(FooterSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the FooterSlot with the correct props', () => {
            expect(wrapper.find(FooterSlotStub).props()).to.deep.eq({
                Component: testProps.FooterComponent,
                footerProps: PageTemplate.defaultProps.footerProps
            });
        });
    });

    describe('with errorRenderer returning a component', () => {
        let wrapper;
        let testProps;
        let testContext;
        let ErrorComponent;

        before(() => {
            ErrorComponent = Context.createStubComponent();
            errorRendererStub.returns(ErrorComponent);

            [wrapper, testProps, testContext] = TestWrapper(
                {
                    HeaderComponent: Context.createStubComponent(),
                    ContentComponent: Context.createStubComponent(),
                    contentProps: {
                        tagsDetails: [{ displayName: 'test-tag' }]
                    },
                    FooterComponent: Context.createStubComponent(),
                    menuClasses: 'off-canvas-open',
                    currentUrl: '/page',
                    toggleMenu: sinon.stub(),
                    ContentHeaderComponent: Context.createStubComponent(),
                    useContentTitle: true,
                    contentHeaderProps: { foo: 'bar' }
                },
                {
                    config: { site: { name: 'homesToLove' } }
                }
            );
        });

        after(() => {
            errorRendererStub.reset;
        });

        it('renders the component', () => {
            expect(wrapper.isEmptyRender()).to.be.false;
        });

        it('applies the menu classes to the off canvas wrapper div', () => {
            const { offCanvasWrapper } = selectors;

            expect(wrapper.find(offCanvasWrapper).prop('className')).to.include(testProps.menuClasses);
        });

        it('renders the OffCanvas component with the correct props', () => {
            expect(wrapper.find(OffCanvasStub).props()).to.deep.eq({
                navItems: PageTemplate.defaultProps.hamburgerNavItems,
                currentUrl: testProps.currentUrl,
                toggleSideMenu: testProps.toggleMenu
            });
        });

        it('renders the HeaderSlot in the correct div', () => {
            const { headerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(headerSlotDiv)
                    .find(HeaderSlotStub)
                    .exists()
            ).to.be.true;
        });

        it('renders the HeaderSlot with the correct props', () => {
            expect(wrapper.find(HeaderSlotStub).props()).to.deep.eq({
                Component: testProps.HeaderComponent,
                currentUrl: testProps.currentUrl,
                navItems: PageTemplate.defaultProps.headerNavItems,
                toggleMenuFunc: testProps.toggleMenu,
                siteName: testContext.config.site.name,
                headerProps: PageTemplate.defaultProps.headerProps
            });
        });

        it('does not render the ContentHeaderSlot', () => {
            expect(wrapper.find(ContentHeaderSlotStub).exists()).to.be.false;
        });

        it('does not render the ContentSlot', () => {
            expect(wrapper.find(ContentSlotStub).exists()).to.be.false;
        });

        it('renders the ErrorComponent instead of the ContentSlot within the contentSlotDiv', () => {
            const { contentSlotDiv } = selectors;

            expect(wrapper.find(contentSlotDiv).find(ErrorComponent));
        });

        it('renders the footer within the correct div', () => {
            const { footerSlotDiv } = selectors;

            expect(
                wrapper
                    .find(footerSlotDiv)
                    .find(FooterSlotStub)
                    .isEmptyRender()
            ).to.be.false;
        });

        it('renders the FooterSlot with the correct props', () => {
            expect(wrapper.find(FooterSlotStub).props()).to.deep.eq({
                Component: testProps.FooterComponent,
                footerProps: PageTemplate.defaultProps.footerProps
            });
        });
    });
});
