@local @power-by @javascript
Feature: Product team can expose brands better

    @DAW-1078
    Scenario: Check the brands are displayed correctly on the site
        Given I am on the homepage
        Then I should see Belle, Real Living, Homes+ and House & Garden links redirected
        Given I am on the "section" landing page
        Then I should see Belle, Real Living, Homes+ and House & Garden links redirected to the brand page in the current window
        Given I am viewing an article
        Then I should see Belle, Real Living, Homes+ and House & Garden links redirected to the brand page in the current window

    Scenario: Check the brands are displayed correctly on the hamburger menu
        Given I am on the homepage
        When I click on the hamburger menu
        Then I should see Belle, Real Living, Homes+ and House & Garden links in the hamburger
