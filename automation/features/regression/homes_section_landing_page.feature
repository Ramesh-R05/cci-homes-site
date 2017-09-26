@landingpage @homes
Feature: SectionLanding page
    As a user
    I should be able to see the section landing page to show contents of that brand

    Scenario Outline: Verify a Section page on "<device>"
        When I switch to "<device>" view
        Given I am currently viewing "real-homes"
        Then I should see the section title "REAL HOMES"
        And the top teaser is a hero article or gallery curated from the CMS
        And I should see 6 top teasers on the feed section page
        * every top teaser image takes the user to the content page
        * every top teaser title takes the user to the content page
        * every top teaser has a source tag
        And the tag is a link to a page with all content tagged with it
        Then I should see 6 bottom teasers on the feed section page
        * every bottom teaser image takes the user to the content page
        * every bottom teaser title takes the user to the content page
        * every bottom teaser has a source tag
        And the bottom teaser tag is a link to a page with all content tagged with it
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
    @high
        Examples:
            | device    |
            | mobile    |
    @med
        Examples:
            | device    |
            | desktop   |
    @low
        Examples:
            | device           |
            | tablet portrait  |
            | tablet landscape |
