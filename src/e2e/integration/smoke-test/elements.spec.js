/* 
Scenario: Verify the homepage
    Given I switch to "mobile" view
    When I am currently viewing the homepage
    Then I should see the sign up button containing "https://www.homestolove.com.au/homes-newsletter/" url in "mobile" view
    And The homepage hero image should be clickable to open its page
    And I should see a "top" feed item containing its image and clickable to open its page
    And I should see a "bottom" feed item containing its title and clickable to open its page
    When I click on the Load More button
    Then I should see extra 12 teasers after loading more
    And I should see a load more feed item containing its image and clickable to open its page 
*/

import home from '../../support/pageObjects/homepageWidget';
import loadMore from '../../support/pageObjects/loadmoreWidget';

describe('@sitAU verify the homepage elements', () => {
    describe('in mobile view', () => {
        before(() => {
            cy.resizeWindow('mobile').visit('/');
        });

        afterEach(() => {
            cy.resizeWindow('mobile');
        });

        it('has a signup button with the correct text', () => {
            cy.get(home.newsletterSignUpBtn).should('have.attr', 'href', 'https://www.homestolove.com.au/homes-newsletter/');
        });

        it('has 9 top teasers', () => {
            cy.get(home.topTeasers)
                .as('topTeasers')
                .its('length')
                .should('eq', 9);

            cy.get('@topTeasers').each(teaser => {
                cy.getTeaserElements(teaser).then(({ teaserImage, teaserTitle, teaserSource }) => {
                    cy.get(teaserImage)
                        .invoke('attr', 'srcset')
                        .validateImageUrl();

                    cy.get(teaserTitle)
                        .invoke('text')
                        .should('not.eq', '');

                    cy.get(teaserSource)
                        .its('src')
                        .should('not.eq', '');
                });
            });
        });

        it('has 6 bottom teasers', () => {
            cy.get(home.bottomTeasers)
                .its('length')
                .should('eq', 6);
        });

        it('has load more button that is clickable', () => {
            cy.get(loadMore.loadMoreButton).click();
        });
    });
});
