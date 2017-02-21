@brandlisting @homes
Feature: Brand Listing page
    As a user
    I should be able to see the brand listing page to show contents of that brand

    @DHO-130 @DHO-132 @DIGOT-74 @high
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
    @high
        Examples:
            | Device            |
            | desktop           |
            | mobile portrait   |
    @med
        Examples:
            | Device            |
            | tablet landscape  |
            | tablet portrait   |
            | mobile            |



