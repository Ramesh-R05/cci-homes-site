import TestimonialCard from '../../../../app/components/listings/components/testimonialCard';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

const selectors = {
    root: '.testimonial-card',
    name: '.testimonial-card__name',
    company: '.testimonial-card__company',
    message: '.testimonial-card__message'
};

const TestWrapper = new ShallowWrapperFactory(TestimonialCard);

describe('TestimonialCard component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    name: listingMock.testimonials[0].name,
                    company: listingMock.testimonials[0].company,
                    message: listingMock.testimonials[0].message
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the author name', () => {
                const { name } = selectors;

                expect(wrapper.find(name).exists()).to.be.true;
            });

            it('renders the value of the name prop to the correct location', () => {
                const { name } = selectors;

                expect(wrapper.find(name).text()).to.contain(testProps.name);
            });

            it('renders the company name', () => {
                const { company } = selectors;

                expect(wrapper.find(company).exists()).to.be.true;
            });

            it('renders the value of the company prop to the correct location', () => {
                const { company } = selectors;

                expect(wrapper.find(company).text()).to.contain(testProps.company);
            });

            it('renders the message name', () => {
                const { message } = selectors;

                expect(wrapper.find(message).exists()).to.be.true;
            });

            it('renders the value of the message prop to the correct location', () => {
                const { message } = selectors;

                expect(wrapper.find(message).text()).to.contain(testProps.message);
            });
        });
    });
});
