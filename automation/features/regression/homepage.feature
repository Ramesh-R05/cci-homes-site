@homepage @homes
Feature: Homepage
    As a user
    I should be able to see homepage

    Scenario Outline: Verify the sign-up URL on homepage in <device> view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url and "gtm-subs-homepage" gtm in "<device>" view
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

    Scenario Outline: Verify Homes to Love homepage has a hero content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see the homepage hero element
        * The homepage hero image should be clickable to open its page
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero containing its tag and clickable to open its page
        And I should see hero content primary tag "READERS' HOME"
        And I should see hero content secondary tag "SUSTAINABLE MATERIALS"
        * I should not see the homepage hero source
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        @high
        Examples:
            | device  |
            | desktop |
        @low
        Examples:
            | device           |
            | tablet landscape |

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
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
        @med
        Examples:
            | device |
            | mobile |
        @low
        Examples:
            | device          |
            | tablet portrait |

    Scenario Outline: Verify Home page has top featured content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 top teasers on the homepage page
        And I should see each top teaser containing its image and is clickable to open its page
        And I should see each top teaser containing its title and is clickable to open its page
        And I should see each top teaser containing its tag and is clickable to open its page
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

    Scenario Outline: Verify Home page has bottom featured content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 top teasers on the homepage page
        And I should see each bottom teaser containing its image and is clickable to open its page
        And I should see each bottom teaser containing its title and is clickable to open its page
        And I should see each bottom teaser containing its tag and is clickable to open its page
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

    @low
    Scenario: Users can see the latest real homes on homepage
        Given I switch to "desktop" view
        And I am currently viewing the homepage
        Then User will be provided with 4 "LATEST REAL HOMES"
        And each image will display text and be opaque when hover

