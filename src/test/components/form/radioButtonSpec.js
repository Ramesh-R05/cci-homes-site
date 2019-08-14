import { shallow } from 'enzyme';
import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
const Context = betterMockComponentContext();
const { React } = Context;
noCallThru();

const InputStub = Context.createStubComponent();

const RadioButton = proxyquire('../../../app/components/form/radioButton', {
    './input': InputStub
}).default;

const TestWrapper = new ShallowWrapperFactory(RadioButton);

describe('Radio Component', () => {
    let wrapper;

    before(() => {
        [wrapper] = TestWrapper();
    });

    it('should render an <Input/> component', () => {
        expect(wrapper.find(InputStub).exists()).to.be.true;
    });

    it(`should set the type prop on the <Input/> component to 'radio'`, () => {
        const input = wrapper.find(InputStub);
        expect(input.props().type).to.eq('radio');
    });
});
