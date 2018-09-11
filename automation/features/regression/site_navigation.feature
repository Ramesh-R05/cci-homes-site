@navigation @homes
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices
    As a user
    I should be able to see the navigation working properly

    Scenario Outline: As a User I want a Navigation widget across all my pages and see it in <device> view (test on <page>)
        Given I switch to "<device>" view
        And I am currently viewing "<pageURL>"
        Then I can always see the navigation at the top of the screen
        @med @homepage
        Examples:
            | page      | pageURL                                       | device            |
            | homepage  |                                               | mobile            |
        @med @article
        Examples:
            | page      | pageURL                                       | device            |
            | article   | automation-test-article-with-hero-image-3193  | desktop           |
        @low @section
        Examples:
            | page      | pageURL                                       | device            |
            | section   | real-homes                                    | tablet landscape  |
        @low @brand
        Examples:
            | page      | pageURL                                       | device            |
            | brand     | belle                                         | tablet portrait   |
        @low @gallery
        Examples:
            | page      | pageURL                                       | device            |
            | gallery   | automation-test-gallery-3201                  | mobile portrait   |

    @med @article
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can navigate to our network sites in the hamburger navigation menu
            |title                      |url                                |
            |Now To Love                |http://nowtolove.com.au/           |
            |Food To Love               |http://foodtolove.com.au/          |
            |Elle                       |http://elle.com.au/                |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |
            |Dolly                      |http://dolly.com.au/               |
            |Beauty Heaven              |http://beautyheaven.com.au/        |
