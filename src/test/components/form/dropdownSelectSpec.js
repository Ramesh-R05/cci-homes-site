import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;

const DropDownStub = Context.createStubComponent();

const DropdownSelect = proxyquire('../../../app/components/form/dropdownSelect', {
    react: React,
    'react-dropdown': DropDownStub
}).default;

const testWrapper = props => shallow(<DropdownSelect {...props} />);

const onChangeStub = sinon.stub();
const onClearStub = sinon.stub();
const placeholderMock = 'some placeholder text';
const optionsMock = [];
const selectedOptionMock = null;

const testProps = {
    onChange: onChangeStub,
    placeholder: placeholderMock,
    options: optionsMock,
    onClear: onClearStub,
    selectedOption: selectedOptionMock
};

describe('DropdownSelect component', () => {
    describe('rendering', () => {
        describe('with valid props', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper(testProps);
            });

            it('renders to the page', () => {
                expect(wrapper.find('.dropdown-select')).to.have.length(1);
            });
        });
        describe('selectedOption prop', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...testProps, selectedOption: 'sometihng' });
            });

            it('shows the clear button when selectedOption has a value', () => {
                expect(wrapper.find('.dropdown-select__clear-button')).to.have.length(1);
            });
        });
        describe('passing props', () => {
            describe('to <Dropdown/>', () => {
                let wrapper;
                let nestedComponent;

                beforeEach(() => {
                    wrapper = testWrapper({ ...testProps, selectedOption: 'sometihng' });
                    nestedComponent = wrapper.find(DropDownStub);
                });
                it('receives the correct values', () => {
                    expect(nestedComponent.prop('onChange')).to.eq(wrapper.instance().props.onChange);
                    expect(nestedComponent.prop('options')).to.eq(wrapper.instance().props.options);
                    expect(nestedComponent.prop('value')).to.eq(wrapper.instance().props.selectedOption);
                });
            });
        });
    });
});
