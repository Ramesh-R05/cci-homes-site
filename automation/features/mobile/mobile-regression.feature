@devices
Feature: Users can navigate the site using a mobile device

    Scenario: Verify sticky ad on article page
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see the sticky ad when the top banner disappears from view
        And I should see 2 leaderboard ad slots
        And I should see 1 mrec ad slot beneath short teaser
        And I should see 1 mrec ad slot at the end of the body content

    Scenario: Ads on gallery page in the mobile view
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see 2 leaderboard ad slots
        * I should see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see MREC ad between images

