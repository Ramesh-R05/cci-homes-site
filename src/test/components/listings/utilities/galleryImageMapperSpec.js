import GalleryImageMapper from '../../../../app/components/listings/utilities/galleryImageMapper';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

import breakpointsMock from '../../../mock/breakpoints';
import listingMock from '../../../mock/listing';

const Context = betterMockComponentContext();

const MockedChild = Context.createStubComponent();

const TestWrapper = new ShallowWrapperFactory(GalleryImageMapper(MockedChild));

describe('GalleryImageMapper utility', () => {
    describe('when passed a component', () => {
        describe('with a valid items prop', () => {
            describe('and size prop is portrait', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({ items: listingMock.profileGallery, size: 'portrait' });
                });

                it('should apply the modified items prop to the returned component', () => {
                    const { imageSizes, imageQuality, imageConfig } = GalleryImageMapper();

                    wrapper
                        .find(MockedChild)
                        .prop('items')
                        .forEach((item, index) => {
                            expect(item).to.deep.eq({
                                alt: testProps.items[index].caption,
                                url: testProps.items[index].url,
                                ClassName: 'listing-image-gallery__image',
                                sizes: imageSizes.portrait,
                                scale: imageConfig.portrait.scale,
                                anchor: imageConfig.portrait.anchor,
                                mode: imageConfig.portrait.mode,
                                breakpoints: breakpointsMock,
                                quality: imageQuality
                            });
                        });
                });

                it('should spread the rest of the props onto the returned component', () => {
                    expect(wrapper.find(MockedChild).props()).to.include({ size: testProps.size });
                });
            });
            describe('and size prop is landscape', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({ items: listingMock.profileGallery, size: 'landscape' });
                });

                it('should apply the modified items prop to the returned component', () => {
                    const { imageSizes, imageQuality, imageConfig } = GalleryImageMapper();

                    wrapper
                        .find(MockedChild)
                        .prop('items')
                        .forEach((item, index) => {
                            expect(item).to.deep.eq({
                                alt: testProps.items[index].caption,
                                url: testProps.items[index].url,
                                ClassName: 'listing-image-gallery__image',
                                sizes: imageSizes.landscape,
                                scale: imageConfig.landscape.scale,
                                anchor: imageConfig.landscape.anchor,
                                mode: imageConfig.landscape.mode,
                                breakpoints: breakpointsMock,
                                quality: imageQuality
                            });
                        });
                });

                it('should spread the rest of the props onto the returned component', () => {
                    expect(wrapper.find(MockedChild).props()).to.include({ size: testProps.size });
                });
            });
            describe('and size prop is compact', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({ items: listingMock.profileGallery, size: 'compact' });
                });

                it('should apply the modified items prop to the returned component', () => {
                    const { imageSizes, imageQuality, imageConfig } = GalleryImageMapper();

                    wrapper
                        .find(MockedChild)
                        .prop('items')
                        .forEach((item, index) => {
                            expect(item).to.deep.eq({
                                alt: testProps.items[index].caption,
                                url: testProps.items[index].url,
                                ClassName: 'listing-image-gallery__image',
                                sizes: imageSizes.compact,
                                scale: imageConfig.compact.scale,
                                anchor: imageConfig.compact.anchor,
                                mode: imageConfig.compact.mode,
                                breakpoints: breakpointsMock,
                                quality: imageQuality
                            });
                        });
                });

                it('should spread the rest of the props onto the returned component', () => {
                    expect(wrapper.find(MockedChild).props()).to.include({ size: testProps.size });
                });
            });
            describe('and size prop is fullWidth', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({ items: listingMock.profileGallery, size: 'fullWidth' });
                });

                it('should apply the modified items prop to the returned component', () => {
                    const { imageSizes, imageQuality, imageConfig } = GalleryImageMapper();

                    wrapper
                        .find(MockedChild)
                        .prop('items')
                        .forEach((item, index) => {
                            expect(item).to.deep.eq({
                                alt: testProps.items[index].caption,
                                url: testProps.items[index].url,
                                ClassName: 'listing-image-gallery__image',
                                sizes: imageSizes.fullWidth,
                                scale: imageConfig.fullWidth.scale,
                                anchor: imageConfig.fullWidth.anchor,
                                mode: imageConfig.fullWidth.mode,
                                breakpoints: breakpointsMock,
                                quality: imageQuality
                            });
                        });
                });

                it('should spread the rest of the props onto the returned component', () => {
                    expect(wrapper.find(MockedChild).props()).to.include({ size: testProps.size });
                });
            });

            describe('and size prop is not defined', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({ items: listingMock.profileGallery, size: undefined });
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    expect(wrapper.find(MockedChild).exists()).to.be.false;
                });
            });
        });
        describe('without a valid items prop', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper({ items: [] });
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.find(MockedChild).exists()).to.be.false;
            });
        });
    });

    describe('when not passed a component', () => {
        let wrapper;

        before(() => {
            filterErrors();
            const WrapperWithoutPassedComponent = new ShallowWrapperFactory(GalleryImageMapper());
            [wrapper] = WrapperWithoutPassedComponent();
        });

        after(() => {
            restoreErrors();
        });

        it('does not render', () => {
            expect(wrapper.find('WrappedGallery').exists()).to.be.false;
        });
    });
});
