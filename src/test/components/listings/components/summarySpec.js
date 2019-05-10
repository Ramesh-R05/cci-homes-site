import Summary from '../../../../app/components/listings/components/summary';
import listingMock from '../../../mock/listing';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

const selectors = {
    root: '.summary',
    address: '.summary__address',
    subheading: '.summary__sub-heading',
    copy: '.summary__copy'
};

const TestWrapper = new ShallowWrapperFactory(Summary);

describe.only('Summary component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    streetAddress: listingMock.streetAddress,
                    subheading: listingMock.subheading,
                    copy: listingMock.copy
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                console.log(wrapper.debug());

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the address', () => {
                const { address } = selectors;

                expect(wrapper.find(address).exists()).to.be.true;
            });

            it('renders the value of the streetAddress prop to the correct location', () => {
                const { address } = selectors;

                expect(wrapper.find(address).text()).to.eq(testProps.streetAddress);
            });

            it('renders the subheading', () => {
                const { subheading } = selectors;

                expect(wrapper.find(subheading).exists()).to.be.true;
            });

            it('renders the value of the subHeading prop to the correct location', () => {
                const { subheading } = selectors;

                expect(wrapper.find(subheading).text()).to.eq(testProps.subheading);
            });

            it('renders the copy', () => {
                const { copy } = selectors;

                expect(wrapper.find(copy).exists()).to.be.true;
            });

            it('renders the value of the copy prop to the correct location', () => {
                const { copy } = selectors;

                expect(wrapper.find(copy).text()).to.eq(testProps.copy);
            });
        });
    });
});
