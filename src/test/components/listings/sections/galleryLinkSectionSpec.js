import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import linkedGalleriesMock from '../../../mock/linkedGalleries';

noCallThru();
const Context = betterMockComponentContext();

const { React } = Context;

const SectionWrapperStub = Context.createStubComponentWithChildren();
const ImageGalleryStub = Context.createStubComponent();
const ModalTriggerStub = Context.createStubComponent();
const GalleryModalStub = Context.createStubComponent();
const GalleryModalHeaderStub = Context.createStubComponent();
const GalleryModalTriggerStub = Context.createStubComponent();

const GalleryLinkSection = proxyquire('../../../../app/components/listings/sections/galleryLinkSection', {
    react: React,
    '../components/imageGalleryWrapper': ImageGalleryStub,
    '../components/sectionWrapper': SectionWrapperStub,
    '@bxm/shared-ui': { ModalTrigger: ModalTriggerStub },
    '../components/galleryModal': GalleryModalStub,
    '../components/galleryModalHeader': GalleryModalHeaderStub,
    '../components/galleryModalTrigger': GalleryModalTriggerStub
});

const TestWrapper = new ShallowWrapperFactory(GalleryLinkSection);

describe('GalleryLinkSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let headingRow;
            let headingColumn;
            let galleryRow;
            let galleryColumn;

            const onClickStub = sinon.stub();

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    linkedGalleries: linkedGalleriesMock
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                headingRow = sectionWrapper.childAt(0);
                headingColumn = headingRow.childAt(0);
                galleryRow = sectionWrapper.childAt(1);
                galleryColumn = galleryRow.childAt(0);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('gallery-link-section');
            });

            it('renders the heading row as the first row inside of the SectionWrapper with the correct classes', () => {
                expect(headingRow.prop('className')).to.eq('gallery-link-section__heading-row row');
            });

            it('renders the heading within the column in the first row with the correct text', () => {
                expect(headingColumn.find('.heading').text()).to.eq('Explore More');
            });

            it('renders the gallery row as the second row inside of the SectionWrapper with the correct classes', () => {
                expect(galleryRow.prop('className')).to.eq('row collapse medium-uncollapse');
            });

            it('renders the ImageGalleryWrapper component in the correct column wtihin the correct row', () => {
                expect(galleryColumn.find(ImageGalleryStub).exists()).to.be.true;
            });

            it('renders the ImageGallery component with the correct props', () => {
                expect(galleryColumn.find(ImageGalleryStub).props()).to.deep.eq({
                    size: 'landscape',
                    items: testProps.linkedGalleries,
                    slideChangeCallback: wrapper.instance().onSlideChange
                });
            });

            it('renders the ModalTrigger component in the correct column in the correct row', () => {
                expect(galleryColumn.find(ModalTriggerStub).exists()).to.be.true;
            });

            it('ModalTrigger TriggerComponent prop renders the GalleryModalTrigger component', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('TriggerComponent')({ onClick: sinon.stub })
                        .find(GalleryModalTriggerStub)
                        .exists()
                ).to.be.true;
            });

            it('ModalTrigger TriggerComponent passes the correct props to the GalleryModalTrigger component', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('TriggerComponent')({ onClick: onClickStub })
                        .find(GalleryModalTriggerStub)
                        .props()
                ).to.deep.eq({
                    currentGallery: wrapper.state('currentGallery'),
                    onClick: onClickStub
                });
            });

            it('ModalTrigger ModalContent prop renders a GalleryModal component with correct props', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('ModalContent')()
                        .find(GalleryModalStub)
                        .props()
                ).to.deep.eq({
                    title: testProps.linkedGalleries[0].name,
                    images: testProps.linkedGalleries[0].galleryItems
                });
            });

            it('renders the modalTrigger component with correct props for modalProps', () => {
                expect(galleryColumn.find(ModalTriggerStub).prop('modalProps')).to.include({
                    additionalModalClassName: 'listing-gallery-modal',
                    cover: true
                });
            });
        });
    });

    describe('without linkedGalleries prop', () => {
        let wrapper;

        before(() => {
            [wrapper] = TestWrapper();
        });

        it('does not render', () => {
            expect(wrapper.find(SectionWrapperStub).exists()).to.be.false;
        });
    });

    describe('state', () => {
        describe('when component is loaded with valid props', () => {
            let wrapper;
            let testProps;

            const onClickStub = sinon.stub();

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    linkedGalleries: linkedGalleriesMock
                });
            });

            it('sets the currentGallery state to the first item in the linkedGalleries prop', () => {
                expect(wrapper.state('currentGallery')).to.deep.eq(testProps.linkedGalleries[0]);
            });

            it('ModalTrigger TriggerComponent prop renders a GalleryModalTrigger component with currentGallery prop as the first item in the linkedGalleries prop', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('TriggerComponent')({ onClick: onClickStub })
                        .find(GalleryModalTriggerStub)
                        .prop('currentGallery')
                ).to.eq(testProps.linkedGalleries[0]);
            });

            it('ModalTrigger ModalContent prop renders a GalleryModal component with the gallery items of the first item in the linkedGalleries prop', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('ModalContent')()
                        .props()
                ).to.deep.eq({
                    title: testProps.linkedGalleries[0].name,
                    images: testProps.linkedGalleries[0].galleryItems
                });
            });
        });

        describe('when the currentGallery is changed', () => {
            let wrapper;
            let testProps;

            const onClickStub = sinon.stub();

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    linkedGalleries: linkedGalleriesMock
                });

                wrapper.setState({ currentGallery: testProps.linkedGalleries[1] });
            });

            it('sets the currentGallery state to the updated item in the linkedGalleries prop', () => {
                expect(wrapper.state('currentGallery')).to.deep.eq(testProps.linkedGalleries[1]);
            });

            it('ModalTrigger TriggerComponent prop renders a GalleryModalTrigger component with currentGallery prop as the updated item in the linkedGalleries prop', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('TriggerComponent')({ onClick: onClickStub })
                        .find(GalleryModalTriggerStub)
                        .prop('currentGallery')
                ).to.eq(testProps.linkedGalleries[1]);
            });

            it('ModalTrigger ModalContent prop renders a GalleryModal component with the gallery items of the first item in the linkedGalleries prop', () => {
                expect(
                    wrapper
                        .find(ModalTriggerStub)
                        .renderProp('ModalContent')()
                        .props()
                ).to.deep.eq({
                    title: testProps.linkedGalleries[1].name,
                    images: testProps.linkedGalleries[1].galleryItems
                });
            });
        });
    });
});
