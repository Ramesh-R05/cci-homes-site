@local @homepage @javascript
Feature: Homepage ads
    As the project owner
    I should see the ads on the homepage
    So I can ensure that the site is generating revenue

    Scenario: Check teasers and source link
        Given I am on the homepage
        And I should see 30 teasers on the homepage
        And I should see "AUSTRALIAN HOUSE AND GARDEN" link redirected to the brand listing page in the current window

    @crossbrowser @manual
    Scenario: Check all ad slots are visible on the homepage
        When I switch to "desktop" view
        Given I am on the homepage
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I can scroll bottom ad into view
        Then I should see 1 "ad--section-bottom-leaderboard" ad slot

    @homepage-ads
    Scenario: Check all ad slots are visible on the homepage
        Given I am on the homepage
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 3 "ad--section-mrec" ad slot

        # Ads have different placements on mobile
        When I switch to "mobile" view
        And I am on the homepage
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        #And I should see 3 "ad--section-mrec" ad slot

    @DHO-115 @desktop
    Scenario: Check gallery of galleries on the homepage
        Given I am on the homepage
        Then I should see 5 galleries in the gallery of galleries
        And I click on the previous icon
        Then I should see the "6 outdoor rooms that get the balance right" gallery
        And I click on the next icon
        Then I should see the "Gallery: Kimberly and Stephen's Byron Bay beach house" gallery
        And I click on the gallery image
        Then I should be redirected to the specific gallery page

    @testAdverts
    Scenario: Check non Live Environment has the test advert configuration
        Given I am on the homepage
        And Wait for 2 seconds for the results to load on the page
        * I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is present

    @testAdverts @manual @live
    Scenario: Check Live Environment has the test advert configuration
        Given I am on the homepage
        * I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present
