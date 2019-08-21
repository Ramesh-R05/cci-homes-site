/* 
Scenario: I can see the 404 error page in the mobile style
  Given I switch to "mobile" view
  When I am currently viewing "404"
  * I should see the error title as "Oops! We're sorry!"
  * I should see the site header logo to open homepage
*/

describe('@sitAU error page elements', () => {
    describe('in mobile view', () => {
        it('has a header linking to the home page');
        it('has the correct error title');
    });
});
