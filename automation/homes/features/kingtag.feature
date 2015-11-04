@live @manual @javascript
Feature: Kingtag

    @DHO-371 @article-detail-page
    Scenario: Check kingtag on the article page
        Given I am on the "imogen-and-grants-light-filled-perth-cottage-1445?googfc=1" article page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting on the article page
        
    @DHO-371 @gallery
    Scenario: Check kingtag on the article page
        Given I am on the "gallery-imogen-and-grants-light-filled-perth-cottage-1443?googfc=1" gallery page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting on the gallery page

    @DHO-372 @section-landing
    Scenario: Check kingtag on the section page
        Given I am on the "home-tours?googfc=1" landing page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting on the section page
        Given I am on the "interiors?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Interiors" as part of the ad targeting on the section page
        Given I am on the "outdoor?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Outdoor" as part of the ad targeting on the section page
        Given I am on the "renovate?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Renovate" as part of the ad targeting on the section page

        When I switch to "mobile" view
        Given I am on the "home-tours?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Home Tours" as part of the ad targeting on the section page
        Given I am on the "interiors?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Interiors" as part of the ad targeting on the section page
        Given I am on the "outdoor?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Outdoor" as part of the ad targeting on the section page
        Given I am on the "renovate?googfc=1" section page
        Then I can see "Setting targeting attribute kingtag with value Renovate" as part of the ad targeting on the section page

    @DHO-372 @tag-landing-page @janice
    Scenario: Check kingtag on the tag page
        Given I am on the "tags/feature-home?googfc=1" tag page
        Then I can see "Setting targeting attribute kingtag with value feature home" as part of the ad targeting on the tag page