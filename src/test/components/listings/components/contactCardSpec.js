import ContactCard from '../../../../app/components/listings/components/contactCard';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

const selectors = {
    root: '.contact-card',
    webAddress: '.contact-card__list-item--web-address',
    streetAddress: '.contact-card__list-item--street-address',
    phoneNumber: '.contact-card__list-item--phone'
};

const TestWrapper = new ShallowWrapperFactory(ContactCard);

describe('ContactCard component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    streetAddress: listingMock.streetAddress,
                    webAddress: listingMock.webAddress,
                    phoneNumber: listingMock.phoneNumber
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the web address', () => {
                const { webAddress } = selectors;

                expect(wrapper.find(webAddress).exists()).to.be.true;
            });

            it('renders the value of the webAddress prop to the correct location', () => {
                const { webAddress } = selectors;

                expect(wrapper.find(webAddress).text()).to.contain(testProps.webAddress);
            });

            it('renders the street address', () => {
                const { streetAddress } = selectors;

                expect(wrapper.find(streetAddress).exists()).to.be.true;
            });

            it('renders the value of the streetAddress prop to the correct location', () => {
                const { streetAddress } = selectors;

                expect(wrapper.find(streetAddress).text()).to.contain(testProps.streetAddress);
            });

            it('renders the phone number', () => {
                const { phoneNumber } = selectors;

                expect(wrapper.find(phoneNumber).exists()).to.be.true;
            });

            it('renders the value of the phoneNumber prop to the correct location', () => {
                const { phoneNumber } = selectors;

                expect(wrapper.find(phoneNumber).text()).to.contain(testProps.phoneNumber);
            });
        });
    });
});
