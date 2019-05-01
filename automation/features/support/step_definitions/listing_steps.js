import listing from '../page_objects/listing_widget';
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');

function getSelectorFromSection(section) {
  const {
    fullWidthGallerySection,
    companyProfileSection,
    productSection,
    galleryLinkSection,
    testimonialSection,
    featuredArticleSection, 
    contactSection
  } = listing;


  return {
    'full-width-gallery': fullWidthGallerySection,
    'company-profile': companyProfileSection,
    'product': productSection,
    'gallery-link': galleryLinkSection,
    'testimonial': testimonialSection,
    'featured-article': featuredArticleSection,
    'contact': contactSection
  }[section]
}

module.exports = function() {

    this.When(/^I scroll to the "([^"]*)" section$/, (section) => {
        const currentSection = getSelectorFromSection(section);
        
        browser.scroll(currentSection);
        wait(3000);
        expect(browser.waitForVisible(currentSection)).toBe(true);
    });

    this.Then(/^I can see the mixed media gallery with (\d+) items$/, (imageCount, section) => {
      const { mediaSlider, fullWidthGallerySection } = listing;

    });

    this.Then(/^I can see the scroll down button clickable to the next section$/, () => {
      const { fullWidthGallerySection, scrollDownButton, companyProfileSection } = listing;

      browser.$(fullWidthGallerySection).$(scrollDownButton).click();
      expect(browser.waitForVisible(companyProfileSection, 5000)).toBe(true);
    });

    this.Then(/^I can see an image gallery with (\d+) items in the "([^"]*)" section$/, (itemCount, section) => {
      const { imageGallery, imageGallerySlide } = listing;
      
      const currentSection = getSelectorFromSection(section);
      const galleryElement = browser.$(currentSection).$(imageGallery);
      const gallerySlides = galleryElement.$$(imageGallerySlide);

      expect(galleryElement.waitForVisible(5000)).toBe(true);
      expect(gallerySlides.length).toEqual(parseInt(itemCount, 10));

      gallerySlides.forEach(slide => {
        const image = slide.$('img');
        expect(image.getAttribute('srcset')).not.toEqual("");
      });

    });

    this.Then(/^I can see a button with the gallery name "([^"]*)"$/, (galleryName) => {
      const { galleryLinkSection, galleryModalButton } = listing;

      const modalTrigger = browser.$(galleryLinkSection).$(galleryModalButton);

      expect(modalTrigger.isVisible()).toBe(true);
      expect(modalTrigger.getText()).toEqual(galleryName);
    });

    this.When(/^I click on the button with the gallery name "([^"]*)"$/, function (galleryName) {
      const { galleryLinkSection, galleryModalButton } = listing;

      const modalTrigger = browser.$(galleryLinkSection).$(galleryModalButton);

      modalTrigger.getText() === galleryName && modalTrigger.click();
    });

    this.Then(/^I "([^"]*)" see the gallery modal$/, function (expectedVisibility) {
      const { galleryModal } = listing;

      const isVisible = {
        'can': true,
        'cannot': false
      }[expectedVisibility];

      expect(browser.$(galleryModal).isVisible()).toBe(isVisible);
    });

    this.Then(/^I can see the title of the gallery equal to "([^"]*)"$/, (galleryTitle) => {
        const { galleryModal, galleryModalTitle } = listing;

        expect(browser.$(galleryModal).$(galleryModalTitle).getText()).toEqual(galleryTitle);
    });

    
    this.Then(/^I can see (\d+) images from the gallery in the modal$/, function (imageCount) {
      const { galleryModal, galleryModalImageWrapper, galleryModalImage } = listing;
      const galleryImages = browser.$(galleryModal).$$(galleryModalImageWrapper);

      expect(galleryImages.length).toEqual(parseInt(imageCount, 10));
      
      galleryImages.forEach((imgWrapper, imageNo) => { 
        browser.selectorExecute([imgWrapper.selector], (wrapper, index) => wrapper[index].scrollIntoView(true), imageNo);
        
        const imageElement = imgWrapper.$(galleryModalImage);
        expect(imageElement.waitForVisible(5000)).toBe(true);  
        expect(imageElement.getAttribute('srcset')).not.toEqual("");
      })
    });
    
    this.Then(/^I can still see the gallery modal sticky header in view$/, () => {
      const { galleryModal, galleryModalHeader} = listing;

      expect(browser.$(galleryModal).$(galleryModalHeader).isVisible()).toBe(true);
    });

    this.When(/^I close the gallery modal$/, () => {
      const { galleryModal, galleryModalHeader, modalClose } = listing
      
      const closeButton = browser.$(galleryModal).$(galleryModalHeader).$(modalClose);

      closeButton.click();
    });

    this.Then(/^I can see the brand logo with the source equal to "([^"]*)" and clickable to the website url "([^"]*)"$/, (sourceUrl, brandLink) => {
      const {companyProfileSection, brandLogoImg} = listing;

      const url = browser.$(companyProfileSection).$(brandLogoImg).getAttribute('href');
      const imageSource = browser.$(companyProfileSection).$(brandLogoImg).getAttribute('src');

      expect(url).not.toEqual("")
      expect(imageSource).not.toEqual("")
      expect(browser.$(brandLogoImg).isVisible()).toBe(true)
    });

    this.Then(/^I can navigate to all the social media accounts in "([^"]*)" section$/, (section, dataTable) => {
      const { facebookIcon, twitterIcon, pinterestIcon, instagramIcon } = listing;
      
      const currentSection = getSelectorFromSection(section)
      const socials = dataTable.hashes();

      socials.forEach(({title, url}) => {
        const iconElement = {
          'instagram' : browser.$(currentSection).$(instagramIcon),
          'facebook' : browser.$(currentSection).$(facebookIcon),
          'twitter' : browser.$(currentSection).$(twitterIcon),
          'pinterest' : browser.$(currentSection).$(pinterestIcon),
        }[title]

        expect(iconElement.isVisible()).toBe(true);
        expect(iconElement.$('a').getAttribute('href')).toEqual(url);
      })      
    });

    this.Then(/^I can see the summary subheading equal to "([^"]*)"$/, (summaryTitle) => {
      const {companyProfileSection, summary, summarySubheading} = listing; 

      const summarySubheadingEl = browser.$(companyProfileSection).$(summary).$(summarySubheading);

      expect(summarySubheadingEl.isVisible()).toBe(true);
      expect(summarySubheadingEl.getText()).toEqual(summaryTitle);
    });

    this.Then(/^I can see the address equal to "([^"]*)"$/, (address) => {
      const {companyProfileSection, summary, summaryAddress} = listing;
      const summaryAddressEl = browser.$(companyProfileSection).$(summary).$(summaryAddress);

      expect(summaryAddressEl.isVisible()).toBe(true);
      expect(summaryAddressEl.getText()).toEqual(address);
    });
    
    this.Then(/^I can see summary copy starting with "([^"]*)"$/, (summaryText) => {
      const {companyProfileSection, summary, summaryCopy} = listing;
      const summaryCopyEl = browser.$(companyProfileSection).$(summary).$(summaryCopy);

      expect(summaryCopyEl.isVisible()).toBe(true);
      expect(summaryCopyEl.getText().includes(summaryText)).toBe(true);
    });

    this.Then(/^I can see title equal to "([^"]*)" on "([^"]*)" section$/, (titleText, section) => {
      const { heading } = listing;      
      const currentSection = getSelectorFromSection(section);
      const sectionTitle = browser.$(currentSection).$(heading).getText();

      expect(sectionTitle).toEqual(titleText);

    });

    this.Then(/^I can see (\d+) products with links to purchase$/, (productCount) => {
      const {productSection, productCard} = listing;

      const products = browser.$(productSection).$$(productCard);

    });

    this.Then(/^I can see 3 testimonial cards with all of the content$/, () => {
      const { testimonialSection, testimonialCard } = listing;

      const testimonials = browser.$$(testimonialSection).$(testimonialCard).forEach(card => {
        // assert here;

      });
    });

    this.Then(/^I can see the featured article title equal to "([^"]*)"$/, (featuredTitle) => {
      const { featuredArticleSection, featuredArticleCard, featuredArticleCardTitle } = listing;

      expect(browser.$(featuredArticleSection).$(featuredArticleCard).$(featuredArticleCardTitle).getText()).toEqual(featuredTitle)

    });
    
    this.Then(/^I can see the featured article summary starting with "([^"]*)"$/, (summaryText) => {
      const { featuredArticleSection, featuredArticleCard, featuredArticleCardSummary } = listing;
      const summaryEl = browser.$(featuredArticleSection).$(featuredArticleCard).$(featuredArticleCardSummary);

      expect(summaryEl.isVisible()).toBe(true);
      expect(summaryEl.getText().includes(summaryText)).toBe(true);
    });
    
    this.Then(/^I can see the featured article source equal to "([^"]*)" and date equal to "([^"]*)"$/, (featuredSource, featuredDate) => {
      const { featuredArticleSection, featuredArticleCard, featuredArticleCardSource, featuredArticleCardDateCreated } = listing;

      expect(browser.$(featuredArticleSection).$(featuredArticleCard).$(featuredArticleCardSource).getText()).toEqual(featuredSource);
      expect(browser.$(featuredArticleSection).$(featuredArticleCard).$(featuredArticleCardDateCreated).getText()).toEqual(featuredDate);
    });

    this.Then(/^I can see the button clickable to the featured article with url "([^"]*)"$/, (articleUrl) => {
      const { featuredArticleSection, featuredArticleCard, featuredArticleCardLinkButton } = listing;
      const buttonElement = browser.$(featuredArticleSection).$(featuredArticleCard).$(featuredArticleCardLinkButton);
      
      expect(buttonElement.isVisible()).toBe(true);
      expect(buttonElement.getAttribute('href').includes(articleUrl)).toBe(true);
    });

    this.Then(/^I can see the title equal to "([^"]*)" and subtitle equal to "([^"]*)"$/, (title, subtitle) => {
      const { contactSection, contactHeading, contactSubheading } = listing;

      expect(browser.$(contactSection).$(contactHeading).isVisible());
      expect(browser.$(contactSection).$(contactHeading).getText()).toEqual(title);
      expect(browser.$(contactSection).$(contactSubheading).isVisible());
      expect(browser.$(contactSection).$(contactSubheading).getText()).toEqual(subtitle);

    })

    this.Then(/^I can see the contact form with all fields and submit button$/, () => {
      const { contactSection, contactForm, contactEmailField, contactMessageField, contactSubmitButton } = listing;

      expect(browser.$(contactSection).$(contactForm).$(contactEmailField).isVisible()).toBe(true)
      expect(browser.$(contactSection).$(contactForm).$(contactMessageField).isVisible()).toBe(true)
      expect(browser.$(contactSection).$(contactForm).$(contactSubmitButton).isVisible()).toBe(true)
    });

    this.Then(/^I can see the contact details equal to$/, dataTable => {
      const {
          contactSection,
          contactCardWebAddress,
          contactCardStreetAddress,
          contactCardPhone,
          contactCardText,
          contactCardLink,
          contactCardWebAddressIcon,
          contactCardStreetAddressIcon,
          contactCardPhoneIcon
      } = listing;
  
      const contactDetails = dataTable.hashes();
  
      contactDetails.forEach(({ title, content }) => {
          const { text, icon } = {
              website: {
                  text: browser
                      .$(contactSection)
                      .$(contactCardWebAddress)
                      .$(contactCardLink),
                  icon: browser
                      .$(contactSection)
                      .$(contactCardWebAddress)
                      .$(contactCardWebAddressIcon)
              },
              address: {
                  text: browser.$(contactSection).$(contactCardStreetAddress).$(contactCardText),
                  icon: browser
                      .$(contactSection)
                      .$(contactCardWebAddress)
                      .$(contactCardStreetAddressIcon)
              },
              phone: {
                  text: browser.$(contactSection).$(contactCardPhone).$(contactCardText),
                  icon: browser
                      .$(contactSection)
                      .$(contactCardWebAddress)
                      .$(contactCardPhoneIcon)
              }
          }[title];
  
          expect(text.getText().includes(content)).toBe(true);
          expect(text.isVisible()).toBe(true);
          expect(icon.isVisible()).toBe(true);
      });
  });
  

    
};

