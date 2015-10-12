@local @global-footer @javascript
Feature: The global footer should appear at the bottom of the page
    
    @DHO-35 @DHO-217 @DHO-360
    Scenario: Check the global footer is displayed correctly on Homepage
        Given I am on the homepage
        Then I should see the global footer
        And I should see the Facebook, Twitter and Instagram links open in a new window
        And I should see the newsletter sign up
        And I should see subscribe image and button links to "https://www.magshop.com.au/store/homestolove" in a new window
        And I should see Belle, Real Living, Homes+ and House & Garden links redirected to the brand page in the current window
        And I should see the Privacy Policy, Advertise and Terms of Use links open in a new window
    
    @DHO-35 @DHO-217 @DHO-360
    Scenario: Check the global footer is displayed correctly on section landing page
        Given I am on the "section" landing page
        Then I should see the global footer
        And I should see the Facebook, Twitter and Instagram links open in a new window
        And I should see the newsletter sign up
        And I should see subscribe image and button links to "https://www.magshop.com.au/store/homestolove" in a new window
        And I should see Belle, Real Living, Homes+ and House & Garden links redirected to the brand page in the current window
        And I should see the Privacy Policy, Advertise and Terms of Use links open in a new window

    @DHO-218 @DHO-217 @DHO-360
    Scenario: Check the global footer is displayed correctly on article page
        Given I am viewing an article
        Then I should see the global footer
        And I should see the newsletter sign up
        And I should see Belle, Real Living, Homes+ and House & Garden links redirected to the brand page in the current window
        And I should see the Privacy Policy, Advertise and Terms of Use links open in a new window
