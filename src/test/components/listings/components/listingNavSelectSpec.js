import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const SelectMock = Context.createStubComponent();
const onItemSelectedStub = sinon.stub();

const ListingNavSelect = proxyquire('../../../../app/components/listings/components/listingNavSelect', {
    'react-select': SelectMock
}).default;

const TestWrapper = new ShallowWrapperFactory(ListingNavSelect);

describe('ListingNavSelect component', () => {
    describe('given one nav item and no visiblityClass', () => {
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                onItemSelected: onItemSelectedStub,
                navItems: [
                    {
                        label: 'label-1',
                        value: 'value-1'
                    }
                ]
            });
        });

        it('will render the SelectMock', () => {
            expect(wrapper.exists(SelectMock)).to.be.true;
        });

        it('will have the correct props', () => {
            expect(wrapper.props()).to.deep.equal({
                defaultValue: testProps.navItems[0],
                className: 'listing-nav-select',
                classNamePrefix: 'listing-nav-select',
                options: testProps.navItems,
                onChange: wrapper.prop('onChange'),
                isSearchable: false
            });
        });
    });

    describe('given two nav item and a visiblityClass', () => {
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                onItemSelected: onItemSelectedStub,
                navItems: [
                    {
                        label: 'label-1',
                        value: 'value-1'
                    },
                    {
                        label: 'label-2',
                        value: 'value-2'
                    }
                ],
                visiblityClass: 'visibility-class'
            });
        });

        it('will render the SelectMock', () => {
            expect(wrapper.exists(SelectMock)).to.be.true;
        });

        it('will have the correct props', () => {
            expect(wrapper.props()).to.deep.equal({
                defaultValue: testProps.navItems[0],
                className: `listing-nav-select ${testProps.visiblityClass}`,
                classNamePrefix: 'listing-nav-select',
                options: testProps.navItems,
                onChange: wrapper.prop('onChange'),
                isSearchable: false
            });
        });
    });
});
