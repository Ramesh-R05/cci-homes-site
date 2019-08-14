import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const FullWidthGallerySectionStub = Context.createStubComponent();
const CompanyProfileSectionStub = Context.createStubComponent();
const ProductSectionStub = Context.createStubComponent();
const GalleryLinkSectionStub = Context.createStubComponent();
const TestimonialSectionStub = Context.createStubComponent();
const FeaturedArticleSectionStub = Context.createStubComponent();
const ContactSectionStub = Context.createStubComponent();

const ListingRenderer = proxyquire('../../../../app/components/listings/templates/listingRenderer', {
    '../sections/fullWidthGallerySection': FullWidthGallerySectionStub,
    '../sections/companyProfileSection': CompanyProfileSectionStub,
    '../sections/productSection': ProductSectionStub,
    '../sections/galleryLinkSection': GalleryLinkSectionStub,
    '../sections/testimonialSection': TestimonialSectionStub,
    '../sections/featuredArticleSection': FeaturedArticleSectionStub,
    '../sections/contactSection': ContactSectionStub
}).default;

const selectors = {
    root: '.listing',
    standard: 'listing--standardlisting',
    enhanced: 'listing--enhancedlisting',
    premium: 'listing--premiumlisting'
};

const TestWrapper = new ShallowWrapperFactory(ListingRenderer);

function premiumListing(wrapper, testProps) {
    it('renders the products section', () => {
        expect(wrapper.find(ProductSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the products section', () => {
        expect(wrapper.find(ProductSectionStub).props()).to.deep.eq({
            businessName: testProps.content.businessName,
            products: testProps.content.products
        });
    });

    it('renders the galleries section', () => {
        expect(wrapper.find(GalleryLinkSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the galleries section', () => {
        expect(wrapper.find(GalleryLinkSectionStub).props()).to.deep.eq({
            linkedGalleries: testProps.content.linkedGalleries
        });
    });

    it('renders the featured articles section', () => {
        expect(wrapper.find(FeaturedArticleSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the featured articles section', () => {
        expect(wrapper.find(FeaturedArticleSectionStub).props()).to.deep.eq({
            featuredInArticles: testProps.content.featuredIn
        });
    });
}

function enhancedListing(wrapper, testProps) {
    it('renders the HeroGallery section', () => {
        expect(wrapper.find(FullWidthGallerySectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the HeroGallery section', () => {
        expect(wrapper.find(FullWidthGallerySectionStub).props()).to.deep.eq({
            heroGallery: testProps.content.heroGallery,
            contentVideo: testProps.content.contentVideo
        });
    });

    it('renders the Testimonials section', () => {
        expect(wrapper.find(TestimonialSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the Testimonials section', () => {
        expect(wrapper.find(TestimonialSectionStub).props()).to.deep.eq({
            testimonials: testProps.content.testimonials
        });
    });
}

function standardListing(wrapper, testProps) {
    it('renders the Summary section', () => {
        expect(wrapper.find(CompanyProfileSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the Summary section', () => {
        expect(wrapper.find(CompanyProfileSectionStub).props()).to.deep.eq({
            businessLogo: testProps.content.businessLogo,
            businessName: testProps.content.businessName,
            streetAddress: testProps.content.streetAddress,
            profileGallery: testProps.content.profileGallery,
            instagramUrl: testProps.content.instagramUrl,
            pinterestUrl: testProps.content.pinterestUrl,
            facebookUrl: testProps.content.facebookUrl,
            twitterUrl: testProps.content.twitterUrl,
            subheading: testProps.content.subheading,
            copy: testProps.content.copy
        });
    });

    it('renders the Contact section', () => {
        expect(wrapper.find(ContactSectionStub).exists()).to.be.true;
    });

    it('passes the correct props to the Contact section', () => {
        expect(wrapper.find(ContactSectionStub).props()).to.deep.eq({
            businessName: testProps.content.businessName,
            streetAddress: testProps.content.streetAddress,
            webAddress: testProps.content.webAddress,
            phoneNumber: testProps.content.phoneNumber,
            emailAddress: testProps.content.emailAddress,
            instagramUrl: testProps.content.instagramUrl,
            pinterestUrl: testProps.content.pinterestUrl,
            facebookUrl: testProps.content.facebookUrl,
            twitterUrl: testProps.content.twitterUrl,
            contactForm: null
        });
    });
}

describe('ListingRenderer component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            // can't use before or beforeEach hooks to set wrapper & testprops because they don't run before the tests run.

            const [wrapper, testProps] = TestWrapper({
                content: { ...listingMock, linkedGalleries: listingMock.galleries }
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            premiumListing(wrapper, testProps);
            enhancedListing(wrapper, testProps);
            standardListing(wrapper, testProps);
        });

        describe('with the PremiumListing nodetype', () => {
            // can't use before or beforeEach hooks to set wrapper & testprops because they don't run before the tests run.

            const [wrapper, testProps] = TestWrapper({
                content: { ...listingMock, linkedGalleries: listingMock.galleries }
            });

            it('sets the correct classModifier for the root element', () => {
                const { root, premium } = selectors;

                expect(wrapper.find(root).props().className).to.contain(premium);
            });

            premiumListing(wrapper, testProps);
        });

        describe('with the EnhancedListing nodetype', () => {
            // can't use before or beforeEach hooks to set wrapper & testprops because they don't run before the tests run.

            const [wrapper, testProps] = TestWrapper({
                content: { ...listingMock, nodeType: 'EnhancedListing' }
            });

            it('sets the correct classModifier for the root element', () => {
                const { root, enhanced } = selectors;

                expect(wrapper.find(root).props().className).to.contain(enhanced);
            });

            enhancedListing(wrapper, testProps);

            it('should not render the product section', () => {
                expect(wrapper.find(ProductSectionStub).exists()).to.be.false;
            });

            it('should not render the featured article section', () => {
                expect(wrapper.find(FeaturedArticleSectionStub).exists()).to.be.false;
            });

            it('should not render the galleries section', () => {
                expect(wrapper.find(GalleryLinkSectionStub).exists()).to.be.false;
            });
        });
        describe('with the StandardListing nodetype', () => {
            // can't use before or beforeEach hooks to set wrapper & testprops because they don't run before the tests run.

            const [wrapper, testProps] = TestWrapper({
                content: { ...listingMock, nodeType: 'StandardListing' }
            });

            it('sets the correct classModifier for the root element', () => {
                const { root, standard } = selectors;

                expect(wrapper.find(root).props().className).to.contain(standard);
            });

            standardListing(wrapper, testProps);

            it('should not render the hero gallery section', () => {
                expect(wrapper.find(FullWidthGallerySectionStub).exists()).to.be.false;
            });

            it('should not render the galleries section', () => {
                expect(wrapper.find(GalleryLinkSectionStub).exists()).to.be.false;
            });

            it('should not render the testimonials section', () => {
                expect(wrapper.find(TestimonialSectionStub).exists()).to.be.false;
            });

            it('should not render the product section', () => {
                expect(wrapper.find(ProductSectionStub).exists()).to.be.false;
            });

            it('should not render the featured article section', () => {
                expect(wrapper.find(FeaturedArticleSectionStub).exists()).to.be.false;
            });
        });

        describe('with invalid props', () => {
            describe('content prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();

                    [wrapper] = TestWrapper({
                        content: undefined
                    });
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });
            describe('invalid nodeType passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();

                    [wrapper] = TestWrapper({
                        content: { ...listingMock, nodeType: 'HomesArticle' }
                    });
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render any content', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).children().length).to.eq(0);
                });
            });
        });
    });
});
