import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const selectors = {
    root: '.summary',
    address: '.summary__address',
    subheading: '.summary__sub-heading',
    copy: '.summary__copy'
};

const splitParagraphsStub = sinon.stub();
const splitParagraphsHTML = sinon.stub();

const Summary = proxyquire('../../../../app/components/listings/components/summary', {
    '@bxm/markdown': {
        splitParagraphs: splitParagraphsStub
    },
    '../utilities/splitParagraphsHTML': splitParagraphsHTML
});

const TestWrapper = new ShallowWrapperFactory(Summary);

describe('Summary component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                const copyMock = listingMock.copy;
                splitParagraphsHTML.returns(copyMock);

                [wrapper, testProps] = TestWrapper({
                    streetAddress: listingMock.streetAddress,
                    subheading: listingMock.subheading,
                    copy: copyMock
                });
            });

            after(() => {
                splitParagraphsHTML.resetHistory();
                splitParagraphsStub.resetHistory();
            });

            it('renders the component', () => {
                const { root } = selectors;

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

                expect(wrapper.find(copy).prop('dangerouslySetInnerHTML').__html).to.eq(testProps.copy);
            });
        });
    });
});
