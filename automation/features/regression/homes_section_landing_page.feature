@landingpage @homes
Feature: SectionLanding page
    As a user
    I should be able to see the section landing page to show contents of that brand


    Scenario Outline: Verify a Section page on "<device>"
        When I switch to "<device>" view
        Given I am currently viewing "real-homes"
        Then I should see the section title "REAL HOMES"
        And I should see 6 top teasers on the top feed section page
        * every top teaser image takes the user to the content page
        * every top teaser title takes the user to the content page
        * every top teaser has a source tag
        And the tag is a link to a page with all content tagged with it
        Then I should see 6 top teasers on the bottom feed section page
        * every bottom teaser image takes the user to the content page
        * every bottom teaser title takes the user to the content page
        * every bottom teaser has a source tag
        And the bottom teaser tag is a link to a page with all content tagged with it
        When I click on the Load More button
        Then I should see extra 12 top teasers on the loaded feed section page
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

    Scenario Outline: Top teasers are showing polar ads
        Given I switch to "<device>" view
        And I am currently viewing "real-homes"
        And the below position top teasers are replaced with polar ads in section page
            |pos|
            | 1 |
            | 6 |
    @high
        Examples:
            | device          |
            | mobile          |
    @med
        Examples:
            | device          |
            | desktop         |
    @low
        Examples:
            | device           |
            | tablet portrait  |
            | tablet landscape |

    Scenario Outline: Bottom teasers are showing polar ads
        Given I switch to "<device>" view
        And I am currently viewing "real-homes"
        And the below position bottom teasers are replaced with polar ads in section page
            |pos|
            | 2 |
            | 6 |
    @med
        Examples:
            | device          |
            | mobile portrait |
            | desktop         |
    @low
        Examples:
            | device           |
            | tablet portrait  |
            | tablet landscape |


    Scenario Outline: Load More teasers are showing polar ads
        Given I switch to "<device>" view
        And I am currently viewing "real-homes"
        When I click on the Load More button
        Then the below position added more teasers are replaced with polar ads in section page
            |pos|
            | 2 |
            | 6 |
    @med
        Examples:
            | device          |
            | mobile          |
            | desktop         |
    @low
        Examples:
            | device           |
            | tablet portrait  |
            | tablet landscape |
