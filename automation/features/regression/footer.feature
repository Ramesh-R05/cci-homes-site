@footer @homes
Feature: Footer
    As a user
    I should be able to see the Footer

    @homepage @med
    Scenario: Verify the footer elements on homepage
        Given I switch to "mobile portrait" view
        When I am currently viewing the homepage
        * I can see the social icons clickable to open its page in the footer
            |social     |url                                        |
            |Facebook   |https://www.facebook.com/homestoloveau     |
            |Twitter    |https://twitter.com/homestoloveau          |
            |Instagram  |https://www.instagram.com/homestoloveau    |
            |Pinterest  |https://www.pinterest.com/homestoloveau    |
        * I can navigate to all brands in the footer
            |title                          |url                            |
            |Belle                          |/belle                         |
            |real living                    |/real-living                   |
            |Australian House and Garden    |/australian-house-and-garden   |
            |Inside Out                     |/inside-out/                   |
            |Country Style                  |/country-style/                |
        * I can navigate to all network sites in the footer
            |title                |url                                   |
            |Now To Love          |https://www.nowtolove.com.au/         |
            |Women's Weekly Food  |https://www.womensweeklyfood.com.au/  |
            |Elle                 |https://www.elle.com.au/              |
            |Gourmet Traveller    |https://www.gourmettraveller.com.au/  |
            |Dolly                |http://www.dolly.com.au/              |
            |Beauty Heaven        |https://www.beautyheaven.com.au/      |
        * I can navigate to all standard pages in the footer
            |page           |url                                                            |
            |Privacy Policy |http://www.bauer-media.com.au/privacy                          |
            |Advertise      |http://www.bauer-media.com.au/advertising/advertise-with-us    |
            |Terms of Use   |http://www.bauer-media.com.au/terms/website-terms              |
            |Magshop        |https://www.magshop.com.au/                                    |
        * I can see the standard copyright text in the footer as "© 2018 bauer media PTY LTD"

    @med
    Scenario Outline: Verify the footer appearing on the <page> page (Test on <device> view)
        Given I switch to "<device>" view
        When I am currently viewing "<url>"
        * 	I can see all main elements in the footer
        @brand
        Examples:
            | device            | page               | url                                              |
            | desktop           | brand page         | australian-house-and-garden                      |
        @section
        Examples:
            | device            | page               | url                                              |
            | tablet landscape  | section landing    | real-homes                                       |
        @article
        Examples:
            | device            | page               | url                                              |
            | tablet portrait   | article            | automation-test-article-with-hero-image-3193     |
        @404
        Examples:
            | device            | page               | url                                              |
            | mobile            | 404                | 404                                              |
        @gallery
        Examples:
            | device            | page               | url                                              |
            | mobile portrait   | gallery            | automation-test-gallery-3201                     |
