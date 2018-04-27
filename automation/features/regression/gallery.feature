@gallery @homes
Feature: Gallery
    As a user
    I should be able to see the gallery page

    @high
    Scenario: Verify a gallery page with the primary content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"
        * I can see the created date "NOV 23, 2016"

    @med
    Scenario: Verify a gallery page with the secondary content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can see the gallery title containing "A luxurious bushland retreat"
        * I can see the image number "1" on the gallery
        * I can see the image caption on the gallery containing "The pavilion-style renovation features"

    @low
    Scenario: Verify a gallery page with the optional content on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can see the gallery description of the gallery containing "Beauty inspo for school"
        When I see the video item on the gallery
        * I can see the play button and click on it

    @med
    Scenario: Verify a gallery page in desktop style on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can click the logo to go to homepage
        * I can see the gallery title containing "A luxurious bushland retreat"
        * I can see the source appearing on the gallery with gtm "gtm-brandlogotop-article"
        * I can see the gallery description of the gallery containing "Beauty inspo for school"
        * I can see the image caption on the gallery containing "The pavilion-style renovation features"
        When I see the video item on the gallery
        * I can see the play button and click on it

    @low
    Scenario: Verify a gallery page in mobile style on tablet portrait view
        When I switch to "tablet portrait" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can see the gallery description of the gallery containing "Beauty inspo for school"
    @low
    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "tablet landscape" view
        Given I am currently viewing "automation-test-gallery-3201"
        * I can see the gallery description of the gallery containing "Beauty inspo for school"
