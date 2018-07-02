Feature: Users can navigate the site using different device

    @mobile
    Scenario: Ads on article page in different devices
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I can see the sticky ad when the top banner disappears from view

    @mobile
    Scenario: Ads on gallery page in different devices
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation

    @browser
    Scenario: Ads on article page in different browsers
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad slot above the footer

    @browser
    Scenario: Ads on gallery page in different browsers
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad slot above the footer




