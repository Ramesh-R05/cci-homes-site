@brandlisting @homes
Feature: Brand Listing page
    As a user
    I should be able to see the brand listing page to show contents of that brand

    @DHO-130 @DHO-132 @DIGOT-74 @high
    Scenario: Verify a brand listing page on mobile
        When I switch to "mobile" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 13 teasers on the brand listing page
        * I should see each teaser containing its image and clickable to open its page
        * I should see each teaser containing its title and clickable to open its page
        * I should see each teaser containing its tag and clickable to open its page
    #    * I should see the brand subscribe teaser "under" the main hero and clickable to open its page
    #    * I should see "Australian House and Garden" brand social
    #    * I should see recommendations on brand listing page

    @med
    Scenario: Verify a brand listing page on tablet portrait
        When I switch to "tablet portrait" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 13 teasers on the brand listing page
        * I should see each teaser containing its image and clickable to open its page
        * I should see each teaser containing its title and clickable to open its page
        * I should see each teaser containing its tag and clickable to open its page
    #   * I should see the brand subscribe teaser "under" the main hero and clickable to open its page
    #    * I should see "Australian House and Garden" brand social
    #    * I should see recommendations on brand listing page

    @high
    Scenario: Verify a brand listing page on desktop
        When I switch to "desktop" view
        Given I am currently viewing "australian-house-and-garden"
        * I should see the brand title logo on the brand landing page
        * I should see 13 teasers on the brand listing page
        * I should see each teaser containing its image and clickable to open its page
        * I should see each teaser containing its title and clickable to open its page
        * I should see each teaser containing its tag and clickable to open its page
    #    * I should see the brand subscribe teaser "in front of" the main hero and clickable to open its page
    #    * I should see "Australian House and Garden" brand social
    #    * I should see recommendations on brand listing page
