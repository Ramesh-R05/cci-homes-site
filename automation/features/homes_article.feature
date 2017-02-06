@article @homes
Feature: Article
    As a user
    I should be able to see the article page

    @high
    Scenario: Verify an article page which contains a hero image on mobile
        When I switch to "mobile" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero image
        * I should not see the hero image caption
        * I can not see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the body heading "BODY HEADING BODY HEADING"
        * I can see the body related content
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body tips "body tips body tips EOM"
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tags "VILLA"


    @DAW-1125 @med
    Scenario: Verify an article page which contains a hero video on tablet portrait
        When I switch to "tablet portrait" view
        Given I am currently viewing "automation-test-article-with-hero-video-3194"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero video instead of the main image
        * I should not see the hero image caption
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the body related content
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"

    @high
    Scenario: Verify an article page which contains a hero image on desktop
        When I switch to "desktop" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the body heading "BODY HEADING BODY HEADING"
        * I can see the body related content
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body tips "body tips body tips EOM"
        * I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the related tags "VILLA"


@DDO-160 @DDO-48 @med
Scenario: Verify an hero image caption and LHR on different screen sizes
    Given I am currently viewing "automation-test-article-with-hero-image-3193"
    When I switch to "desktop" view
    * I can see the hero image
    * I should not see the hero image caption
    * I can see the LHR

    When I switch to "tablet landscape" view
    * I can see the hero image
    * I should not see the hero image caption
    * I can see the LHR

    When I switch to "tablet portrait" view
    * I can see the hero image
    * I should not see the hero image caption
    * I should not see the LHR

    When I switch to "mobile" view
    * I can see the hero image
    * I should not see the hero image caption
    * I should not see the LHR

@DDO-48 @high
Scenario: Verify the LHR on an article page
    Given I am currently viewing "automation-test-article-with-hero-image-3193"
    When I switch to "desktop" view
    * I can see 20 items in the list of items in LHR
    * I can see the 19 images of each item in LHR
    * Image in LHR is clickable to open its page
    * I can see the long title of each item in LHR
    * Long title in LHR is clickable to open its page
    #* I can see the items in LHR sorted by created date #This has been done in manual testing. I will find out the way to apply to automation when the date appears on the main article page.
