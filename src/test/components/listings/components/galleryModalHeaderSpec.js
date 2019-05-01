import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

noCallThru();
const Context = betterMockComponentContext();

const SVGSTub = Context.createStubComponentWithChildren();

const GalleryModalHeader = proxyquire('../../../../app/components/listings/components/galleryModalHeader', {
    'react-inlinesvg': SVGSTub
});

const TestWrapper = new ShallowWrapperFactory(GalleryModalHeader);

const selectors = {
    root: '.listing-gallery-modal__header',
    button: '.listing-gallery-modal__close-button',
    logoLink: '.listing-gallery-modal__logo-link',
    logoIcon: '.listing-gallery-modal__logo.icon-logo'
};

describe('GalleryModalHeader component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    handleClose: sinon.stub()
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the button', () => {
                const { button } = selectors;

                expect(wrapper.find(button).exists()).to.be.true;
            });

            it('passes the handleClose prop to the onClick prop of the button', () => {
                const { button } = selectors;

                expect(wrapper.find(button).prop('onClick')).to.eq(testProps.handleClose);
            });

            it('renders the InlineSVG component within the button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .find(SVGSTub)
                        .exists()
                ).to.be.true;
            });

            it('passes the correct asset source to the InlineSVG component', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .find(SVGSTub)
                        .prop('src')
                ).to.eq('/assets/icons/arrow-left.svg');
            });

            it('renders the fallback image with the correct asset path within the InlineSVG component', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .find(SVGSTub)
                        .find('img')
                        .prop('src')
                ).to.eq('/assets/icons/arrow-left.svg');
            });

            it('renders the logo link', () => {
                const { logoLink } = selectors;

                expect(wrapper.find(logoLink).exists()).to.be.true;
            });

            it('renders the logo', () => {
                const { logoIcon } = selectors;

                expect(wrapper.find(logoIcon).exists()).to.be.true;
            });
        });
    });
});
