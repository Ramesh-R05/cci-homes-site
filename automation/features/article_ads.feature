 @articlepage-ads
Feature: Homes Article Ads
  As the project owner
  I should see the ads on the article page
  So I can ensure that the site is generating revenue
    @homes
  Scenario: check all ad slots are visible on the article page
      When I switch to "desktop" view
      Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
      *  I should see 1 top leaderboard ad slots
      *  I should see 1 bottom leaderboard ad slots
      *  I should see 2 mrec ad slots in LHS feed

    When I switch to "tablet landscape" view
    Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
    *  I should see 1 top leaderboard ad slots
    *  I should see 1 bottom leaderboard ad slots
    *  I should see 2 mrec ad slots in LHS feed

    When I switch to "tablet portrait" view
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        *  I should see 1 top leaderboard ad slots
        *  I should see 1 bottom leaderboard ad slots

        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        *  I should see 1 top mobile banner ad slots under short teaser
        *  I should see 1 bottom leaderboard ad slots above recommendation
