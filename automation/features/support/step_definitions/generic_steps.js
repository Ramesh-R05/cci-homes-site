const world = require('../world');
const loadMore = require('../page_objects/loadmore_widget');
import sectionPage from '../page_objects/section_page';
import { When, Given, Then } from 'cypress-cucumber-preprocessor/steps';

When(`I switch to {string} view`, breakpoint => {
    cy.resizeWindow(breakpoint);
});

Given(`I am currently viewing the homepage`, () => {
    cy.visit('/');
});

Given(`I am currently viewing {string}`, pageName => {
    cy.visit(`/${pageName}`);
});

When(`I scroll the page down`, function() {
    cy.scrollTo(0, 250);
});

When(`I scroll the page up`, function() {
    cy.scrollTo(0, 250);
});

When(/^I click on the Load More button$/, function() {
    const { loadMoreButton } = loadMore;

    cy.get(loadMoreButton)
        .scrollIntoView()
        .click();
});

Then(`I should see extra {int} teasers after loading more`, teaserCount => {
    const { sectionRepeatableSectionTeaserAfterLoadMore } = sectionPage;

    cy.get(sectionRepeatableSectionTeaserAfterLoadMore).then(teaserList => {
        expect(teaserList).to.have.length(teaserCount);
    });
});

// // module.exports = function() {
// //     //I switch to mobile|desktop|tablet view
// //     this.When(/^I switch to "([^"]*)" view$/, function(device) {
// //         var window = new window_handler(browser);
// //         window.windowResize(device);
// //     });

// //     this.Given(/^I am currently viewing the homepage$/, function() {
// //         var pageUrl = world.Urls.home_page;

// //         browser.url(pageUrl);
// //         browser.waitUntil(
// //             function() {
// //                 return browser.getUrl() === pageUrl;
// //             },
// //             20000,
// //             'home page never loaded',
// //             1000
// //         );
// //     });

// //     this.Given(/^I am currently viewing "([^"]*)"$/, function(pagename) {
// //         var pageUrl = world.Urls.home_page + pagename;

// //         browser.url(pageUrl);
// //         browser.waitUntil(
// //             function() {
// //                 return browser.getUrl() === pageUrl;
// //             },
// //             20000,
// //             `${pagename} never loaded`,
// //             10000
// //         );
// //     });

// //     this.When(/^I scroll the page down$/, function() {
// //         browser.scroll(0, 250);
// //     });

// //     this.When(/^I scroll the page up$/, function() {
// //         browser.scroll(250, 0);
// //     });
// };
