@local @gallery
Feature: HomesToLove Gallery Detail Page
    As a user
    I want to be able to browse a gallery
    So that I can view more images

    @DAW-67 @javascript
    Scenario: Check the required details are displayed on the gallery page
        And I am viewing the generic gallery page
        Then I should see the gallery title and summary
        And I should see the right slide arrows and the image
        And I should see the slide count and the image caption
        And I should see the sub-section title above the gallery summary

  #out of scope for now
#    @DAW-98 @javascript
#    Scenario: Check the next gallery title and link on the next gallery slide at the end of the current gallery
#        And I am viewing the 1st generic gallery
#        When I am viewing the last image of the current gallery
#        And I click on the next slide button
#      #Then I should see the Mrec
#        When I click on the next slide button
#        Then I should see the section title on the next gallery page
#        And I should see the title of the 2nd gallery
#        And I should see "3 PHOTOS" as the image count of the next gallery
