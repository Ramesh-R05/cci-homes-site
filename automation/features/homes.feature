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
            | page                          | link                                                                   |
            | belle/                        | https://www.homestolove.com.au/belle-newsletter/                       |
            | real-living/                  | https://www.homestolove.com.au/real-living-newsletter/                 |
            | australian-house-and-garden/  | https://www.homestolove.com.au/australian-house-and-garden-newsletter/ |

    Scenario: Verify the section landing page
        Given I switch to "mobile" view
        When I am currently viewing "real-homes"
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

    Scenario: Verify the article page
        Given Editor just published the "article" doc type item
        When I navigate to the "test-article" page
        Then our readers can enjoy the latest content

    Scenario: Verify the gallery page
        Given Editor just published the "gallery" doc type item
        When I navigate to the "test-gallery" page
        Then our readers can enjoy the latest content

    Scenario: I can see the 404 error page in the mobile style
        Given I switch to "mobile" view
        When I am currently viewing "404"
        * I should see the error title as "Oops! We're sorry!"
        * I should see the site header logo to open homepage

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
