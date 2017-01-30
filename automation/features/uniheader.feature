@wnheader @BXMA-89 @homes
Feature: Uniheader
    As a user
    I should be able to see the Uniheader

    @homepage
    Scenario: Verify desktop Uniheader is functioning correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * I can navigate to all sites in the desktop list on the header
            |title                          |url                            |gtm                            |
            |Belle                          |/belle                         |gtm-uniheader-belle            |
            |real living                    |/real-living                   |gtm-uniheader-realliving       |
            |homes+                         |/homes-plus                    |gtm-uniheader-homesplus        |
            |Australian House and Garden    |/australian-house-and-garden   |gtm-uniheader-houseandgarden   |
