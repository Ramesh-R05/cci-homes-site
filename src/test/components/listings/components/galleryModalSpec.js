import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import breakpointsMock from '../../../mock/breakpoints';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import galleriesMock from '../../../mock/linkedGalleries';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

noCallThru();
const Context = betterMockComponentContext();

const ResponsiveImageStub = Context.createStubComponent();
const imageResizeMock = {
    scale: {
        BOTH: 'BOTH'
    },
    anchor: {
        MC: 'MC'
    },
    mode: {
        CROP: 'CROP'
    }
};

const GalleryModal = proxyquire('../../../../app/components/listings/components/galleryModal', {
    '@bxm/ui/lib/common/ResponsiveImage': ResponsiveImageStub,
    '@bxm/ui/lib/common/ImageResize': imageResizeMock,
    '../../../breakpoints': breakpointsMock
});

const TestWrapper = new ShallowWrapperFactory(GalleryModal);

describe('GalleryModalContent component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            let container;
            let mainRow;
            let mainColumn;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    title: galleriesMock[0].name,
                    images: galleriesMock[0].galleryItems
                });

                wrapper
                    .tap(el => (container = el))
                    .childAt(0)
                    .tap(el => (mainRow = el))
                    .childAt(0)
                    .tap(el => (mainColumn = el))
                    .childAt(0);
            });

            it('renders the component', () => {
                expect(container.exists()).to.be.true;
            });

            it('sets the correct class on the root with proper grid class', () => {
                expect(container.prop('className')).to.eq('listing-gallery-modal__inner container');
            });

            it('renders the main row within the container with the correct class and grid classes', () => {
                expect(mainRow.prop('className')).to.eq('listing-gallery-modal__main-row row');
            });

            it('renders the main column within the main row with the correct grid classes', () => {
                expect(mainColumn.prop('className')).to.eq('columns large-8 small-centered');
            });

            it('renders the title within the main column with correct value', () => {
                expect(mainColumn.find('.listing-gallery-modal__title').text()).to.eq(testProps.title);
            });

            it('renders a ResponsiveImage with the correct props within a figure for each image in the images prop', () => {
                wrapper.find('.listing-gallery-modal__image-wrapper').forEach((figure, imageNo) => {
                    expect(figure.find(ResponsiveImageStub).props()).to.deep.eq({
                        sizes: {
                            xl: { w: 919 },
                            l: { w: 919 },
                            m: { w: 540 },
                            s: { w: 535 }
                        },
                        alt: testProps.images[imageNo].caption,
                        url: testProps.images[imageNo].url,
                        ClassName: 'listing-gallery-modal__image',
                        scale: imageResizeMock.scale.BOTH,
                        anchor: imageResizeMock.anchor.MC,
                        mode: imageResizeMock.mode.CROP,
                        breakpoints: breakpointsMock,
                        imageQuality: 75
                    });
                });
            });
        });

        describe('with images prop not passed', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.childAt(0).exists()).to.be.false;
            });
        });
    });
});
