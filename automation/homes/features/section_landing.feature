@local @section-landing-ads @javascript
Feature: Section landing
    As the project owner
    I should see the ads on the section landing page
    So I can ensure that the site is generating revenue

    Scenario: Check all ad slots are visible on the section landing page
        Given I am on the "section" landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
