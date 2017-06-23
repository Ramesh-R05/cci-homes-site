@ad @homes
Feature: Ads
    As a user
    I should be able to see the relevant Ads on the site

# -------- Sticky Mobile banner on homepage is high priority for mobile device ---------------
# -------- Sticky Mobile banner on brand and section page is low priority for mobile device ---------------
    @DAW-1070 @BXMA-498 @must
    Scenario Outline: Add sticky mobile banner to bottom of the <page>
        Given I switch to "mobile portrait" view
        When I am currently viewing "<pageUrl>"
        Then I can see the sticky ad when the top banner disappears from view
        @high
        Examples:
            |page              |pageUrl                                               |
            |homepage          |                                                      |
            |article           |automation-test-article-with-hero-image-3193          |
            |gallery           |automation-test-gallery-3201                          |
        @low
        Examples:
            |page              |pageUrl                                               |
            |tag section       |tags/luxury-home/                                     |
            |navigation section|real-homes                                            |
            |brand             |australian-house-and-garden                           |

    @high @BXMA-499
    Scenario Outline: Add sticky bottom leaderboard to bottom of the <page>
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        Then I can see the sticky ad when the top banner disappears from view
        @high
        Examples:
            |page              |pageUrl                                               |
            |homepage          |                                                      |
            |article           |automation-test-article-with-hero-image-3193          |
            |gallery           |automation-test-gallery-3201                          |
        @low
        Examples:
            |page              |pageUrl                                               |
            |tag section       |tags/luxury-home/                                     |
            |navigation section|real-homes                                            |
            |brand             |australian-house-and-garden                           |

# -------- Auto refresh is high priority for desktop ---------------

    @BXMA-406 @high
    Scenario: Ads will autorefresh on article page
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see last RHR ad is sticky
        And the sticky ad will auto refresh every 6 seconds when is in View
#       And after 15 seconds the page will go idle and the add will no refresh anymore # This is tested manually

# -------- Gallery Page Ads on desktop and mobile are High as this is an area with Commercial Value ---------------

    @gallery
    Scenario Outline: Ads on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see four MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
        * I should see MREC ad between images
        @high
        Examples:
            | device  |
            | desktop |
        @med
        Examples:
            | device            |
            | tablet landscape  |

    @gallery @med
    Scenario: Ads on gallery page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image
        * I should see MREC ad between images

    @gallery @high
    Scenario: Ads on gallery page in the mobile view
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see MREC ad between images

# -------- Brand Landing Page Ads on desktop and mobile are High as this is an area with Commercial Value ---------------

    @BXMS-12
    Scenario Outline: Ads on brand landing page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "australian-house-and-garden"
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed on the brand page
        * I should see sticky MREC ad next to the bottom news feed
        @high
        Examples:
            | device  |
            | desktop |
        @med
        Examples:
            | device            |
            | tablet landscape  |

    @BXMS-12 @high
    Scenario: Ads on brand landing page in the <device> view
        Given I switch to "mobile" view
        When I am currently viewing "australian-house-and-garden"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see 2 mrec ad slots

    @med
    Scenario: Ads on brand landing page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "australian-house-and-garden"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see 4 mrec ad slots

# -------- Wall Paper Ads are High as this is an area with Commercial Value ---------------

    @BXMA-107 @high
    Scenario: Wallpaper and side panel ad should appear on "brand" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "homes-plus"
        * I should "see" the wallpaper ad slot on "brand"
        When I am currently viewing "belle"
        * I should "see" the left and right side ad slot on "brand"

# -------- Inskin Ads on desktop and tablet are Manual ---------------

    @BXMA-107 @manual @chrome
    Scenario Outline: Out of page (Inskin) ad should appear on "<page>" page in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "<url>"
        * I should "see" the out of page ad slot on "<page>"

        Examples:
            | device             | page       | url            |
            | desktop            | brand      | real-living/   |

        Examples:
            | device             | page       | url            |
            | tablet landscape   | brand      | real-living/   |
            | tablet portrait    | brand      | real-living/   |

# -------- Homepage Ads on desktop and mobile are High as this is an area with Commercial Value ---------------

    @BXMS-108
    Scenario Outline: Ads on homepage in the <device> view
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed on the homepage
        * I should see sticky MREC ad next to the bottom news feed on the homepage
        And I click on the Load More button
        Then I should see sticky MREC on the new feed

    @high
        Examples:
            | device  |
            | desktop |
    @med
        Examples:
            | device            |
            | tablet landscape  |


    @BXMS-108
    Scenario Outline: Ads on homepage in the <device> view
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        And I should see leaderboard ad slots at top middle and bottom
        And I should see <number> mrec ad slots
        And I click on the Load More button
        And I should see <2ndCount> mrec ad slots

    @high
        Examples:
            | device            | number | 2ndCount |
            | mobile            | 2      | 3        |

    @med
        Examples:
            | device            | number | 2ndCount |
            | tablet portrait   | 4      | 6        |

# -------- Section Page Ads on desktop and mobile are High as this are areas with Commercial Value ---------------

    @BXMS-129
    Scenario Outline: Ads on section landing page in the <desktop> view
        Given I switch to "<device>" view
        When I am currently viewing "real-homes"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see <number> mrec ad slots
        When I click on the Load More button
        And I should see <second count> mrec ad slots

    @high
        Examples:
            | device            | number | second count |
            | mobile            | 2      | 3            |
    @med
        Examples:
            | device            | number | second count |
            | tablet portrait   | 4      | 6            |

    @BXMS-129
    Scenario Outline: Ads on section landing page in the <desktop> view
        Given I switch to "<device>" view
        When I am currently viewing "real-homes"
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed on the section page
        * I should see sticky MREC ad next to the bottom news feed on the section page
        When I click on the Load More button
        Then I should see <second count> mrec ad slots

    @high
        Examples:
            | device        | second count |
            | desktop       | 3            |
    @med
        Examples:
            | device            | second count |
            | tablet landscape  | 3            |
