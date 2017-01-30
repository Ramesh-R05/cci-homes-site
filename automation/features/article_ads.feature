 @articlepage-ads @homes
Feature: Homes Article Ads
  As the project owner
  I should see the ads on the article page
  So I can ensure that the site is generating revenue
  @high
  Scenario: check all ad slots are visible on the article page
      When I switch to "desktop" view
      Given I am currently viewing "automation-test-article-with-hero-image-3193"
        *  I should see 2 leaderboard ad slots
        *  I should see 4 mrec ad slots in LHS feed

    When I switch to "tablet landscape" view
    Given I am currently viewing "automation-test-article-with-hero-image-3193"
        *  I should see 2 leaderboard ad slots
        *  I should see 4 mrec ad slots in LHS feed

    When I switch to "tablet portrait" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        *  I should see 2 leaderboard ad slots
        *  I should see 1 mrec ad slot at the end of the body content

    When I switch to "mobile" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        *  I should see 2 leaderboard ad slots
        *  I should see 1 mrec ad slot beneath short teaser
        *  I should see 1 mrec ad slot at the end of the body content

