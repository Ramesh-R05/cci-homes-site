@ad @homes
Feature: Ads
    As a user
    I should be able to see the relevant Ads on the site

    @DAW-1070 @high
    Scenario: Add sticky mobile banner to bottom of the article
        Given I switch to "mobile portrait" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I can see the sticky ad when the top banner disappears from view

    Scenario Outline: Ads on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad above the gallery slide
        * I should see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide
        @high
        Examples:
            | device  |
            | desktop |
        @med
        Examples:
            | device            |
            | tablet landscape  |

    Scenario Outline: Ads on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad above the gallery slide
        * I should not see the MREC ad at the bottom right of the gallery
        * I should see the MREC ad after the 3 slide
        @high
        Examples:
            | device            |
            | mobile portrait   |
        @med
        Examples:
            | device            |
            | mobile            |
            | tablet portrait   |

    @BXMS-12
    Scenario Outline: Ads on brand landing page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "australian-house-and-garden"
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed
        * I should see sticky MREC ad next to the bottom news feed
        @high
        Examples:
            | device  |
            | desktop |
        @med
        Examples:
            | device            |
            | tablet landscape  |

    @BXMS-12
    Scenario Outline: Ads on brand landing page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "australian-house-and-garden"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see 2 mrec ad slots
        @high
        Examples:
            | device            |
            | mobile portrait   |
        @med
        Examples:
            | device            |
            | mobile            |

    @med
    Scenario: Ads on brand landing page in the tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing "australian-house-and-garden"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see 4 mrec ad slots

    @BXMA-107 @high
    Scenario: Wallpaper ad should appear on "brand" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "homes-plus/"
        * I should "see" the wallpaper ad slot on "brand"

    @BXMA-107
    Scenario Outline: Wallpaper ad should not appear on "<page>" page in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "<url>"
        * I should "not see" the wallpaper ad slot on "<page>"
        @low
        Examples:
            | device             | page       | url            |
            | tablet portrait    | brand      | homes-plus/    |
            | mobile portrait    | brand      | homes-plus/    |
            | mobile             | brand      | homes-plus/    |

    @BXMA-107 @high
    Scenario: Side panel ad should appear on "brand" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "belle/"
        * I should "see" the left and right side ad slot on "brand"

    @BXMA-107
    Scenario Outline: Side panel ad should not appear on "<page>" page in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "<url>"
        * I should "not see" the left and right side ad slot on "<page>"
        @low
        Examples:
            | device             | page       | url    |
            | tablet portrait    | brand      | belle/ |
            | mobile portrait    | brand      | belle/ |
            | mobile             | brand      | belle/ |

    @BXMA-107
    Scenario Outline: Out of page (Inskin) ad should appear on "<page>" page in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "<url>"
        * I should "see" the out of page ad slot on "<page>"
        @high
        Examples:
            | device             | page       | url            |
            | desktop            | brand      | real-living/   |
        @med
        Examples:
            | device             | page       | url            |
            | tablet landscape   | brand      | real-living/   |
            | tablet portrait    | brand      | real-living/   |

    @BXMS-108
    Scenario Outline: Ads on homepage in the <device> view
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed on the homepage
        * I should see sticky MREC ad next to the bottom news feed on the homepage
    @high
        Examples:
            | device  |
            | desktop |
    @med
        Examples:
            | device            |
            | tablet landscape  |

    @BXMS-108
    Scenario Outline: Ads on homepage in the <desktop> view
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        And I should see leaderboard ad slots at top middle and bottom
        And I should see <number> mrec ad slots
    @high
        Examples:
            | device            | number |
            | mobile portrait   | 2      |
    @med
        Examples:
            | device            | number |
            | mobile            | 2      |
            | tablet portrait   | 4      |

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
            | mobile portrait   | 2      | 3            |
    @med
        Examples:
            | device            | number | second count |
            | mobile            | 2      | 3            |
            | tablet portrait   | 4      | 6            |

    @BXMS-129
    Scenario Outline: Ads on section landing page in the <desktop> view
        Given I switch to "<device>" view
        When I am currently viewing "real-homes"
        * I should see leaderboard ad slots at top middle and bottom
        * I should see sticky MREC ad next to the top news feed of the section Page
        * I should see sticky MREC ad next to the bottom news feed of the section Page
        When I click on the Load More button
        Then I should see <second count> mrec ad slots

    @high
        Examples:
            | device  | second count |
            | desktop | 3            |
    @med
        Examples:
            | device            | second count |
            | tablet landscape  | 3            |
