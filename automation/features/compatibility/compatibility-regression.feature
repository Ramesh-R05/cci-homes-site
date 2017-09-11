Feature: Users can navigate the site using different device
    @mobile @browser
    Scenario: Verify sticky ad on article page
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see the long title "Long Title Long Title EOM"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I can see the sticky ad when the top banner disappears from view

    @mobile @browser
    Scenario: Ads on gallery page in the different device view
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images

    @browser
    Scenario: Ads on gallery page should not show MREC ad under hero image in browser view
        Given I am currently viewing "automation-test-gallery-3201"
        * I should not see MREC ad under the hero image

    @mobile
    Scenario: Ads on gallery page should not show MREC ad under hero image in mobile view
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see MREC ad under the hero image
