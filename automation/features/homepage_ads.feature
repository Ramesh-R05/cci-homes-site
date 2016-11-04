 @homepage-ads @homes
Feature: Homes Homepage Ads
  As the project owner
  I should see the ads on the homepage
  So I can ensure that the site is generating revenue

  Scenario: check all ad slots are visible on the homepage
      Given I switch to "desktop" view
      When I am currently viewing the homepage
      And I should see leaderboard ad slots at top middle and bottom
      And I should see 2 mrec ad slots

      Given I switch to "tablet landscape" view
      When I am currently viewing the homepage
      And I should see leaderboard ad slots at top middle and bottom
      And I should see 2 mrec ad slots

      Given I switch to "tablet portrait" view
      When I am currently viewing the homepage
      And I should see leaderboard ad slots at top middle and bottom
      And I should see 2 mrec ad slots

      Given I switch to "mobile" view
      When I am currently viewing the homepage
      And I should see leaderboard ad slots at top middle and bottom
      And I should see 3 mrec ad slots
