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
            | device  |
            | desktop |
            | mobile  |

    Scenario Outline: Verify Homes to Love homepage has a hero content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I can see the homepage hero element with a title and an image clickable to its page
        * I can see the homepage hero source
        @high
        Examples:
            | device  |
            | desktop |

    Scenario Outline: Verify Homes to Love homepage has a hero content on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I can see the homepage hero element with a title and an image clickable to its page
        * I cannot see the homepage hero source
        @med
        Examples:
            | device |
            | mobile |

    Scenario Outline: Verify top, bottom, load more teaser items on "<device>"
        Given I switch to "<device>" view
        And I am currently viewing the homepage
        Then I should see 6 "top" teasers on the homepage with title and image clickable to their pages
        And I should see 6 "bottom" teasers on the homepage with title and image clickable to their pages
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
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more

    @low
    Scenario: Verify homepage on tablet portrait view
        Given I switch to "tablet portrait" view
        When I am currently viewing the homepage
        Then I should see the sign up button containing "//www.homestolove.com.au/homes-newsletter/" url in "tablet portrait" view
        When I click on the Load More button
        Then I should see extra 12 teasers after loading more
