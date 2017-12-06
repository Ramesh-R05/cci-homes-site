@article @homes
Feature: Article
    As a user
    I should be able to see the article page

# -------- Article page on mobile and desktop  ---------------#
    Scenario Outline: Verify an article page which contains a hero image in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero image
        * I should not see the hero image caption
        * I can see the body paragraph "Test body paragraph"
        * I can see the body heading "BODY HEADING BODY HEADING"
        * I can see the body related content
        * I can see the body image caption "This is inline image caption"
        * I can see the body gallery
        * I can see the body video
        * I can see the body tips "body tips body tips EOM"
        * I can see the Image Revealer component
        * I can see the related tags "INTERIORS,|TREND,|PROFILE,|VILLA"
    @high
        Examples:
            |device          |
            |mobile portrait |
    @med
        Examples:
            |device          |
            |desktop         |

    @high
    Scenario: Verify the short teaser on article page in mobile view
        Given I switch to "mobile portrait" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can not see the short teaser

    @med
    Scenario: Verify the short teaser on article page in desktop view
        When I switch to "desktop" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the short teaser "Short Teaser EOM"
# -------- Article page on mobile and desktop end ---------------#

# -------- RHR ---------------#
    @high
    Scenario: Verify the RHR on an article page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see 20 items in the list of items in RHR
        * I can see the 20 images of each item in RHR
        * Image in RHR is clickable to open its page
        * I can see the long title of an item in RHR
        * Long title in RHR is clickable to open its page
        * I can see an item in RHR containing source

    @med
    Scenario: Verify the RHR on an article page in tablet landscape view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        When I switch to "tablet landscape" view
        * I can see the RHR
# -------- RHR end ---------------#

# -------- Social embed ---------------#
    @med
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
        * I can see the body Linklay embed "http://www.linklay.com/app/linklay/embed/linklay59151f750e2a94.81058944"
        * I can see the body Giphy embed "https://i.giphy.com/sLs8Ll8Qx51xm.gif"
        Examples:
            | device            |
            | mobile            |
            | desktop           |
# -------- Social embed end ---------------#

# -------- Outbrain is High  ---------------#
    Scenario Outline: Users can see Outbrain on the article page in <device> view
        Given I switch to "<device>" view
        Then I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the outbrain frame with "Homestolove" template
        @high
        Examples:
            | device            |
            | mobile            |
        @med
        Examples:
            | device            |
            | desktop           |
# -------- Outbrain end   ---------------#

# -------- Article page on tablet landscape and tablet portrait ---------------#
    @low
    Scenario Outline: Verify an article page in tablet view (Test in <device>)
        When I switch to "<device>" view
        Given I am currently viewing "automation-test-article-with-hero-image-3193"
        * I can see the long title "Long Title Long Title EOM"
        * I can see the hero image
        * I can see the short teaser "Short Teaser EOM"
        * I can see the body paragraph "Test body paragraph"
        * I can see the related tags "INTERIORS,|TREND,|PROFILE,|VILLA"
        * I can see the outbrain frame with "Homestolove" template
        When I am currently viewing "automation-test-article-with-social-embeds-3195"
        Then I can see the body Twitter embed "697199025729048577"
        When I am currently viewing "automation-test-article-with-hero-video-3194"
        Then I can see the hero video instead of the main image
        Examples:
            | device            |
            | tablet portrait   |
            | tablet landscape  |
# -------- Article page on tablet landscape and tablet portrait end ---------------#
