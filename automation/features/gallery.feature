@gallery @DDO-298 @homes
Feature: Gallery
    As a user
    I should be able to see the gallery page

    Scenario: Verify a gallery page in mobile style on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        * I can see the custom label of the gallery "AUSSIE GOSS"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        * I can see the image number "1" of total "8" on the mobile gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can click MORE to see the full image caption on the gallery
        * I can click LESS to see the short image caption on the gallery
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
        * I should not see the gallery description on mobile for next image
        * I can see the image caption on the gallery containing "a glossy lip!"
        * I can click the left arrow to go back to a previous image on the gallery
        When I see the video ID "3976804555001" on the gallery
        * I can see the play button and click on it
        * I can see the left arrow on the gallery
        * I can see the right arrow on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery on mobile
        * I can see the logo on the gallery header
        * I can see the right arrow on the next gallery slide
        * I should not see the left arrow on the gallery
        * I should not see the gallery description on mobile for next image

    Scenario: Verify a gallery page in desktop style on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can see the logo on the gallery header
        * I can click the logo to go to homepage
        * I can see an image appearing on the gallery
        * I can see the custom label of the gallery "AUSSIE GOSS"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the right arrow on the gallery
        * I should not see the left arrow on the gallery
        * I can see the image number "1" of total "8" on the gallery
        * I can see the image caption on the gallery containing "Fresh-faced beauty"
        * I can click MORE to see the full image caption on the gallery
        * I can click LESS to see the short image caption on the gallery
        * I can click the right arrow on the gallery to check the next image
        When I see the image no "2" on the gallery
        * I can see the left arrow on the gallery
        * I can see an image appearing on the gallery
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can see the image caption on the gallery containing "a glossy lip!"
        * I can click the left arrow to go back to a previous image on the gallery
        When I see the video ID "3976804555001" on the gallery
        * I can see the play button and click on it
        * I can see the left arrow on the gallery
        * I can see the right arrow on the gallery
        When I see the last image on the gallery
        * I can see an image appearing on the gallery
        * I can click the right arrow on the gallery on the last slide
        When I see the next gallery slide on the gallery as "NEXT GALLERY"
        * I can see the logo on the gallery header
        * I should not see the long title on the gallery header on the next gallery slide
        * I can see the right arrow on the next gallery slide
        * I should not see the left arrow on the gallery

    Scenario: Verify a gallery page in mobile style on tablet portrait view
        When I switch to "tablet portrait" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can click the right arrow on the gallery to check the next image
        * I should not see the gallery description on mobile for next image

    Scenario: Verify a gallery page in desktop style on tablet landscape view
        When I switch to "tablet landscape" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can see the gallery description of the gallery containing "Test the second paragraph"
        * I can click the right arrow on the gallery to check the next image

    @DAV-80 @DAV-81
    Scenario: Verify the slide of MREC ad on mobile view
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can slide to the first MREC ad
        * I cannot go to the next slide when the ad is not loaded
        * I can go to the next slide when the ad is loaded

    @DAV-80 @DAV-81
    Scenario: Verify the slide of MREC ad on desktop view
        When I switch to "desktop" view
        Given I am currently viewing "fashion/automation-test-gallery-13302"
        * I can slide to the first MREC ad
        * I cannot go to the next slide when the ad is not loaded
        * I can go to the next slide when the ad is loaded
