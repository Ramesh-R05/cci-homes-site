import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

noCallThru();
const Context = betterMockComponentContext();

const TestimonialCardStub = Context.createStubComponent();
const TestimonialStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const testimonialsMock = [
    {
        name: 'Frank Realson',
        company: 'a totally legit company',
        message: 'wow, how do they do that?!'
    },
    {
        name: 'Terrance Existso',
        company: 'manufacturing co',
        message: 'See for yourself, this company just knows how to do it!'
    },
    {
        name: 'Gardenia Short',
        company: 'home office gardening solutions',
        message:
            'I was skeptical at first, but then I spoke to Carol in processing and she addressed all my concerns and as a result of me purchasing the product, our plant life has never been better!'
    }
];

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

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    testimonials: testimonialsMock
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                testimonialWrapper = wrapper.find(TestimonialStub);
                titleRow = sectionWrapper.childAt(0);
                titleColumn = titleRow.childAt(0);
                testimonialsRow = sectionWrapper.childAt(1);
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

            describe('and 3 testimonials', () => {
                let wrapper;
                let testProps;
                let sectionWrapper;
                let testimonialWrapper;
                let titleRow;
                let titleColumn;
                let testimonialsRow;
                let testimonialCardColumn1;
                let testimonialCardColumn2;
                let testimonialCardColumn3;

                before(() => {
                    [wrapper, testProps] = TestWrapper({
                        testimonials: testimonialsMock
                    });

                    sectionWrapper = wrapper.find(SectionWrapperStub);
                    testimonialWrapper = wrapper.find(TestimonialStub);
                    titleRow = sectionWrapper.childAt(0);
                    titleColumn = titleRow.childAt(0);
                    testimonialsRow = sectionWrapper.childAt(1);
                    testimonialCardColumn1 = testimonialsRow.childAt(0);
                    testimonialCardColumn2 = testimonialsRow.childAt(1);
                    testimonialCardColumn3 = testimonialsRow.childAt(2);
                });

                it('renders the first testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn1.prop('className')).to.eq('columns small-12 large-4 testimonial-section__testimonial-column');
                });

                it('renders the second testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn2.prop('className')).to.eq('columns small-12 large-4 testimonial-section__testimonial-column');
                });

                it('renders the third testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn3.prop('className')).to.eq('columns small-12 large-4 end testimonial-section__testimonial-column');
                });

                it('renders each testimonialCard component with correct props inside the testimonial card column', () => {
                    testimonialWrapper.forEach((testimonial, i) => {
                        expect(testimonial.find(TestimonialCardStub).props()).to.deep.eq({
                            name: testimonialsMock[i].name,
                            company: testimonialsMock[i].company,
                            message: testimonialsMock[i].message
                        });
                    });
                });
            });

            describe('and 2 testimonials', () => {
                let wrapper;
                let testProps;
                let sectionWrapper;
                let testimonialWrapper;
                let titleRow;
                let titleColumn;
                let testimonialsRow;
                let testimonialCardColumn1;
                let testimonialCardColumn2;

                before(() => {
                    [wrapper, testProps] = TestWrapper({
                        testimonials: testimonialsMock.slice(1)
                    });

                    sectionWrapper = wrapper.find(SectionWrapperStub);
                    testimonialWrapper = wrapper.find(TestimonialStub);
                    titleRow = sectionWrapper.childAt(0);
                    titleColumn = titleRow.childAt(0);
                    testimonialsRow = sectionWrapper.childAt(1);
                    testimonialCardColumn1 = testimonialsRow.childAt(0);
                    testimonialCardColumn2 = testimonialsRow.childAt(1);
                });

                it('renders the first testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn1.prop('className')).to.eq(
                        'columns small-12 large-4 large-offset-2 testimonial-section__testimonial-column'
                    );
                });

                it('renders the second testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn2.prop('className')).to.eq('columns small-12 large-4 end testimonial-section__testimonial-column');
                });

                it('renders each testimonialCard component with correct props inside the testimonial card column', () => {
                    testimonialWrapper.forEach((testimonial, i) => {
                        expect(testimonial.find(TestimonialCardStub).props()).to.deep.eq({
                            name: testimonialsMock[i].name,
                            company: testimonialsMock[i].company,
                            message: testimonialsMock[i].message
                        });
                    });
                });
            });

            describe('and 1 testimonial', () => {
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
                        testimonials: testimonialsMock.slice(2)
                    });

                    sectionWrapper = wrapper.find(SectionWrapperStub);
                    testimonialWrapper = wrapper.find(TestimonialStub);
                    titleRow = sectionWrapper.childAt(0);
                    titleColumn = titleRow.childAt(0);
                    testimonialsRow = sectionWrapper.childAt(1);
                    testimonialCardColumn = testimonialsRow.childAt(0);
                });

                it('renders the testimonial card column within the testimonials row with the correct classes', () => {
                    expect(testimonialCardColumn.prop('className')).to.eq(
                        'columns small-12 large-4 large-offset-4 end testimonial-section__testimonial-column'
                    );
                });

                it('renders each testimonialCard component with correct props inside the testimonial card column', () => {
                    testimonialWrapper.forEach((testimonial, i) => {
                        expect(testimonial.find(TestimonialCardStub).props()).to.deep.eq({
                            name: testimonialsMock[i].name,
                            company: testimonialsMock[i].company,
                            message: testimonialsMock[i].message
                        });
                    });
                });
            });
        });
    });
});
