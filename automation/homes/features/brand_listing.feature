@local @brand-listing @javascript
Feature: Brand Listing page
    As a user
    I want to view the content based on brand
    So that I can browser the content I enjoy

    @DHO-76 @brand-listing-ads
    Scenario: Check all ad slots are visible on the brand listing page
        Given I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 2 "ad--section-mrec" ad slot

        When I switch to "tablet landscape" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 2 "ad--section-mrec" ad slot

        When I switch to "tablet portrait" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 2 "ad--section-mrec" ad slot

        When I switch to "mobile" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 2 "ad--section-mrec" ad slot
