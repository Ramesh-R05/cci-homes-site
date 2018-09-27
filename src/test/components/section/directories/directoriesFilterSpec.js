import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;

const DropdownSelectStub = Context.createStubComponent();

const DirectoryFilters = proxyquire('../../../../app/components/section/directories/directoryFilters', {
    react: React,
    '../../form/dropdownSelect': DropdownSelectStub
});

const handleSubmitStub = sinon.stub();
const handleFilterChangeStub = sinon.stub();
const handleFilterClearStub = sinon.stub();
const categoriesMock = ['category 1', 'category 2'];
const locationsMock = ['location 1', 'location 2'];
const selectedCategoryMock = 'foobar';
const selectedLocationMock = 'baz';
const isLoadingMock = false;

const testWrapper = props => shallow(<DirectoryFilters {...props} />);

const testProps = {
    handleSubmit: handleSubmitStub,
    handleFilterChange: handleFilterChangeStub,
    handleFilterClear: handleFilterClearStub,
    categories: categoriesMock,
    locations: locationsMock,
    selectedCategory: selectedCategoryMock,
    selectedLocation: selectedLocationMock,
    isLoading: isLoadingMock
};

describe('DirectoryFilters component', () => {
    describe('rendering', () => {
        describe('with valid props', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper(testProps);
            });

            it('renders an element to the page', () => {
                expect(wrapper.find('.directory-filters')).to.have.length(1);
            });

            it('renders 2 <DropdownSelect/> components', () => {
                const dropDownSelects = wrapper.find(DropdownSelectStub);
                expect(dropDownSelects).to.have.length(2);
            });
        });
        describe('loading prop', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...testProps, isLoading: true });
            });

            it('changes the button text to "loading..." when loading is true', () => {
                expect(wrapper.find('.directory-filters__submit-button').html()).to.include('loading...');
            });
        });
    });
    describe('passing props to <DropdownSelect/>', () => {
        let wrapper;
        let CategorySelect;
        let LocationSelect;

        beforeEach(() => {
            wrapper = testWrapper(testProps);
            [CategorySelect, LocationSelect] = wrapper.find(DropdownSelectStub);
        });

        describe('category selector', () => {
            it('receives the correct values', () => {
                expect(CategorySelect.props.options).to.eq(wrapper.instance().props.categories);
                expect(CategorySelect.props.value).to.eq(wrapper.instance().props.selectedCategory);
                expect(CategorySelect.props.onClear()).to.eq(wrapper.instance().props.handleFilterClearStub);
            });
        });

        describe('location selector', () => {
            it('receives the correct values', () => {
                expect(LocationSelect.props.options).to.eq(wrapper.instance().props.locations);
                expect(LocationSelect.props.value).to.eq(wrapper.instance().props.selectedLocation);
                expect(LocationSelect.props.onClear()).to.eq(wrapper.instance().props.handleFilterClearStub);
                expect(LocationSelect.props.onChange()).to.eq(wrapper.instance().props.handleFilterClearStub);
            });
        });
    });
});
