import ScrollDownButton from '../../../../app/components/listings/components/scrollDownButton';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

const selectors = {
    root: '.scroll-down-button'
};

const TestWrapper = new ShallowWrapperFactory(ScrollDownButton);

describe('ScrollDownButton component', () => {
    describe('rendering', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({});
        });

        it('renders the component', () => {
            const { root } = selectors;

            expect(wrapper.find(root).exists()).to.be.true;
        });

        // TODO - write unit test for onClick handler or add automation test to cover this functionality
    });
});
