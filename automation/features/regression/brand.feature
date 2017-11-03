@brand @homes
Feature: Brand Listing page
    As a user
    I should be able to see the brand listing page to show contents of that brand

    Scenario Outline: Verify a brand listing page in <device> view
        When I switch to "<device>" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 12 teasers on the brand listing page
        And the top teaser is a hero article or gallery curated from the CMS
        * I should see each teaser containing its image and clickable to open its page
        * I should see each teaser containing its title and clickable to open its page
        * I should see each teaser containing its tag and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        @med
        Examples:
            | device            |
            | desktop           |
            | mobile            |
        @low
        Examples:
            | device            |
            | tablet landscape  |
            | tablet portrait   |

    @med
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "mobile" view
        Examples:
            | page                          | link                                                             |
            | belle/                        | //www.homestolove.com.au/belle-newsletter/                       |
            | real-living/                  | //www.homestolove.com.au/real-living-newsletter/                 |
            | homes-plus/                   | //www.homestolove.com.au/homes-plus-newsletter/                  |
            | australian-house-and-garden/  | //www.homestolove.com.au/australian-house-and-garden-newsletter/ |

    Scenario Outline: Verify the sign-up URL on <page> brand landing page in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url and "gtm-subs-brand" gtm in "<device>" view
        @med
        Examples:
            | device            | page         | link                                              |
            | desktop           | belle/       | //www.homestolove.com.au/belle-newsletter/        |
        @low
        Examples:
            | device            | page         | link                                              |
            | tablet landscape  | real-living/ | //www.homestolove.com.au/real-living-newsletter/  |
            | tablet portrait   | homes-plus/  | //www.homestolove.com.au/homes-plus-newsletter/   |
