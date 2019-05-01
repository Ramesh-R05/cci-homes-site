import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const TestimonialCardStub = Context.createStubComponent();
const TestimonialStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const TestimonialSection = proxyquire('../../../../app/components/listings/sections/testimonialSection', {
    '../components/testimonialCard': TestimonialCardStub,
    '../components/sectionWrapper': SectionWrapperStub
});

const TestWrapper = new ShallowWrapperFactory(TestimonialSection);

describe('TestimonialSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let testimonialWrapper;
            let titleRow;
            let titleColumn;
            let testimonialsRow;
            let testimonialCardColumn;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    testimonials: listingMock.testimonials
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                testimonialWrapper = wrapper.find(TestimonialStub);
                titleRow = sectionWrapper.childAt(0);
                titleColumn = titleRow.childAt(0);
                testimonialsRow = sectionWrapper.childAt(1);
                testimonialCardColumn = testimonialsRow.childAt(0);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('testimonial-section');
            });

            it('renders the title row inside of the SectionWrapper with the correct classes', () => {
                expect(titleRow.prop('className')).to.eq('row testimonial-section__title-row');
            });

            it('renders the title column within the title row with the correct classes', () => {
                expect(titleColumn.prop('className')).to.eq('columns small-12 testimonial-section__title-column');
            });

            it('renders the testimonial card column within the testimonials row with the correct classes', () => {
                expect(testimonialCardColumn.prop('className')).to.eq('columns small-12 large-4 testimonial-section__testimonial-column');
            });

            it('renders each testimonialCard component with correct props inside the testimonial card column', () => {
                testimonialWrapper.forEach((testimonial, i) => {
                    expect(testimonial.find(TestimonialCardStub).props()).to.deep.eq({
                        name: listingMock.testimonials[i].name,
                        company: listingMock.testimonials[i].company,
                        message: listingMock.testimonials[i].message
                    });
                });
            });
        });
    });
});
