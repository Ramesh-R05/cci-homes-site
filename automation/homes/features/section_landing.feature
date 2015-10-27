@local @section-landing @javascript
Feature: Section landing
    As a user
    I want to view the content based on navigation tag
    So that I can browser the content I enjoy
    
    Scenario: Check heading and teasers
        Given I am on a section landing page
        Then I should see "HOME TOURS" heading
        Then I should see 20 teasers

    Scenario: Check gallery of galleries on the section landing page
        Given I am on a section landing page
        Then I should see 5 galleries in the gallery of galleries
        And I click on the previous icon
        Then I should see the "6 outdoor rooms that get the balance right" gallery
        And I click on the next icon
        Then I should see the "Gallery: Kimberly and Stephen's Byron Bay beach house" gallery
        And I click on the gallery image
        Then I should be redirected to the specific gallery page

    @section-landing-ads
    Scenario: Check all ad slots are visible on the section landing page
        When I switch to "desktop" view
        Given I am on a section landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot

        When I switch to "tablet landscape" view
        And I am on a section landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot

        When I switch to "tablet portrait" view
        And I am on a section landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot

        When I switch to "mobile" view
        And I am on a section landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot