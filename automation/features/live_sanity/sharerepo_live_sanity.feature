@livesharerepo
Feature: I have an automated sanity for my live environments

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser


    @homepagefeed @DDO-235
    Scenario: Verify the news feed is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see 7 top half feed
        * I should see each top feed item containing images
        * I should see each top feed item containing custom label

    @homepagefeed-bottom @DDO-234
    Scenario: Verify the homepage bottom half news feed is functional correctly in desktop view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see 7 bottom half feed
        * I should see each bottom feed item containing images
        * I should see each bottom feed item containing custom label


    Scenario: Verify a gallery page in mobile style on mobile view
        When I switch to "mobile" view
        Given I am currently viewing a gallery page
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery on mobile
        * I can see the logo on the gallery header

    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "desktop" view
        Given I am currently viewing a gallery page
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery as "NEXT GALLERY"
        * I can see the logo on the gallery header

    @DDO-48
    Scenario: Verify the LHR on an article page
        When I switch to "desktop" view
        Given I am currently viewing an article page
        * I can see 20 items in the list of items in LHR
        * Image in LHR is clickable to open its page
        * I can see the long title of each item in LHR
        * Long title in LHR is clickable to open its page


    @DDO-160 @DDO-48
    Scenario: Verify an hero image caption and LHR on different screen sizes
        Given I am currently viewing an article page
        When I switch to "desktop" view
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the LHR

        When I switch to "tablet landscape" view
        * I can see the hero image
        * I should not see the hero image caption

        When I switch to "tablet portrait" view
        * I can see the hero image
        * I should not see the hero image caption
        * I should not see the LHR

        When I switch to "mobile" view
        * I can see the hero image
        * I should not see the hero image caption
        * I should not see the LHR
