@gallery @DDO-298 @homes
Feature: Gallery
    As a user
    I should be able to see the gallery page

    Scenario Outline: User navigates through the gallery
        Given I switch to "<Device>" view
        And I am currently viewing "automation-test-gallery-3201"
        When I navigate to all of the images
        Then I am able to see next gallery on "<Device>"
        @high
        Examples:
            | Device            |
            | mobile            |
            | mobile portrait   |
            | desktop           |
        @med
        Examples:
            | Device            |
            | tablet portrait   |
            | tablet landscape  |


    Scenario Outline: User can see the headline in the gallery
        Given I switch to "<Device>" view
        And I am currently viewing "automation-test-gallery-3201"
        Then I can see the headline "A luxurious bushland retreat" across all images
        @high
        Examples:
            | Device            |
            | desktop           |
        @med
        Examples:
            | Device            |
            | tablet landscape  |


    Scenario Outline: User can see the headline in the gallery
        Given I switch to "<Device>" view
        And I am currently viewing "automation-test-gallery-3201"
        Then I can see the headline "A luxurious bushland retreat" only on the first image
        @high
        Examples:
            | Device            |
            | mobile            |
            | mobile portrait   |
        @med
        Examples:
            | Device            |
            | tablet portrait   |


    Scenario Outline: User can see image number and the image caption
        Given I switch to "<Device>" view
        And I am currently viewing "automation-test-gallery-3201"
        Then I can see the Image counter and caption truncated to two lines
        And I can toggle between Less and More
        @high
        Examples:
            | Device            |
            | desktop           |
            | mobile            |
            | mobile portrait   |
        @med
        Examples:
            | Device            |
            | tablet landscape  |
            | tablet portrait   |


    Scenario Outline: User can share through social media buttons
            Given I switch to "<Device>" view
            And I am currently viewing "automation-test-gallery-3201"
            Then I should be able to share through facebook
            And I should be able to share through Pinterest
        @high
            Examples:
                | Device            |
                | desktop           |
                | mobile            |
                | mobile portrait   |
        @med
            Examples:
                | Device            |
                | tablet landscape  |
                | tablet portrait   |

     Scenario Outline: User should be able to see gallery description text
         Given I switch to "<Device>" view
         And I am currently viewing "automation-test-gallery-3201"
         Then I should be able to see the gallery description text
         And I should be able to see the brand logo
        @high
            Examples:
                | Device            |
                | desktop           |
                | mobile            |
                | mobile portrait   |
        @med
            Examples:
                | Device            |
                | tablet landscape  |
                | tablet portrait   |
