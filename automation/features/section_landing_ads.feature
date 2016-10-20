#@section-landing-ads @dolly @cosmo
#Feature: Dolly Cosmo Section Landing Ads
#  As the project owner
#  I should see the ads on the section landing page
#  So I can ensure that the site is generating revenue
#
#  Scenario: check all ad slots are visible on the section landing page
#    Given I am currently viewing "fashion"
#    When I switch to "desktop" view
#    * I should see 2 leaderboard ad slots
#    * I should see 2 mrec ad slots
#    * I should see 1 middle leaderboard ad slots
#
#    When I switch to "tablet landscape" view
#      Given I am currently viewing "fashion"
#      * I should see 2 leaderboard ad slots
#      * I should see 2 mrec ad slots
#      * I should see 1 middle leaderboard ad slots
#
#      When I switch to "tablet portrait" view
#      Given I am currently viewing "fashion"
#      * I should see 2 leaderboard ad slots
#      * I should see 2 mrec ad slots
#      * I should see 1 middle leaderboard ad slots
#
#
#      When I switch to "mobile" view
#    Given I am currently viewing "fashion"
#    And I should see 1 leaderboard ad slots
#    And I should see 1 middle leaderboard ad slots
#    And I should see 1 mrec ad slots
#    And I should see 1 middle mrec ad slots
