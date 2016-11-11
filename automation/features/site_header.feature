@homepage @dolly @cosmo
Feature: Build and Style the Header, Top Site Navigation and Hamburger Menu to be used across all devices

    @DCO-64
    Scenario: I can see the navigation widget on the homepage
        Given I am currently viewing the homepage
        When I switch to "desktop" view
        Then I should see the site Header banner
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

        When I switch to "tablet portrait" view
        Then I should see the site Header banner
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

        When I switch to "tablet landscape" view
        Then I should see the site Header banner
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

        When I switch to "mobile portrait" view
        Then I should see the site Header logo
        And I should not see the site navigation links
        And I should see the site navigation hamburger icon

    Scenario: I can see the different sticky navigation on the homepage
        Given I am currently viewing the homepage
        When I switch to "desktop" view
        And when I scroll down in the page
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon

    Scenario: I can see the navigation widget on the section page
        Given I am currently viewing "fashion"
        When I switch to "desktop" view
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "FASHION" is highlighted on the hamburger navigation links

    Scenario: I can see the navigation widget on the article page
        Given I am currently viewing "automation-test-article-with-hero-image-3663"
        When I switch to "tablet portrait" view
        Then I should see the site Header logo
        And I should see the site navigation links
        And I should see the site navigation hamburger icon
        And I can see the link "FASHION" is highlighted on the navigation links
        And I can see the link "FASHION" is highlighted on the hamburger navigation links


    Scenario: I can see the navigation widget on the gallery page
        Given I am currently viewing "automation-test-gallery-5152"
        When I switch to "mobile portrait" view
        Then I should not see the site navigation links
        And I can not see the hamburger menu

# Tags page in stubb is not workin will need to look at this manually
#    Scenario: I can see the navigation widget on the tag page
#        Given I am currently viewing "tags/video"
#        When I switch to "tags/desktop" view
#        Then I should see the site Header logo
#        And I should see the site navigation links
#        And I should see the site navigation hamburger icon
#        And I can see the link "VIDEO" is highlighted on the navigation links
#        And I can see the link "VIDEO" is highlighted on the hamburger navigation links
