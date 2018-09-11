@homepage @homes
Feature: Homepage
    As a user
    I should be able to see homepage

    Scenario Outline: Verify the sign-up URL on homepage in <device> view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url in "<device>" view
        @med
        Examples:
            | device            |
            | desktop           |
            | mobile            |

    @low
    Scenario: Users can see the latest real homes on homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        Then User will be provided with 4 "LATEST REAL HOMES"
        And each image will display text and be opaque when hover

    Scenario Outline: Verify Homes to Love homepage has a hero content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see the homepage hero element
        * The homepage hero image should be clickable to open its page
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero containing its tag and clickable to open its page
        * I should see hero content primary tag "READERS' HOME"
        * I should see hero content secondary tag "SUSTAINABLE MATERIALS"
        * I should not see the homepage hero source
        @high
        Examples:
            | device  |
            | desktop |

    Scenario Outline: Verify Homes to Love homepage has a hero content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see the homepage mobile hero element
        * The homepage mobile hero image should be clickable to open its page
        * The homepage mobile hero title should be clickable to open its page
        * I should see the homepage mobile hero containing its tag and clickable to open its page
        And I should see mobile hero content primary tag "READERS' HOME"
        And I should see mobile hero content secondary tag "SUSTAINABLE MATERIALS"
        * I should not see the homepage hero source
        @med
        Examples:
            | device |
            | mobile |

    Scenario Outline: Verify top, bottom, load more teaser items on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 top teasers on the homepage page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "top" feed item containing its title and clickable to open its page
        And I should see a "top" feed item containing its tag and clickable to open its page
        And I should see 6 bottom teasers on the homepage page
        And I should see a "bottom" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        And I should see a "bottom" feed item containing its tag and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        @med
        Examples:
            | device          |
            | mobile portrait |
            | desktop         |

    @low
    Scenario: Verify homepage on tablet landscape view
        Given I switch to "tablet landscape" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url in "tablet landscape" view
        And The homepage hero image should be clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more

    @low
    Scenario: Verify homepage on tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url in "tablet portrait" view
        And The homepage mobile hero image should be clickable to open its page
        And I should see a "top" feed item containing its image and clickable to open its page
        And I should see a "bottom" feed item containing its title and clickable to open its page
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        