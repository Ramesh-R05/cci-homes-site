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

    @mobile
    Scenario: Verify the ads on AMP enabled page
        Given I am currently viewing "amp/amp-article-4100"
        * I should see the top leaderboard ad under hero image on AMP page
#        * I should see first MREC in the body on AMP page #disable until BXMA-1333 is fixed
#        * I should see second MREC in the body on AMP page #disable until BXMA-1333 is fixed
#        * I should see the sticky bottom leaderboard on AMP page #disable until we find a root cause why the sticky bottom leaderboard doesn't appear in Browser Stack on homes-site

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




