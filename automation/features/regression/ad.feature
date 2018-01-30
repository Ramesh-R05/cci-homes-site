@ad @homes
Feature: Ads
    As a user
    I should be able to see the relevant Ads on the site

#--------Index page ads (Homepage, Section, Brand)--------#
    Scenario Outline: Ads on index page in the <device> view (Test on <page>)
        Given I switch to "<device>" view
        When I am currently viewing "<pageURL>"
        Then I should see leaderboard ad slots at top middle and bottom
        And I should see sticky MREC ad next to the top news feed on "<page>"
        And I should see sticky MREC ad next to the bottom news feed on "<page>"
        When I click on the Load More button
        Then I should see sticky MREC on the new feed
        And I should see <numberMrecLoadMore> mrec ad slots
    @homepage @high
        Examples:
            | device            | page     | pageURL                        | numberMrecLoadMore  |
            | desktop           | homepage |                                | 3                   |
    @section @med
        Examples:
            | device            | page     | pageURL                        | numberMrecLoadMore  |
            | tablet landscape  | section  | real-homes                     | 3                   |
    @brand @med
        Examples:
            | device            | page     | pageURL                        | numberMrecLoadMore  |
            | desktop           | brand    | australian-house-and-garden    | 3                   |

    Scenario Outline: Ads on index page in the <device> view (Test on <page>)
        Given I switch to "<device>" view
        And I am currently viewing "<pageURL>"
        And I should see leaderboard ad slots at top middle and bottom
        And I should see <numberMrec> mrec ad slots
        And I click on the Load More button
        And I should see <numberMrecLoadMore> mrec ad slots
    @homepage @med
        Examples:
            | device            | page     | pageURL                     | numberMrec | numberMrecLoadMore |
            | mobile            | homepage |                             | 2          | 3                  |
    @section @med
        Examples:
            | device            | page     | pageURL                     | numberMrec | numberMrecLoadMore |
            | tablet portrait   | section  | real-homes                  | 4          | 6                  |
    @brand @med
        Examples:
            | device            | page     | pageURL                     | numberMrec | numberMrecLoadMore |
            | mobile            | brand    | australian-house-and-garden | 2          | 3                  |
#--------Index page ads (Homepage, Section, Brand) end--------#

#--------Content page ads (Article, Gallery)--------#

    Scenario Outline: Ads on content page in the <device> view (Test on <page>)
        Given I switch to "<device>" view
        When I am currently viewing "<pageURL>"
        * I should see the top leaderboard ad under navigation
        * I should see the bottom leaderboard ad above the footer on article
        * I should see four MREC ads in the RHR feed
        * I should not see MREC ad under the hero image
        * I should not see MREC ad above recommendation
    @gallery @high
        Examples:
            | device            | page      | pageURL                       |
            | desktop           | gallery   | automation-test-gallery-3201  |
    @article @med
        Examples:
            | device            | page      | pageURL                                       |
            | tablet landscape  | article   | automation-test-article-with-hero-image-3193  |

    @gallery @med
    Scenario: Ads on content page in the tablet portrait view (Test on gallery)
        Given I switch to "tablet portrait" view
        When I am currently viewing "automation-test-gallery-3201"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article
        * I should not see MREC ad under the hero image
        * I should see MREC ad between images

    @article @med
    Scenario: Ads on content page in the mobile view (Test on article)
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I should see the top leaderboard ad under navigation
        * I should see MREC ad under the hero image
        * I should see MREC ad above recommendation
        * I should see the bottom leaderboard ad above the footer on article

    @gallery
    Scenario Outline: Special ads in content body copy on gallery page in the <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-gallery-3201"
        And I should see MREC ad between images
    @high
    Examples:
        |device         |
        |mobile         |
    @low
    Examples:
        |device         |
        |tablet portrait|
#--------Content page ads (Article, Gallery) end--------#

# -------- Wall Paper Ads are High as this is an area with Commercial Value ---------------
    @brand @med
    Scenario: Wallpaper and side panel ad should appear on "brand" page in the desktop view
        Given I switch to "desktop" view
        When I am currently viewing "homes-plus"
        * I should "see" the wallpaper ad slot on "brand"
        When I am currently viewing "belle"
        * I should "see" the left and right side ad slot on "brand"
#-------- Test Wallpaper and side panel ad end-----------#

# -------- Inskin Ads on desktop and tablet are Manual ---------------
#    @BXMA-107 @manual @chrome
#    Scenario Outline: Out of page (Inskin) ad should appear on "<page>" page in the "<device>" view
#        Given I switch to "<device>" view
#        When I am currently viewing "<url>"
#        * I should "see" the out of page ad slot on "<page>"
#
#        Examples:
#            | device             | page       | url            |
#            | desktop            | brand      | real-living/   |
#
#        Examples:
#            | device             | page       | url            |
#            | tablet landscape   | brand      | real-living/   |
#            | tablet portrait    | brand      | real-living/   |
#-------- Test Inskin Ads end-----------#

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
            |page     |pageUrl                                      |
            |article  |automation-test-article-with-hero-image-3193 |
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
            |page               |pageUrl                        |
            |gallery            |automation-test-gallery-3201   |
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
            |page               |pageUrl                                               |
            |article            |automation-test-article-with-hero-image-3193          |
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
            |page               |auto        |pageUrl                                               |
            |article            |auto        |automation-test-article-with-hero-image-3193          |

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
            |gallery            |automation-test-gallery-3201                          |

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

