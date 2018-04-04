@brand @homes
Feature: Brand Listing page
    As a user
    I should be able to see the brand listing page to show contents of that brand

    Scenario Outline: Verify a brand listing page in <device> view
        When I switch to "<device>" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 12 teasers on the brand listing page
        * I should see the hero teaser
        * I should see a "top" feed item containing its image and clickable to open its page
        * I should see a "top" feed item containing its title and clickable to open its page
        * I should see a "top" feed item containing its tag and clickable to open its page
        * I should see a "bottom" feed item containing its image and clickable to open its page
        * I should see a "bottom" feed item containing its title and clickable to open its page
        * I should see a "bottom" feed item containing its tag and clickable to open its page
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

# -------- Sign-up URL ---------------#
    Scenario Outline: Verify the sign-up URL on <page> brand landing page in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "<page>"
        Then I should see the sign up button containing "<link>" url in "<device>" view
        @med
        Examples:
            | device            | page                          | link                                                             |
            | mobile            | australian-house-and-garden/  | //www.homestolove.com.au/australian-house-and-garden-newsletter/ |
            | desktop           | belle/                        | //www.homestolove.com.au/belle-newsletter/                       |
        @low
        Examples:
            | device            | page         | link                                              |
            | tablet landscape  | real-living/ | //www.homestolove.com.au/real-living-newsletter/  |
# -------- Sign-up URL end  ---------------#
