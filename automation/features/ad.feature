@ad @homes
Feature: Ad
    As a user
    I should be able to see the relevant Ads on the site

    @DAW-1070
    Scenario: Add sticky mobile banner to bottom of the article
        Given I switch to "mobile portrait" view
        When I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        Then I can see the sticky ad when the top banner disappears from view
