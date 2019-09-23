import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const ExenvMock = Context.createStubComponent();
const ListingNavMenuMock = Context.createStubComponent();
const ListingNavSelectMock = Context.createStubComponent();

const DirectoryHeader = proxyquire('../../../../app/components/listings/components/listingNavWrapper', {
    exenv: ExenvMock,
    './listingNavMenu': ListingNavMenuMock,
    './listingNavSelect': ListingNavSelectMock
}).default;

const TestWrapper = new ShallowWrapperFactory(DirectoryHeader);

describe('Listing Nav Wrapper Component', () => {
    describe('given a premium listing', () => {
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                type: 'PremiumListing',
                businessName: 'test-business'
            });
        });

        it('contains a ListingNavSelectMock', () => {
            expect(wrapper.exists(ListingNavSelectMock)).to.be.true;
        });

        it('the ListingNavSelectMock has expected navItems', () => {
            expect(wrapper.find(ListingNavSelectMock).prop('navItems')).deep.equal([
                { label: testProps.businessName, value: 'company-profile-section' },
                { label: 'Shop', value: 'product-section' },
                { label: 'Galleries', value: 'galleries-section' },
                { label: 'Testimonials', value: 'testimonial-section' },
                { label: 'Contact', value: 'contact-section' }
            ]);
        });

        it('contains a ListingNavMenuMock', () => {
            expect(wrapper.exists(ListingNavMenuMock)).to.be.true;
        });

        it('the ListingNavMenuMock has expected navItems', () => {
            expect(wrapper.find(ListingNavMenuMock).prop('navItems')).deep.equal([
                { label: testProps.businessName, value: 'company-profile-section' },
                { label: 'Shop', value: 'product-section' },
                { label: 'Galleries', value: 'galleries-section' },
                { label: 'Testimonials', value: 'testimonial-section' },
                { label: 'Contact', value: 'contact-section' }
            ]);
        });

        it('the ListingNavMenuMock has expected selectedId', () => {
            expect(wrapper.find(ListingNavMenuMock).prop('selectedId')).to.equal(null);
        });
    });
});
