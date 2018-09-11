import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();

const Context = betterMockComponentContext();
const { React } = Context;

const MobileOffCanvasStub = Context.createStubComponent();
const HamburgerNavStub = Context.createStubComponent();
const OffCanvasLogosStub = Context.createStubComponent();

const OffCanvas = proxyquire('../../../app/components/off-canvas/offCanvas', {
    react: React,
    '@bxm/nav/lib/components/offcanvas/content': MobileOffCanvasStub,
    '@bxm/site-header/lib/components/hamburgerNav': HamburgerNavStub,
    './offCanvasLogos': OffCanvasLogosStub
});

const contextStub = {
    config: { hamburgerBrands: Array.from(Array(3), (x, i) => `hamburger item ${i + 1}`) }
};

const testWrapper = (testProps = {}) => shallow(<OffCanvas {...testProps} />, { context: contextStub });

describe('OffCanvas component', () => {
    describe('rendering', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = testWrapper();
        });
        it('renders with no props passed', () => {
            const rootElement = wrapper.find(MobileOffCanvasStub);
            expect(rootElement).to.have.length(1);
        });
    });
    describe('props', () => {
        let wrapper;
        const toggleSideMenuStub = sinon.stub();
        let props = {};

        describe('passing props to MobileOffCanvas', () => {
            beforeEach(() => {
                props.toggleSideMenu = toggleSideMenuStub;
                props.className = 'foo-class';
                wrapper = testWrapper(props);
            });

            afterEach(() => {
                props = {};
            });

            it('passes the toggleSideMenu prop', () => {
                expect(wrapper.find(MobileOffCanvasStub).prop('toggleSideMenu')).to.eq(props.toggleSideMenu);
            });

            it('passes the className prop', () => {
                expect(wrapper.find(MobileOffCanvasStub).prop('className')).to.eq(props.className);
            });
        });

        describe('passing props to HamburgerNav', () => {
            beforeEach(() => {
                props.navItems = Array.from(Array(3), (x, i) => `nav item ${i + 1}`);
                props.currentUrl = '/section';
                wrapper = testWrapper(props);
            });

            afterEach(() => {
                props = {};
            });

            it('passes the items prop', () => {
                expect(wrapper.find(HamburgerNavStub).prop('items')).to.eq(props.navItems);
            });

            it('passes the currentUrl prop', () => {
                expect(wrapper.find(HamburgerNavStub).prop('currentUrl')).to.eq(props.currentUrl);
            });
        });
    });
    describe('context', () => {
        let wrapper;

        before(() => {
            wrapper = testWrapper();
        });

        it('passes hamburgerBrands from context as props to OffCanvasLogos', () => {
            expect(wrapper.find(OffCanvasLogosStub).prop('logoList')).to.eq(contextStub.config.hamburgerBrands);
        });
    });
    describe('callBacks', () => {
        describe('toggleSideMenu', () => {
            let wrapper;
            const props = {};
            const toggleSideMenuStub = sinon.stub();

            before(() => {
                props.toggleSideMenu = toggleSideMenuStub;
                wrapper = testWrapper(props);
            });

            it('calls the toggleSideMenu prop as a function when button is clicked', () => {
                wrapper.find('button').simulate('click');
                expect(toggleSideMenuStub).to.have.been.called;
            });
        });
    });
});
