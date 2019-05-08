import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import proxyquire, { noCallThru } from 'proxyquire';
import listingsMock from '../../../mock/parsedListings';
import breakpointsMock from '../../../mock/breakpoints';

noCallThru();

const Context = betterMockComponentContext();
const InlineSVGStub = Context.createStubComponentWithChildren();
const ContactCardStub = Context.createStubComponent();

const ResponsiveImageStub = Context.createStubComponent();
const imageResizeMock = {
    scale: {
        BOTH: 'BOTH'
    },
    anchor: {
        MC: 'MC'
    },
    mode: {
        CROP: 'CROP'
    }
};

const ListingCard = proxyquire('../../../../app/components/listings/components/listingCard', {
    'react-inlinesvg': InlineSVGStub,
    '@bxm/ui/lib/common/ResponsiveImage': ResponsiveImageStub,
    '@bxm/ui/lib/common/ImageResize': imageResizeMock,
    '../../../breakpoints': breakpointsMock,
    './contactCard': ContactCardStub
});

const TestWrapper = new ShallowWrapperFactory(ListingCard);

const selectors = {
    root: '.listing-card',
    imageWrapper: '.listing-card__image-wrapper',
    contactOverlay: '.listing-card__contact-overlay',
    overlayClose: '.listing-card__overlay-close',
    featuredTag: '.listing-card__featured-tag',
    previewImage: '.listing-card__preview-image',
    options: '.listing-card__options',
    button: '.listing-card__button',
    detailWrapper: '.listing-card__detail-wrapper',
    title: '.listing-card__title',
    subtitle: '.listing-card__subtitle'
};

describe('ListingCard component', () => {
    describe('rendering', () => {
        describe('with valid required props and listingType not PremiumListing', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        tags: listingsMock[0].tagsDetails,
                        listingType: 'StandardListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('renders the root node', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the image wrapper', () => {
                const { imageWrapper } = selectors;

                expect(wrapper.find(imageWrapper).exists()).to.be.true;
            });

            it('renders a ResponsiveImage with the correct props', () => {
                expect(wrapper.find(ResponsiveImageStub).props()).to.deep.eq({
                    sizes: {
                        s: { w: 690, h: 535 },
                        m: { w: 708, h: 550 },
                        l: { w: 622, h: 482 },
                        xl: { w: 490, h: 380 }
                    },
                    alt: testProps.previewImage.caption,
                    url: testProps.previewImage.url,
                    ClassName: 'listing-card__preview-image',
                    scale: imageResizeMock.scale.BOTH,
                    anchor: imageResizeMock.anchor.MC,
                    mode: imageResizeMock.mode.CROP,
                    breakpoints: breakpointsMock,
                    imageQuality: 75
                });
            });

            it('renders the options', () => {
                const { options } = selectors;

                expect(wrapper.find(options).exists()).to.be.true;
            });

            it('renders the contact button as the first option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .text()
                ).to.eq('Contact Info');
            });

            it('sets the correct props on the contact button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props()
                ).to.include({
                    onClick: wrapper.instance().trackOpenAndToggleOverlay,
                    type: 'button'
                });
            });

            it('does not render the overlay', () => {
                const { contactOverlay } = selectors;

                expect(wrapper.find(contactOverlay).exists()).to.be.false;
            });

            it('does not render the featured tag', () => {
                const { featuredTag } = selectors;

                expect(wrapper.find(featuredTag).exists()).to.be.false;
            });

            it('renders the title with the title prop', () => {
                const { title } = selectors;

                wrapper.find(title).tap(titleWrapper => {
                    expect(titleWrapper.exists()).to.be.true;
                    expect(titleWrapper.text()).to.eq(testProps.title);
                });
            });

            it('renders the subtitle with the subtitle prop', () => {
                const { subtitle } = selectors;

                wrapper.find(subtitle).tap(subtitleWrapper => {
                    expect(subtitleWrapper.exists()).to.be.true;
                    expect(subtitleWrapper.text()).to.eq(testProps.subtitle);
                });
            });
        });

        describe(`listingType prop set to 'PremiumListing'`, () => {
            let wrapper;
            let testProps;
            let getCategoryFromTagStub;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        tags: listingsMock[0].tagsDetails,
                        category: 'furniture-and-interiors',
                        listingType: 'PremiumListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('renders the featured tag', () => {
                const { featuredTag } = selectors;

                expect(wrapper.find(featuredTag).exists()).to.be.true;
            });

            it('renders 2 option buttons', () => {
                const { button } = selectors;

                expect(wrapper.find(button)).to.have.length(2);
            });

            it('renders the contact button as the first option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .text()
                ).to.eq('Contact Info');
            });

            it('sets the correct props on the contact button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props()
                ).to.include({
                    onClick: wrapper.instance().trackOpenAndToggleOverlay,
                    type: 'button'
                });
            });

            it('renders the explore more button as the second option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .text()
                ).to.eq('Explore More');
            });

            it('sets the link on the explore more button based on the url and the category tag', () => {
                const { button } = selectors;
                const expectedCategoryTag = testProps.tags[0].urlName;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .prop('href')
                ).to.eq(`/directory/${expectedCategoryTag}${testProps.listingUrl}`);
            });
        });

        describe(`listingType prop set to 'EnhancedListing'`, () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        tags: listingsMock[0].tagsDetails,
                        category: 'furniture-and-interiors',
                        listingType: 'EnhancedListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('does not render the featured tag', () => {
                const { featuredTag } = selectors;

                expect(wrapper.find(featuredTag).exists()).to.be.false;
            });

            it('renders 2 option buttons', () => {
                const { button } = selectors;

                expect(wrapper.find(button)).to.have.length(2);
            });

            it('renders the contact button as the first option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .text()
                ).to.eq('Contact Info');
            });

            it('sets the correct props on the contact button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props()
                ).to.include({
                    onClick: wrapper.instance().trackOpenAndToggleOverlay,
                    type: 'button'
                });
            });

            it('renders the explore more button as the second option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .text()
                ).to.eq('Explore More');
            });

            it('sets the link on the explore more button based on the url and the category tag', () => {
                const { button } = selectors;
                const expectedCategoryTag = testProps.tags[0].urlName;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .prop('href')
                ).to.eq(`/directory/${expectedCategoryTag}${testProps.listingUrl}`);
            });
        });

        describe(`listingType prop set to 'StandardListing'`, () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        tags: listingsMock[0].tagsDetails,
                        category: 'furniture-and-interiors',
                        listingType: 'StandardListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('renders the featured tag', () => {
                const { featuredTag } = selectors;

                expect(wrapper.find(featuredTag).exists()).to.be.false;
            });

            it('renders 2 option buttons', () => {
                const { button } = selectors;

                expect(wrapper.find(button)).to.have.length(2);
            });

            it('renders the contact button as the first option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .text()
                ).to.eq('Contact Info');
            });

            it('sets the correct props on the contact button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props()
                ).to.include({
                    onClick: wrapper.instance().trackOpenAndToggleOverlay,
                    type: 'button'
                });
            });

            it('renders the explore more button as the second option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .text()
                ).to.eq('Explore More');
            });

            it('sets the link on the explore more button based on the url and the category tag', () => {
                const { button } = selectors;
                const expectedCategoryTag = testProps.tags[0].urlName;

                expect(
                    wrapper
                        .find(button)
                        .at(1)
                        .prop('href')
                ).to.eq(`/directory/${expectedCategoryTag}${testProps.listingUrl}`);
            });
        });

        describe(`listingType prop set to 'CardListing'`, () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        tags: listingsMock[0].tagsDetails,
                        category: 'furniture-and-interiors',
                        listingType: 'CardListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('does not render the featured tag', () => {
                const { featuredTag } = selectors;

                expect(wrapper.find(featuredTag).exists()).to.be.false;
            });

            it('renders 1 option button', () => {
                const { button } = selectors;

                expect(wrapper.find(button)).to.have.length(1);
            });

            it('renders the contact button as the first option button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .text()
                ).to.eq('Contact Info');
            });

            it('sets the correct props on the contact button', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props()
                ).to.include({
                    onClick: wrapper.instance().trackOpenAndToggleOverlay,
                    type: 'button'
                });
            });
        });

        describe("when listing type is any of 'StandardListing', 'EnhancedListing', 'PremiumListing'", () => {
            describe('and there is no tags array passed', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper(
                        {
                            title: listingsMock[0].title,
                            subtitle: listingsMock[0].subheading,
                            listingUrl: listingsMock[0].url,
                            previewImage: listingsMock[0].cardImage,
                            websiteAddress: listingsMock[0].webAddress,
                            emailAddress: listingsMock[0].emailAddress,
                            streetAddress: listingsMock[0].streetAddress,
                            phoneNumber: listingsMock[0].phoneNumber,
                            tags: [],
                            listingType: 'EnhancedListing'
                        },
                        { executeAction: sinon.stub() }
                    );
                });

                it('renders the component', () => {
                    expect(wrapper.isEmptyRender()).to.be.false;
                });

                it('sets the link on the explore more button based with the fallback string "category" and the url', () => {
                    const { button } = selectors;
                    const expectedCategoryTag = 'category';

                    expect(
                        wrapper
                            .find(button)
                            .at(1)
                            .prop('href')
                    ).to.eq(`/directory/${expectedCategoryTag}${testProps.listingUrl}`);
                });
            });
        });

        describe('previewImage prop not passed', () => {
            let wrapper;

            before(() => {
                filterErrors();

                [wrapper] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: null,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        category: listingsMock[0].category,
                        listingType: 'StandardListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.isEmptyRender()).to.be.true;
            });
        });

        describe('title prop not passed', () => {
            let wrapper;

            before(() => {
                filterErrors();

                [wrapper] = TestWrapper(
                    {
                        title: null,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        category: listingsMock[0].category,
                        listingType: 'StandardListing'
                    },
                    { executeAction: sinon.stub() }
                );
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.isEmptyRender()).to.be.true;
            });
        });
    });

    describe('state', () => {
        describe('when toggleOverlay sets showOverlay state to true', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        title: listingsMock[0].title,
                        subtitle: listingsMock[0].subheading,
                        listingUrl: listingsMock[0].url,
                        previewImage: listingsMock[0].cardImage,
                        websiteAddress: listingsMock[0].webAddress,
                        emailAddress: listingsMock[0].emailAddress,
                        streetAddress: listingsMock[0].streetAddress,
                        phoneNumber: listingsMock[0].phoneNumber,
                        category: listingsMock[0].category,
                        listingType: 'StandardListing'
                    },
                    { executeAction: sinon.stub() }
                );

                wrapper.instance().toggleOverlay({ preventDefault: sinon.stub() });
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('sets the showOverlay state to true', () => {
                expect(wrapper.state('showOverlay')).to.be.true;
            });

            it('renders the contact overlay', () => {
                const { contactOverlay } = selectors;

                expect(wrapper.find(contactOverlay).exists()).to.be.true;
            });

            it('renders the ContactCard component', () => {
                expect(wrapper.find(ContactCardStub).exists()).to.be.true;
            });

            it('passes the correct props to the ContactCard component', () => {
                expect(wrapper.find(ContactCardStub).props()).to.deep.eq({
                    classModifier: 'in-listing-card',
                    streetAddress: testProps.streetAddress,
                    phoneNumber: testProps.phoneNumber,
                    webAddress: testProps.websiteAddress,
                    emailAddress: testProps.emailAddress
                });
            });

            it('renders the overlay close button', () => {
                const { overlayClose } = selectors;

                expect(wrapper.find(overlayClose).exists()).to.be.true;
            });

            it('renders the close icon using the InlineSVG component', () => {
                const { overlayClose } = selectors;

                expect(
                    wrapper
                        .find(overlayClose)
                        .find(InlineSVGStub)
                        .exists()
                ).to.be.true;
            });

            it('passes the correct props through to the InlineSVG component', () => {
                const { overlayClose } = selectors;

                expect(
                    wrapper
                        .find(overlayClose)
                        .find(InlineSVGStub)
                        .props()
                ).to.include({
                    src: '/assets/svgs/x.svg',
                    className: 'listing-card__close-icon'
                });
            });

            it('renders the fallback image inside the InlineSVG component', () => {
                const { overlayClose } = selectors;

                expect(
                    wrapper
                        .find(overlayClose)
                        .find(InlineSVGStub)
                        .find('img')
                        .props()
                ).to.include({
                    src: '/assets/svgs/x.svg',
                    alt: 'Icon close cross'
                });
            });

            it('does not show the options', () => {
                const { options } = selectors;

                expect(wrapper.find(options).exists()).to.be.false;
            });
        });
    });
});
