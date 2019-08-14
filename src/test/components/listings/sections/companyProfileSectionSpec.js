import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const ImageGalleryStub = Context.createStubComponent();
const SummaryStub = Context.createStubComponent();
const SocialIconStub = Context.createStubComponent();
const BrandLogoStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const CompanyProfileSection = proxyquire('../../../../app/components/listings/sections/companyProfileSection', {
    '../components/imageGalleryWrapper': ImageGalleryStub,
    '../components/summary': SummaryStub,
    '../components/socialIcons': SocialIconStub,
    '../components/BrandLogo': BrandLogoStub,
    '../components/sectionWrapper': SectionWrapperStub
}).default;

const TestWrapper = new ShallowWrapperFactory(CompanyProfileSection);

describe('CompanyProfileSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let mainRow;
            let galleryColumn;
            let summaryColumn;
            let socialColumn;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    businessLogo: listingMock.businessLogo,
                    businessName: listingMock.businessName,
                    streetAddress: listingMock.streetAddress,
                    profileGallery: listingMock.profileGallery,
                    instagramUrl: listingMock.instagramUrl,
                    pinterestUrl: listingMock.pinterestUrl,
                    twitterUrl: listingMock.twitterUrl,
                    facebookUrl: listingMock.facebookUrl,
                    subheading: listingMock.subheading,
                    copy: listingMock.copy
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                mainRow = sectionWrapper.childAt(0);
                galleryColumn = mainRow.childAt(0);
                summaryColumn = mainRow.childAt(1);
                socialColumn = mainRow.childAt(2);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('company-profile-section');
            });

            it('renders the row inside of the SectionWrapper with the correct classes', () => {
                expect(mainRow.prop('className')).to.eq('row company-profile-section__main-row');
            });

            it('renders the gallery column within the main row with the correct classes', () => {
                expect(galleryColumn.prop('className')).to.eq(
                    'columns small-12 medium-6 large-5 large-offset-1 company-profile-section__gallery-column'
                );
            });

            it('renders the summary column within the main row with the correct classes', () => {
                expect(summaryColumn.prop('className')).to.eq('columns small-12 medium-6 large-5 company-profile-section__summary-column');
            });

            it('renders the social column within the main row with the correct classes', () => {
                expect(socialColumn.prop('className')).to.eq('columns small-12 large-1 show-for-large-up company-profile-section__social-column');
            });

            it('renders the ImageGallery component with correct props inside the gallery column', () => {
                expect(galleryColumn.find(ImageGalleryStub).props()).to.deep.eq({
                    items: testProps.profileGallery,
                    size: 'portrait'
                });
            });

            it('renders the BrandLogo component with correct props inside the summary column', () => {
                expect(summaryColumn.find(BrandLogoStub).props()).to.deep.eq({
                    ...listingMock.businessLogo
                });
            });

            it('renders the Summary component with correct props inside the summary column', () => {
                expect(summaryColumn.find(SummaryStub).props()).to.deep.eq({
                    businessName: listingMock.businessName,
                    copy: listingMock.copy,
                    streetAddress: listingMock.streetAddress,
                    subheading: listingMock.subheading
                });
            });

            it('renders the SocialIcons component with correct props inside the social column', () => {
                expect(socialColumn.find(SocialIconStub).props()).to.deep.eq({
                    links: [
                        {
                            name: 'facebook',
                            url: listingMock.facebookUrl
                        },
                        {
                            name: 'twitter',
                            url: listingMock.twitterUrl
                        },
                        {
                            name: 'instagram',
                            url: listingMock.instagramUrl
                        },
                        {
                            name: 'pinterest',
                            url: listingMock.pinterestUrl
                        }
                    ],
                    isVertical: true
                });
            });
        });
    });
});
