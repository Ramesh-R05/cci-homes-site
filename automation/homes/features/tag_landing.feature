@local @tag-landing-page @javascript
Feature: Tag Landing page
    As a user
    I want to view the content based on tag
    So that I can browser the content I enjoy

    @DHO-119 @DHO-231
    Scenario: Check heading, teasers and primary tag
        Given I am viewing a tag landing page
        Then I should see "FEATURE HOME" heading
        And I should see 20 teasers on the tag landing page
        And I should see "FEATURE HOME" as a primary tag on all teasers
        And I should be navigated to the "tags/feature-home" page in the current window after clicking any primary tag

    @DHO-119 @DHO-231
    Scenario: Check all ad slots are visible on the tag landing page
        When I switch to "desktop" view
        Given I am viewing a tag landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        When I switch to "tablet landscape" view
        Given I am viewing a tag landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        When I switch to "tablet portrait" view
        Given I am viewing a tag landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

        When I switch to "mobile" view
        Given I am viewing a tag landing page
        Then I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot

    @DHO-372 @manual @live
    Scenario: Check ad slots have the tag landing page
        Given I am on the "interiors?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Interior" as part of the ad targeting
        Given I am on the "home-tours?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting
        Given I am on the "outdoor?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Outdoor" as part of the ad targeting
        Given I am on the "renovate?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Renovate" as part of the ad targeting

        When I switch to "mobile" view
        Given I am on the "interiors?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Interior" as part of the ad targeting
        Given I am on the "home-tours?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting
        Given I am on the "outdoor?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Outdoor" as part of the ad targeting
        Given I am on the "renovate?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Renovate" as part of the ad targeting
