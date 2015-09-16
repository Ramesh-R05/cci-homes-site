@local @gallery @javascript
Feature: HomesToLove Gallery Detail Page
    As a user
    I want to be able to browse a gallery
    So that I can view more images

    Scenario: Check the required details are displayed on the gallery page
        Given I am viewing a gallery
        Then I should see the gallery title and summary
        And I should see the right slide arrows and the image
        And I should see the slide count and the image caption
        And I should see the sub-section title above the gallery summary

    @DHO-109 @gallery-ads
    Scenario: check all ad slots are visible on the gallery detail page
        Given I am viewing a gallery
        Then I should see 1 "gallery__aside-ad" ad slot
        And I should see 1 "gallery__footer-ad" ad slot
        And I should see 1st MREC after the first 3 images
        And I should see 2nd MREC after the next 4 images


    @DSP-890 @mobile
    Scenario: check all ad slots can Swipe to skip Ad on a mobile device
        Given I am viewing gallery "gallery-kimberly-and-stephens-byron-bay-beach-house-1660"
        Then I should see 1st MREC after the first 3 images
        And I should see the swipe to skip add button
        And I should see 2nd MREC after the next 4 images
        And I should see the swipe to skip add button

    @DSP-890 @tablet-portrait
    Scenario: check all ad slots can Swipe to skip Ad on a Tablet
        Given I am viewing gallery "gallery-kimberly-and-stephens-byron-bay-beach-house-1660"
        Then I should see 1st MREC after the first 3 images
        And I should see the swipe to skip add button
        And I should see 2nd MREC after the next 4 images
        And I should see the swipe to skip add button


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
