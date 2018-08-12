@ad @homes @live
Feature: Ads on live
    As a user
    I should be able to see specific behaviour of displyaing the ads.

#--------Sticky and auto-refreshing MREC ad in RHS--------#
    @med
    Scenario Outline: Sticky MREC ad in RHS will autorefresh on content page in desktop view (Test on <page>)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        Then I can see last RHR ad is sticky
        And the "sticky MREC ad" will "auto" refresh every 30 seconds on "<page>" when is in View
        # And after 15 seconds the page will go idle and the add will no refresh anymore # This is tested manually
    @article
        Examples:
            |page     |pageUrl                                                        |
            |article  |ellen-pompeo-lists-her-stunning-1920s-spanish-villa-in-la-6585 |
#--------Sticky and auto-refreshing MREC ad in RHS end--------#

#--------Sticky top leaderboard ad and sticky bottom leaderboard-----------#
    @med
    Scenario Outline: Verify the sticky top leaderboard in mobile view (Test on <page>)
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
    @gallery
        Examples:
            |page       |pageUrl                                |
            |gallery    |matches-fashion-homewares-line-7053    |
    @section
        Examples:
            |page               |pageUrl                        |
            |navigation section |real-homes                     |

    @low
    Scenario Outline: Verify the sticky top leaderboard in tablet portrait view (Test on <page>)
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * I should "not see" bottom leaderboard ad sticky at the bottom of the "<page>" page
        * I should see sticky top leaderboard as I scroll down and "see" sticky bottom leaderboard once top disappears
    @tag
        Examples:
            |page               |pageUrl                        |
            |tag section        |tags/luxury-home/              |

    @low
    Scenario Outline: Verify the sticky top leaderboard in tablet landscape view (Test on <page>)
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
    @brand
        Examples:
            |page               |pageUrl                        |
            |brand              |australian-house-and-garden    |

    @med
    Scenario Outline: Verify the sticky top leaderboard in desktop view (Test on <page>)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * I should see sticky top leaderboard as I scroll down and "not see" sticky bottom leaderboard once top disappears
    @article
        Examples:
            |page               |pageUrl                                |
            |article            |scandi-style-family-home-7108          |
    @homepage
        Examples:
            |page               |pageUrl                        |
            |homepage           |                               |
#--------Sticky top leaderboard ad and sticky bottom leaderboard end-----------#

#--------Auto-refreshing mobile banner and bottom leaderboard ad--------#
    @med
    Scenario Outline: Verify the autorefreshing mobile banner in mobile view (Test on <page>)
        Given I switch to "mobile" view
        When I am currently viewing "<pageUrl>"
        * the "mobile banner ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
    @article
        Examples:
            |page               |auto        |pageUrl                                |
            |article            |auto        |scandi-style-family-home-7108          |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard in tablet portrait view (Test on <page>)
        Given I switch to "tablet portrait" view
        When I am currently viewing "<pageUrl>"
        * the "sticky bottom leaderboard ad" will "<auto>" refresh every 30 seconds on "<page>" when is in View
    @brand
        Examples:
            |page               |auto        |pageUrl                                               |
            |brand              |not auto    |australian-house-and-garden                           |

    @low
    Scenario Outline: Verify the autorefreshing bottom leaderboard in tablet landscape view (Test on <page>)
        Given I switch to "tablet landscape" view
        When I am currently viewing "<pageUrl>"
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
    @gallery
        Examples:
            |page               |pageUrl                                               |
            |gallery            |matches-fashion-homewares-line-7053                   |

    @med
    Scenario Outline: Verify the autorefreshing bottom leaderboard in desktop view (Test on <page>)
        Given I switch to "desktop" view
        When I am currently viewing "<pageUrl>"
        * the "bottom leaderboard ad" will "not auto" refresh every 30 seconds on "<page>" when is in View
    @homepage
        Examples:
            |page               |pageUrl                                               |
            |homepage           |                                                      |
#--------Auto-refreshing mobile banner and bottom leaderboard ad end--------#

