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

    @med @gallery
    Scenario: As a Product Owner I want all of the navigation sections to have a gtm class
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-gallery-3201"
        Then all top navigation sections have "gtm-navigation-section"
        And all hamburger sections have "gtm-hamburger-section"
        And the navigation homes icon has "gtm-navbar-homes"

    @med @article
    Scenario: Mobile users menu will fade out as they scroll down the page
        Given I switch to "mobile portrait" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then the menu fades out as I scroll down the page

    @med @article
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can navigate to our network sites in the hamburger navigation menu
            |title                      |url                                |gtm                  |
            |Now To Love                |http://nowtolove.com.au/           |gtm-hamburger-now    |
            |Food To Love               |http://foodtolove.com.au/          |gtm-hamburger-food   |
            |Elle                       |http://elle.com.au/                |gtm-hamburger-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-hamburger-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-hamburger-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-hamburger-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-hamburger-dolly  |
            |Beauty Heaven              |http://beautyheaven.com.au/        |gtm-hamburger-bh     |
