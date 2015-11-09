@local @brand-listing @javascript
Feature: Brand Listing page
    As a user
    I want to view the content based on brand
    So that I can browser the content I enjoy

    @DHO-130 @DHO-132
    Scenario: Check teasers, subscribe now and social shares
        Given I am viewing a brand listing page
        Then I should see "Australian House and Garden" logo
        And I should see 12 teasers on the page
        And I should see the Subscribe image link redirected to the magshop in the current window
        And I should see the Subscribe title link redirected to the magshop in the current window
        And I should see the Facebook link opens in a new window
        And I should see the Instagram link opens in a new window
        And I should see the Pinterest link opens in a new window
        And I should not see the Twitter link  

    @DHO-76 @brand-listing-ads
    Scenario: Check all ad slots are visible on the brand listing page
        Given I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        
        When I switch to "tablet landscape" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        When I switch to "tablet portrait" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        When I switch to "mobile" view
        And I am viewing a brand listing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot