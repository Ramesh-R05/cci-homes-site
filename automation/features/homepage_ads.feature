 @homepage-ads @homes
Feature: Homes Homepage Ads
  As the project owner
  I should see the ads on the homepage
  So I can ensure that the site is generating revenue

  Scenario: check all ad slots are visible on the homepage
      Given I am currently viewing the homepage
      When I switch to "desktop" view
      And I should see 1 "leaderboard" and "midLeaderBoard" and "bottomLeaderBoard" ad slots
      And I should see 2 mrec ad slots


    When I switch to "tablet landscape" view
    And I am currently viewing the homepage
      And I should see 1 "leaderboard" and "midLeaderBoard" and "bottomLeaderBoard" ad slots
      And I should see 2 mrec ad slots


    When I switch to "tablet portrait" view
    And I am currently viewing the homepage
      And I should see 1 "leaderboard" and "midLeaderBoard" and "bottomLeaderBoard" ad slots
      And I should see 2 mrec ad slots


      When I switch to "mobile" view
    And I am currently viewing the homepage
      And I should see 1 "leaderboard" and "midLeaderBoard" and "bottomLeaderBoard" ad slots
      And I should see 2 mrec ad slots
