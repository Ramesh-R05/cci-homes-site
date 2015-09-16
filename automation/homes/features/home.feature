@local @homepage @javascript
Feature: Homepage ads
    As the project owner
    I should see the ads on the homepage
    So I can ensure that the site is generating revenue

    @homepage-ads
    Scenario: Check all ad slots are visible on the homepage
        Given I am on the homepage
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        # Ads have different placements on mobile
        When I switch to "mobile" view
        And I am on the homepage
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
    
    @DHO-115
    Scenario: Check gallery of galleries on the homepage
        Given I am on the homepage
        Then I should see 5 galleries in the gallery of galleries
        And I click on the previous icon
        Then I should see the "6 outdoor rooms that get the balance right" gallery
        And I click on the next icon
        Then I should see the "Gallery: Kimberly and Stephen's Byron Bay beach house" gallery
        And I click on the gallery image
        Then I should be redirected to the specific gallery page
