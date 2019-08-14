import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const ContactFormWrapperStub = Context.createStubComponent();
const ContactCardStub = Context.createStubComponent();
const SocialIconsStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const ContactSection = proxyquire('../../../../app/components/listings/sections/contactSection', {
    '../components/contactFormWrapper': ContactFormWrapperStub,
    '../components/contactCard': ContactCardStub,
    '../components/socialIcons': SocialIconsStub,
    '../components/sectionWrapper': SectionWrapperStub
}).default;

const TestWrapper = new ShallowWrapperFactory(ContactSection);

describe('ContactSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let mainRow;
            let headingRow;
            let contactFormColumn;
            let contactFormHeadingColumn;
            let contactFormSocialLinksColumn;
            let contactCardColumn;

            const contactFormMock = {};

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    businessName: listingMock.businessName,
                    streetAddress: listingMock.streetAddress,
                    emailAddress: listingMock.emailAddress,
                    phoneNumber: listingMock.phoneNumber,
                    instagramUrl: listingMock.instagramUrl,
                    pinterestUrl: listingMock.pinterestUrl,
                    twitterUrl: listingMock.twitterUrl,
                    facebookUrl: listingMock.facebookUrl,
                    contactForm: contactFormMock
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                mainRow = sectionWrapper.childAt(0);
                contactFormColumn = mainRow.childAt(0);
                contactCardColumn = mainRow.childAt(1);
                headingRow = contactFormColumn.childAt(0);
                contactFormHeadingColumn = headingRow.childAt(0);
                contactFormSocialLinksColumn = headingRow.childAt(1);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('contact-section');
            });

            it('renders the row inside of the SectionWrapper with the correct classes', () => {
                expect(mainRow.prop('className')).to.eq('row contact-section__main-row');
            });

            it('renders the contact form column within the main row with the correct classes', () => {
                expect(contactFormColumn.prop('className')).to.eq(
                    'columns small-12 large-8 xlarge-7 xlarge-offset-1 contact-section__contact-form-column'
                );
            });

            it('renders the contact card column within the main row with the correct classes', () => {
                expect(contactCardColumn.prop('className')).to.eq('columns small-12 large-4 xlarge-3 end contact-section__contact-card-column');
            });

            it('renders the contact form heading column within the main row with the correct classes', () => {
                expect(contactFormHeadingColumn.prop('className')).to.eq(
                    'columns small-12 large-8 large-offset-1 contact-section__contact-form-heading-column'
                );
            });

            it('renders the BusinessName prop into the contact form section heading', () => {
                expect(headingRow.find('.contact-section__sub-heading').text()).to.eq(
                    `Want to know more? Contact ${testProps.businessName} directly.`
                );
            });

            it('renders the contact form social icons column within the main row with the correct classes', () => {
                expect(contactFormSocialLinksColumn.prop('className')).to.eq(
                    'columns small-12 large-3 contact-section__contact-form-social-links-column'
                );
            });

            it('renders the SocialIcons component with correct props inside the social column', () => {
                expect(contactCardColumn.find(SocialIconsStub).props()).to.deep.eq({
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
                    ]
                });
            });

            it('renders the ContactFormWrapper component with correct props inside the contact form column', () => {
                expect(contactFormColumn.find(ContactFormWrapperStub).props()).to.deep.eq({
                    emailAddress: testProps.emailAddress,
                    contactForm: contactFormMock,
                    listingName: testProps.businessName
                });
            });

            it('renders the ContactCard component with correct props inside the contact card column', () => {
                expect(contactCardColumn.find(ContactCardStub).props()).to.deep.eq({
                    streetAddress: testProps.streetAddress,
                    webAddress: testProps.webAddress,
                    phoneNumber: testProps.phoneNumber
                });
            });
        });
    });
});
