Feature: Users can navigate the site using different device

    @mobile
    Scenario: Ads on article page in different devices
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see the long title "Long Title Long Title EOM"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I can see the sticky ad when the top banner disappears from view

    @mobile
    Scenario: Ads on gallery page in different devices
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        #* I should see MREC ad between images #This step is disabled because the result is inconsistent and this step has been covered in regression test

    @browser
    Scenario: Ads on article page in different browsers
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see the long title "Long Title Long Title EOM"
        * I should see the top leaderboard ad under navigation
        * I should see four MREC ads in the RHR feed

    @browser
    Scenario: Ads on gallery page in different browsers
        Given I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see four MREC ads in the RHR feed




