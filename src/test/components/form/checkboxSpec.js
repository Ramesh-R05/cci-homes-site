import { betterMockComponentContext } from '@bxm/flux';
import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
const Context = betterMockComponentContext();
const { React } = Context;
noCallThru();

const InputStub = Context.createStubComponent();

const Checkbox = proxyquire('../../../app/components/form/checkbox', {
    './input': InputStub
});

const TestWrapper = new ShallowWrapperFactory(Checkbox);

describe('Checkbox', () => {
    let wrapper;

    before(() => {
        [wrapper] = TestWrapper();
    });

    it('should render an <Input/> component', () => {
        expect(wrapper.find(InputStub).exists()).to.be.true;
    });

    it(`should set the type prop on the <Input/> component to 'checkbox'`, () => {
        const input = wrapper.find(InputStub);
        expect(input.props().type).to.eq('checkbox');
    });
});
