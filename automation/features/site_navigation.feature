@homepage @homes @high
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @BXMS-85
    Scenario Outline: I can see the navigation widget on the homepage "<device>"
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        Then I should see the site header banner
        And I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should see the site "main" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "sub" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"

        Examples:
            | device            |
            | desktop           |
            | tablet portrait   |
            | tablet landscape  |

    @BXMS-85
    Scenario: I can see the navigation widget on the homepage mobile
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should not see the site navigation links
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"

    Scenario: I can see the sticky navigation on the homepage
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        And when I scroll down in the page
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should see the site "main" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "sub" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"

    Scenario: I can see the navigation widget on the section page
        Given I switch to "desktop" view
        When I am currently viewing "real-homes"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should see the site "main" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "sub" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"
#        And I can see the link "FASHION" is highlighted on the navigation links
#        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the article page
        Given I switch to "tablet portrait" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should see the site "main" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "sub" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"
#        And I can see the link "FASHION" is highlighted on the navigation links
#        And I can see the link "Fashion" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the gallery page
        Given I switch to "mobile portrait" view
        When I am currently viewing "automation-test-gallery-3201"
        Then I should see the site header logo clickable to open homepage and contain "gtm-navbar-homes" class name
        And I should see the site "main" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "sub" navigation links and "gtm-navigation-section" class name in "header"
        And I should see the site "main" navigation links and "gtm-hamburger-section" class name in "hamburger"
        And I should see the site "sub" navigation links and "gtm-hamburger-section" class name in "hamburger"

    @BXMS-85
    Scenario: I can see the brand logos in the hamburger menu
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can navigate to all sites in the hamburger navigation menu
            |title                      |url                                |gtm                  |
            |Now To Love                |http://nowtolove.com.au/           |gtm-hamburger-now    |
            |Food To Love               |http://foodtolove.com.au/          |gtm-hamburger-food   |
            |Elle                       |http://elle.com.au/                |gtm-hamburger-elle   |
            |Harper's Bazaar            |http://harpersbazaar.com.au/       |gtm-hamburger-hb     |
            |Gourmet Traveller          |http://gourmettraveller.com.au/    |gtm-hamburger-gt     |
            |Cosmopolitan               |http://cosmopolitan.com.au/        |gtm-hamburger-cosmo  |
            |Dolly                      |http://dolly.com.au/               |gtm-hamburger-dolly  |
            |Beauty Heaven              |http://beautyheaven.com.au/        |gtm-hamburger-bh     |

# Tags page in stubb is not workin will need to look at this manually
#    Scenario: I can see the navigation widget on the tag page
#        Given I am currently viewing "tags/video"
#        When I switch to "tags/desktop" view
#        Then I should see the site Header logo
#        And I should see the site navigation links
#        And I should see the site navigation hamburger icon
#        And I can see the link "VIDEO" is highlighted on the navigation links
#        And I can see the link "VIDEO" is highlighted on the hamburger navigation links
