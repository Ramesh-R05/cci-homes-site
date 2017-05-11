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
        Then I should see the top leaderboard ad above the gallery slide
        And I should not see the MREC ad at the bottom right of the gallery
        And I should see the MREC ad after the 3 slide
