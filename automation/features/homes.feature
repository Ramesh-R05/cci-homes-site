@sitAU
Feature: Smoke test for HOMES
    As a user
    I should be able to see the HOMES site working

    Scenario: Verify the homepage
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "http://www.homestolove.com.au/homes-newsletter/" url and "gtm-subs-homepage" gtm in "mobile" view
        And The homepage hero image should be clickable to open its page
        And I should see each top teaser containing its image and is clickable to open its page
        And I should see each bottom teaser containing its title and is clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario Outline: Verify the <page> brand landing page
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "mobile" view
        And the top teaser is a hero article or gallery curated from the CMS
        And I should see each teaser containing its image and clickable to open its page
        Examples:
            | page                          | link                                                                  |
            | belle/                        | http://www.homestolove.com.au/belle-newsletter/                       |
            | real-living/                  | http://www.homestolove.com.au/real-living-newsletter/                 |
            | homes-plus/                   | http://www.homestolove.com.au/homes-plus-newsletter/                  |
            | australian-house-and-garden/  | http://www.homestolove.com.au/australian-house-and-garden-newsletter/ |

    Scenario: Verify the section landing page
        Given I switch to "mobile" view
        When I am currently viewing "real-homes"
        And the top teaser is a hero article or gallery curated from the CMS
        And I should see 6 top teasers on the feed section page
        Then I should see 6 bottom teasers on the feed section page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario: Verify the tag landing page
        Given I switch to "mobile" view
        When I am currently viewing "tags/renovation"
        And I should see 6 top teasers on the feed section page
        Then I should see 6 bottom teasers on the feed section page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        And I should see each load more feed item containing its image and clickable to open its page

    Scenario: Verify the article page
        Given Emily just published the "article" doc type item
        When I navigate to the "test-article" page
        Then our readers can enjoy the latest content

    Scenario: Verify the gallery page
        Given Emily just published the "gallery" doc type item
        When I navigate to the "test-gallery" page
        Then our readers can enjoy the latest content

    Scenario: I can see the 404 error page in the mobile style
        Given I switch to "mobile" view
        When I am currently viewing "404"
        * I should see the error title as "Oops! We're sorry!"
        * I should see the site header logo to open homepage and contain "gtm-navbar-homes" class name


