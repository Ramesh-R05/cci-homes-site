@homepage @homes
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @high
    Scenario Outline: As a User I want a Navigation widget accross all my pages
        Given I switch to "<device>" view
        And I am currently viewing "<page>"
        Then I can always see the navigation at the top of the screen
    Examples:
        | page                                          | device            |
        |                                               | mobile            |
        | real-homes                                    | tablet landscape  |
        | belle                                         | tablet portrait   |
        | automation-test-article-with-hero-image-3193  | desktop           |
        | automation-test-gallery-3201                  | mobile portrait   |

    @high
    Scenario: As a Product Owner I want all of the navigation sections to have a gtm class
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-gallery-3201"
        Then all top navigation sections have "gtm-navigation-section"
        And all hamburger sections have "gtm-hamburger-section"
        And the navigation homes icon has "gtm-navbar-homes"

    @high
    Scenario: Mobile users menu will fade out as they scroll down the page
        Given I switch to "mobile portrait" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then the menu fades out as I scroll down the page

    @BXMS-85 @high
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
