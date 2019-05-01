import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

noCallThru();
const Context = betterMockComponentContext();

const ListingCardStub = Context.createStubComponent();
const ListingFiltersStub = Context.createStubComponent();

const ListingCategory = proxyquire('../../../../app/components/listings/templates/listingCategory', {
    '../components/listingCard': ListingCardStub,
    '../components/ListingFilters': ListingFiltersStub
});

const selectors = {
    root: '.listing-category',
    filterRow: '.listing-category__filter-row',
    filterColumn: '.listing-category__filter-column'
};

const TestWrapper = new ShallowWrapperFactory(ListingCategory);

describe.skip('ListingCategory component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let firstRow;

            before(() => {
                [wrapper, testProps] = TestWrapper();
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('renders the root element with correct classes', () => {
                const { root } = selectors;

                expect(wrapper.find(root).prop('className')).to.include('container');
            });

            it('has the correct grid classes for the first row', () => {
                const { filterRow } = selectors;
                expect(wrapper.find(filterRow).prop('className')).to.include('row');
            });

            it('has the correct grid classes for the column within the first row', () => {
                const { filterRow, filterColumn } = selectors;

                expect(
                    wrapper
                        .find(filterRow)
                        .find(filterColumn)
                        .prop('className')
                ).to.include('columns small-12');
            });

            it('renders the ListingFilters component in the first row', () => {
                const { filterRow, filterColumn } = selectors;

                expect(
                    wrapper
                        .find(filterRow)
                        .find(filterColumn)
                        .find(ListingFiltersStub)
                        .exists()
                ).to.be.true;
            });

            it('passes the filters through to the ListingFilters component');

            it('renders the a ListingCard component with correct props for each listing');
        });
        describe('without any listings', () => {
            let wrapper;
            let testProps;

            before(() => {
                filterErrors();
                [wrapper, testProps] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('renders the component');

            it('renders the filter component');

            it('renders the NotFound component');
        });
    });
});
