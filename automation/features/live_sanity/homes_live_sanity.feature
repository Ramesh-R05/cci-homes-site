@smoketest
Feature: I have an automated smoke test for my live environments

    Scenario: check all ad slots are visible on the article page
        When I switch to "desktop" view
        Given I am currently viewing "do-you-know-your-aussie-architectural-styles-4610"
        *  I should see 2 leaderboard ad slots
        *  I should see 4 mrec ad slots in LHS feed

        When I switch to "tablet landscape" view
        Given I am currently viewing "how-to-design-a-house-that-cools-itself-4604"
        *  I should see 2 leaderboard ad slots
        *  I should see 4 mrec ad slots in LHS feed

        When I switch to "tablet portrait" view
        Given I am currently viewing "how-to-get-your-development-application-approved-4123"
        *  I should see 2 leaderboard ad slots
        *  I should see 1 mrec ad slot at the end of the body content

        When I switch to "mobile" view
        Given I am currently viewing "before-and-after-guest-bedroom-refresh-4617"
        *  I should see 2 leaderboard ad slots
        *  I should see 1 mrec ad slot beneath short teaser
        *  I should see 1 mrec ad slot at the end of the body content

