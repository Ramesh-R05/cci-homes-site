import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const onItemSelectedStub = sinon.stub();
const ListingNavMenu = proxyquire('../../../../app/components/listings/components/listingNavMenu', {}).default;

const TestWrapper = new ShallowWrapperFactory(ListingNavMenu);

describe('Listing Nave Menu Component', () => {
    describe('given one nav items', () => {
        let wrapper, testProps;
        before(() => {
            [wrapper, testProps] = TestWrapper({
                navItems: [
                    {
                        value: 'value-1',
                        label: 'label-1'
                    }
                ],
                selectedId: 'value-1',
                onItemSelected: onItemSelectedStub
            });
        });

        it('has two listing-nav-menu buttons', () => {
            expect(wrapper.find('.listing-nav-menu__button')).to.have.length(1);
        });

        it('the first button is selected', () => {
            expect(
                wrapper
                    .find('.listing-nav-menu__button')
                    .at(0)
                    .hasClass('listing-nav-menu__button--is-selected')
            ).to.be.true;
        });

        it('the first button should have appropriate text', () => {
            expect(
                wrapper
                    .find('.listing-nav-menu__button')
                    .at(0)
                    .text()
            ).to.equal(testProps.navItems[0].label);
        });
    });

    describe('given two nav items', () => {
        let wrapper, testProps;
        before(() => {
            [wrapper, testProps] = TestWrapper({
                navItems: [
                    {
                        value: 'value-1',
                        label: 'label-1'
                    },
                    {
                        value: 'value-2',
                        label: 'label-2'
                    }
                ],
                selectedId: 'value-1',
                onItemSelected: onItemSelectedStub
            });
        });

        it('has one listing-nav-menu buttons', () => {
            expect(wrapper.find('.listing-nav-menu__button')).to.have.length(2);
        });

        it('the first button is selected', () => {
            expect(
                wrapper
                    .find('.listing-nav-menu__button')
                    .at(0)
                    .hasClass('listing-nav-menu__button--is-selected')
            ).to.be.true;
        });

        it('the second button is not selected', () => {
            expect(
                wrapper
                    .find('.listing-nav-menu__button')
                    .at(1)
                    .hasClass('listing-nav-menu__button--is-selected')
            ).to.be.false;
        });

        it('the first button should have appropriate text', () => {
            expect(
                wrapper
                    .find('.listing-nav-menu__button')
                    .at(0)
                    .text()
            ).to.equal(testProps.navItems[0].label);
        });
    });
});
