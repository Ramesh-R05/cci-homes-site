@article @homes
Feature: Article
    As a user
    I should be able to see the article page

    @high
    Scenario: Verify an article page which contains a hero image on mobile
        When I switch to "mobile portrait" view
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
        * I can see the related tags "INTERIORS,|TREND,|PROFILE,|VILLA"


    @DAW-1125 @low
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


    @med
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
        * I can see the related tags "INTERIORS,|TREND,|PROFILE,|VILLA"


    @DDO-160 @DDO-48 @low
    Scenario: Verify an hero image caption and LHR on different screen sizes
    Given I am currently viewing "automation-test-article-with-hero-image-3193"
    When I switch to "desktop" view
    * I can see the hero image
    * I should not see the hero image caption
    * I can see the LHR

    When I switch to "mobile" view
    * I can see the hero image
    * I should not see the hero image caption
    * I should not see the LHR

    @DDO-48
    Scenario Outline: Verify the RHR on an article page in <device> view
    Given I am currently viewing "automation-test-article-with-hero-image-3193"
    When I switch to "<device>" view
    * I can see 20 items in the list of items in RHR
    @high
        Examples:
        | device            |
        | desktop           |

    @med
        Examples:
        | device            |
        | tablet landscape  |

    Scenario Outline: Editorial team can add social feeds to the article body and see them in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-article-with-social-embeds-3195"
        Then I can see the body Twitter embed "697199025729048577"
        * I can see the body Instagram embed with caption "https://www.instagram.com/p/BBda49yyr4J/embed/captioned/"
        * I can see the body Instagram embed without caption "https://www.instagram.com/p/BA4NkZeSr_r/embed/"
        * I can see the body Facebook embed "https://www.facebook.com/Foodtoloveau/posts/823515874446034"
        * I can see the body Playbuzz embed "/cosmopolitanmagazine10/which-harry-styles-is-your-boyfriend"
        * I can see the body Youtube embed "https://www.youtube.com/embed/4GpnNxjy6m0"
        * I can see the body Vimeo embed "https://player.vimeo.com/video/181027959"
        * I can see the body Whooshka embed "https://www.whooshkaa.com/player/episode/id/90704?visual=true"
        * I can see the body Wirewax embed "http://embed.wirewax.com/8037657/ff0044/"

    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @med
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |

    # -------- Outbrain is High  ---------------#
    Scenario Outline: Users can see Outbrain on the article page in <device> view
        When I switch to "<device>" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the outbrain frame with "Homestolove" template
    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |
    # -------- Outbrain end   ---------------#


    Scenario Outline: Users can see the Image Revealer component on the article page in <device> view
        When I switch to "<device>" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the Image Revealer component
    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |
