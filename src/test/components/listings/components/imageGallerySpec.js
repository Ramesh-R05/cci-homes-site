import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

noCallThru();
const Context = betterMockComponentContext();

const ImageGalleryStub = Context.createStubComponent();
const ResponsiveImageStub = Context.createStubComponent();

const { ImageGalleryWrapper } = proxyquire('../../../../app/components/listings/components/imageGalleryWrapper', {
    'react-image-gallery': ImageGalleryStub,
    '@bxm/ui/lib/common/ResponsiveImage': ResponsiveImageStub
});

const selectors = {
    root: 'listing-image-gallery',
    portrait: 'listing-image-gallery--portrait',
    landscape: 'listing-image-gallery--landscape',
    compact: 'listing-image-gallery--compact',
    singleItem: 'listing-image-gallery--single-item'
};

const TestWrapper = new ShallowWrapperFactory(ImageGalleryWrapper);

describe('ImageGalleryWrapper component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.find(ImageGalleryStub).exists()).to.be.false;
            });
        });

        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    items: [{ original: 'http://image.com' }, { original: 'http://image2.com' }]
                });
            });

            it('renders the ImageGallery component', () => {
                expect(wrapper.find(ImageGalleryStub).exists()).to.be.true;
            });

            it('passes the correct props to the ImageGallery component', () => {
                const { root } = selectors;

                expect(wrapper.find(ImageGalleryStub).props()).to.deep.eq({
                    additionalClass: root,
                    onSlide: ImageGalleryWrapper.defaultProps.slideChangeCallback,
                    showThumbnails: false,
                    showFullscreenButton: false,
                    showPlayButton: false,
                    showNav: true,
                    items: testProps.items,
                    renderItem: wrapper.instance().customRenderer
                });
            });
        });

        [{ size: 'portrait', modifier: 'portrait' }, { size: 'landscape', modifier: 'landscape' }, { size: 'compact', modifier: 'compact' }].forEach(
            ({ size, modifier }) => {
                describe(`with ${size} prop and multiple items`, () => {
                    let wrapper;

                    before(() => {
                        [wrapper] = TestWrapper({
                            items: [{ original: 'http://image.com' }, { original: 'http://image2.com' }],
                            size
                        });
                    });

                    it('renders the component', () => {
                        expect(wrapper.find(ImageGalleryStub).exists()).to.be.true;
                    });

                    it(`adds the ${modifier} class modifier to the additonalClass prop on the ImageGallery component`, () => {
                        const { root } = selectors;

                        expect(wrapper.find(ImageGalleryStub).prop('additionalClass')).to.eq(`${root} ${selectors[modifier]}`);
                    });
                });
            }
        );

        describe(`with with a single item`, () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    items: [{ original: 'http://image.com' }]
                });
            });

            it('renders the component', () => {
                expect(wrapper.find(ImageGalleryStub).exists()).to.be.true;
            });

            it(`sets the showNav prop on the ImageGallery to false`, () => {
                const { root } = selectors;

                expect(wrapper.find(ImageGalleryStub).props()).to.deep.eq({
                    additionalClass: root,
                    onSlide: ImageGalleryWrapper.defaultProps.slideChangeCallback,
                    showThumbnails: false,
                    showFullscreenButton: false,
                    showPlayButton: false,
                    showNav: false,
                    items: testProps.items,
                    renderItem: wrapper.instance().customRenderer
                });
            });
        });

        describe('with slideChangeCallback prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    items: [{ original: 'http://image.com' }, { original: 'http://image2.com' }],
                    slideChangeCallback: sinon.stub()
                });
            });

            it('renders the component', () => {
                expect(wrapper.find(ImageGalleryStub).exists()).to.be.true;
            });

            it('passes the callback through to the image gallery onSlide prop', () => {
                expect(wrapper.find(ImageGalleryStub).prop('onSlide')).to.eq(testProps.slideChangeCallback);
            });
        });

        describe('with invalid props', () => {
            describe('items prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper();
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    expect(wrapper.find(ImageGalleryStub).exists()).to.be.false;
                });
            });
        });
    });
});
