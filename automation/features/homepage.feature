@homepage @homes
Feature: Homepage
    As a user
    I should be able to see homepage

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
    @high
    Examples:
        | device |
        | desktop |
    @low
    Examples:
        | device |
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
    @high
    Examples:
        | device |
        | mobile portrait |
    @low
    Examples:
        | device |
        | tablet portrait |

    Scenario Outline: Verify Home page has top featured content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 top teasers on the homepage page
        And I should see each top teaser containing its image and is clickable to open its page
        And I should see each top teaser containing its title and is clickable to open its page
        And I should see each top teaser containing its tag and is clickable to open its page
    @high
    Examples:
        | device |
        | mobile portrait |
        | desktop         |
    @low
    Examples:
        | device |
        | tablet portrait  |
        | tablet landscape |

    Scenario Outline: Verify Home page has bottom featured content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 top teasers on the homepage page
        And I should see each bottom teaser containing its image and is clickable to open its page
        And I should see each bottom teaser containing its title and is clickable to open its page
        And I should see each bottom teaser containing its tag and is clickable to open its page
    @high
    Examples:
        | device |
        | mobile portrait |
        | desktop         |
    @low
        Examples:
        | device |
        | tablet portrait  |
        | tablet landscape |

#   MRECS and Ads are tested on --> ad.feature
