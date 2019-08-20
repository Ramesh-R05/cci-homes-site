/* 
Scenario: Verify the tag landing page
  Given I switch to "mobile" view
  When I am currently viewing "tags/renovation"
  And I should see 6 top teasers on the feed section page
  Then I should see 6 bottom teasers on the feed section page
  When I click on the Load More button
  Then I should see extra 12 teasers after loading more
  And I should see a load more feed item containing its image and clickable to open its page
*/

describe('@sitAU verify the tag landing elements', () => {
    describe('in mobile view', () => {
        before('viewing tags/renovation', () => {});

        it('has a signup button with the correct text');
        it('has 6 top teasers');
        it('has 6 bottom teasers');
        it('has 12 exttra teasers after clicking load more');
    });
});
