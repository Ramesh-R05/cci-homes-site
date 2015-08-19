@local @global-footer @javascript
Feature: The global footer should appear at the bottom of the page
    
    Scenario: Check the global footer is displayed correctly on Homepage
        Given I am on the homepage
        Then I should see the global footer
        And I should see the global footer heading "GET SOCIAL"
        And I should see the Privacy Policy, Advertise and Terms of Use links

    Scenario: Check the global footer is displayed correctly on section landing page
        Given I am on the "section" landing page
        Then I should see the global footer
        And I should see the global footer heading "GET SOCIAL"
        And I should see the Privacy Policy, Advertise and Terms of Use links
