import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const ImageGalleryStub = Context.createStubComponent();
const ScrollDownButtonStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const FullWidthGallerySection = proxyquire('../../../../app/components/listings/sections/fullWidthGallerySection', {
    '../components/imageGalleryWrapper': ImageGalleryStub,
    '../components/scrollDownButton': ScrollDownButtonStub,
    '../components/sectionWrapper': SectionWrapperStub
}).default;

const TestWrapper = new ShallowWrapperFactory(FullWidthGallerySection);

describe('FullWidthGallerySection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let galleryRow;
            let galleryColumn;
            let scrollDownButtonRow;
            let scrollDownButtonColumn;
            let scrollDownButton;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    heroGallery: listingMock.heroGallery
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                galleryRow = sectionWrapper.childAt(0);
                galleryColumn = galleryRow.childAt(0);
                scrollDownButtonRow = sectionWrapper.childAt(1);
                scrollDownButtonColumn = scrollDownButtonRow.childAt(0);
                scrollDownButton = wrapper.find(ScrollDownButtonStub);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('full-width-gallery-section');
            });

            it('renders the gallery row inside of the SectionWrapper with the correct classes', () => {
                expect(galleryRow.prop('className')).to.eq('row full-width-gallery-section__gallery-row collapse large-uncollapse');
            });

            it('renders the gallery column within the main row with the correct classes', () => {
                expect(galleryColumn.prop('className')).to.eq('columns small-12 large-10 large-offset-1 full-width-gallery-section__gallery-column');
            });

            it('renders the ImageGallery component with correct props', () => {
                expect(sectionWrapper.find(ImageGalleryStub).props()).to.deep.eq({
                    items: testProps.heroGallery,
                    size: 'fullWidth'
                });
            });

            it('renders the scroll button row inside of the SectionWrapper with the correct classes', () => {
                expect(scrollDownButtonRow.prop('className')).to.eq('row full-width-gallery-section__scroll-button-row');
            });

            it('renders the scroll button column within the main row with the correct classes', () => {
                expect(scrollDownButtonColumn.prop('className')).to.eq('columns small-12 full-width-gallery-section__scroll-button-column');
            });

            it('renders the ScrollDownButton component', () => {
                expect(scrollDownButton.exists()).to.be.true;
            });
        });
    });
});
