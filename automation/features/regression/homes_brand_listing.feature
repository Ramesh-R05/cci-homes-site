@brandlisting @homes
Feature: Brand Listing page
    As a user
    I should be able to see the brand listing page to show contents of that brand

    @DHO-130 @DHO-132 @DIGOT-74
    Scenario Outline: Verify a brand listing page on mobile
        When I switch to "<Device>" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 12 teasers on the brand listing page
        And the top teaser is a hero article or gallery curated from the CMS
        * I should see each teaser containing its image and clickable to open its page
        * I should see each teaser containing its title and clickable to open its page
        * I should see each teaser containing its tag and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 top teasers on the loaded feed section page
    @med
        Examples:
            | Device            |
            | desktop           |
            | mobile            |
    @low
        Examples:
            | Device            |
            | tablet landscape  |
            | tablet portrait   |

    @med
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "mobile" view
        Examples:
            | page                          | link                                                                  |
            | belle/                        | http://www.homestolove.com.au/belle-newsletter/                       |
            | real-living/                  | http://www.homestolove.com.au/real-living-newsletter/                 |
            | homes-plus/                   | http://www.homestolove.com.au/homes-plus-newsletter/                  |
            | australian-house-and-garden/  | http://www.homestolove.com.au/australian-house-and-garden-newsletter/ |

    Scenario Outline: Verify the sign-up URL on <page> brand landing page in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "<device>" view
        @med
        Examples:
            | device            | page         | link                                                   |
            | desktop           | belle/       | http://www.homestolove.com.au/belle-newsletter/        |
        @low
        Examples:
            | device            | page         | link                                                   |
            | tablet landscape  | real-living/ | http://www.homestolove.com.au/real-living-newsletter/  |
            | tablet portrait   | homes-plus/  | http://www.homestolove.com.au/homes-plus-newsletter/   |
