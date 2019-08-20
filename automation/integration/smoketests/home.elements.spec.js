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

describe('@sitAU verify the homepage elements', () => {
    describe('in mobile view', () => {
        it('has a signup button with the correct text');
        it('has 6 top teasers');
        it('has 6 bottom teasers');
        it('has 12 exttra teasers after clicking load more');
    });
});



