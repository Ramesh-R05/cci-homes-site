@footer @BXMA-105 @homes
Feature: Footer
    As a user
    I should be able to see the Footer

    Scenario Outline: Verify the footer in the "<device>" view
        Given I switch to "<device>" view
        When I am currently viewing the homepage
        * I can see the social logo in the footer
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                        |
            |Facebook   |https://www.facebook.com/homestoloveau     |
            |Twitter    |https://twitter.com/homestoloveau          |
            |Instagram  |https://www.instagram.com/homestoloveau    |
            |Pinterest  |https://www.pinterest.com/homestoloveau    |
        * I can see the brands title in the footer as "CONTENT SUPPORTED BY"
        * I can navigate to all sites in the footer
            |title                          |url                            |gtm                |
            |Belle                          |/belle                         |gtm-footer-brand   |
            |real living                    |/real-living                   |gtm-footer-brand   |
            |homes+                         |/homes-plus                    |gtm-footer-brand   |
            |Australian House and Garden    |/australian-house-and-garden   |gtm-footer-brand   |
        * I can navigate to all standard pages in the footer
            |page           |url                                                            |
            |PRIVACY POLICY |http://www.bauer-media.com.au/privacy                          |
            |ADVERTISE      |http://www.bauer-media.com.au/advertising/advertise-with-us    |
            |TERMS OF USE   |http://www.bauer-media.com.au/terms/website-terms              |
        * I can see the standard copyright text in the footer as "COPYRIGHT BAUER MEDIA PTY LTD ALL RIGHTS RESERVED"
        @med
            Examples:
                |device            |
                |mobile portrait   |
                |desktop           |
        @low
            Examples:
                |device            |
                |tablet portrait   |
                |tablet landscape  |

    Scenario Outline: Verify the footer appearing on the <page> page
        Given I switch to "desktop" view
        When I am currently viewing "<url>"
        * 	I can see all main elements in the footer
        @med
        Examples:
            |page               | url                                              |
            |brand page         | australian-house-and-garden                      |
            |section landing    | real-homes                                       |
            |article            | automation-test-article-with-hero-image-3193     |
            |404                | 404                                              |
            |gallery            | automation-test-gallery-3201                     |
