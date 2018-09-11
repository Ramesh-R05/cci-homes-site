@section @homes
Feature: Section Landing page (Navigation Section)
    As a user
    I should be able to see the section landing page to show contents of that brand

    Scenario Outline: Verify a Section page on <device>
        When I switch to "<device>" view
        Given I am currently viewing "real-homes"
        Then I should see the section title "REAL HOMES"
        And I should see the hero teaser
        And I should see 6 top teasers on the feed section page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "top" feed item containing its title and clickable to open its page
        And I should see a "top" feed item containing its tag and clickable to open its page
        Then I should see 6 bottom teasers on the feed section page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        And I should see a "bottom" feed item containing its tag and clickable to open its page
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
    Scenario Outline: Verify a Section page on tablet view (Test on <device>)
        When I switch to "<device>" view
        Given I am currently viewing "real-homes"
        Then I should see the section title "REAL HOMES"
        And I should see the hero teaser
        And I should see 6 top teasers on the feed section page
        And I should see a "top" feed item containing its image and clickable to open its page
        Then I should see 6 bottom teasers on the feed section page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        Examples:
            | device           |
            | tablet portrait  |
            | tablet landscape |

    @custommasthead
    Scenario Outline: Verfiy that that the custom masthead appear in "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing "real-homes"
        * I should see the custom masthead appearing on top of the section page
    @high
        Examples:
            |device     |
            |desktop    |
    @low
        Examples:
            |device             |
            |tablet landscape   |
            |tablet portrait    |

    @custommastehead @high
    Scenario: Verfiy that that the custom mastehead appear in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "real-homes"
        * I should see the custom masthead appearing on top of the section page in mobile
