@sitAU
Feature: Smoke test for HOMES
    As a user
    I should be able to see the HOMES site working

    Scenario: Verify the homepage
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "https://www.homestolove.com.au/homes-newsletter/" url in "mobile" view
        And The homepage hero image should be clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario Outline: Verify the <page> brand landing page
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url in "mobile" view
        And I should see the hero teaser
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        Examples:
            | page                          | link                                                                         |
            | belle/                        | https://www.homestolove.com.au/belle-newsletter/                             |
            | real-living/                  | https://www.homestolove.com.au/real-living-newsletter/                       |
            | australian-house-and-garden/  | https://www.homestolove.com.au/australian-house-and-garden-newsletter/       |
            | inside-out/                   | https://www.homestolove.com.au/homes-newsletter/                             |
            | homelife/                     | https://www.homestolove.com.au/homes-newsletter/                             |
            | country-style/                | https://www.homestolove.com.au/homes-newsletter/                             |

    Scenario: Verify the section landing page
        Given I switch to "mobile" view
        When I am currently viewing "home-tours"
        And I should see the hero teaser
        And I should see 6 top teasers on the feed section page
        Then I should see 6 bottom teasers on the feed section page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario: Verify the tag landing page
        Given I switch to "mobile" view
        When I am currently viewing "tags/renovation"
        And I should see 6 top teasers on the feed section page
        Then I should see 6 bottom teasers on the feed section page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see a load more feed item containing its image and clickable to open its page

    Scenario: I can see the 404 error page in the mobile style
        Given I switch to "mobile" view
        When I am currently viewing "404"
        * I should see the error title as "Oops! We're sorry!"
        * I should see the site header logo to open homepage

    Scenario: Verify all the doc type items
        Given I switch to "mobile" view
        Given Editor just published the "article" doc type item
        When I navigate to the "article" page
        Then our readers can enjoy the created "article" page
        Given Editor just published the "gallery" doc type item
        When I navigate to the "gallery" page
        Then our readers can enjoy the created "gallery" page
        When I navigate to the "amp article" page
        Then our readers can enjoy the created "amp article" page
        When I navigate to the "amp gallery" page
        Then our readers can enjoy the created "amp gallery" page

    Scenario: Verify the RSS feed
        Given I am currently viewing "rss"
        Then I should see "link" tag containing "http://homes-site-au.sit.bxm.net.au" value
        * I should see "dc:creator" tag containing "Homes To Love" in CDATA
        * I should see "title" tag containing a value
        * I should see "dc:creator" tag containing a value
        * I should see "content:encoded" tag containing a value
        When I am currently viewing "rss/summary"
        * I should see "title" tag containing a value
        * I should not see "content:encoded" tag
        When I am currently viewing "rss/summary/realliving"
        * I should see "title" tag containing a value
        When I am currently viewing "rss/info"
        * I should see "rss/summary/realliving" in json

    Scenario Outline: Verify the search feature on <page> in <device> (Mobile style)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the search icon in the navigation bar
        * I should see the search box after clicking the icon
        * I should still see the search box after scrolling the page down
        * I should be able to search a keyword "house" on "navigation bar" and see the result page
        * I should not see the search bar on the search result page in mobile version
        Examples:
        |device             |page       |pageUrl                                            |
        |mobile             |homepage   |                                                   |

    Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
        Given I switch to "<device>" view
        When I am currently viewing "<pageUrl>"
        * I should see the search icon in the navigation bar
        * I should see the search box after clicking the icon
        * I should still see the search box after scrolling the page down
        * I should be able to search a keyword "house" on "navigation bar" and see the result page
        * I should be able to search a keyword "home" on "search result page" and see the result page
        Examples:
        |device             |page       |pageUrl                                            |
        |desktop            |homepage   |                                                   |

##Enable this case once we work on a ticket to improve the search icon with many menus in the navigation bar
    #Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
    #   Given I switch to "<device>" view
    #   When I am currently viewing "<pageUrl>"
    #   * I should be able to search a keyword "house" on "navigation bar" and see the result page
    #   Examples:
    #   |device             |page       |pageUrl                                            |
    #   |tablet landscape   |section    |real-homes                                               |

##Enable this case once we work on a ticket to improve the search icon with many menus in the navigation bar
#    Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
#        Given I switch to "<device>" view
#        When I am currently viewing "<pageUrl>"
#        * I should be able to search a keyword "house" on "navigation bar" and see the result page
#        Examples:
#        |device             |page        |pageUrl                                                         |
#        |tablet portrait    |article     |ikea-collaborates-with-louis-vuitton-designer-4197              |
