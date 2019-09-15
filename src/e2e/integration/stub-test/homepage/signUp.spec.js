// Scenario Outline: Verify the sign-up URL on homepage in <device> view
//         Given I switch to "<device>" view
//         When I am currently viewing the homepage
//         Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url in "<device>" view
//         @med
//         Examples:
//             | device            |
//             | desktop           |
//             | mobile            |

import home from '../../../support/pageObjects/homepageWidget';

const devices = ['mobile', 'desktop'];
devices.forEach(device => {
    describe(`@stub @high Verify the sign-up URL on homepage in ${device} view`, () => {
        describe(`in ${device} view`, () => {
            before(() => {
                cy.resizeWindow(device).visit('/');
            });

            afterEach(() => {
                cy.resizeWindow(device);
            });

            it('loads', () => {
                cy.url().should('contain', '/');
            });

            it('has a signup button with the correct text', () => {
                cy.get(home.newsletterSignUpBtn).should('have.attr', 'href', 'https://www.homestolove.com.au/homes-newsletter/');
            });
        });
    });
});
