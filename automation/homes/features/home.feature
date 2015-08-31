@local @homepage @javascript
Feature: Homepage ads
    As the project owner
    I should see the ads on the homepage
    So I can ensure that the site is generating revenue

    @homepage-ads
    Scenario: Check all ad slots are visible on the homepage
        When I am on the homepage
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
