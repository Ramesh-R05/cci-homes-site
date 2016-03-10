@local @gallery @javascript
Feature: HomesToLove Gallery Detail Page
    As a user
    I want to be able to browse a gallery
    So that I can view more images

    Scenario: Check the required details are displayed on the gallery page
        Given I am viewing a gallery
        Then I should see "Gallery Long Title" as the gallery title
        And I should see "Gallery Body Text" contained in the gallery summary
        And I should see the right slide arrows and the image
        And I should see "1/9" as the gallery count
        And I should see "Gallery Image Caption" contained in the image caption
        And I should see "CREATIVE HOME" as the sub-section title above the gallery summary

    @DHO-109 @gallery-ads @manual
    Scenario: check all ad slots are visible on the gallery detail page
        Given I am viewing a gallery
        Then I should see 1 "gallery__aside-ad" ad slot
        And I should see 1 "gallery__footer-ad" ad slot
        And I should see 1st MREC after the first 3 images
        And I should see 2nd MREC after the next 4 images

    @DSP-890 @tablet-portrait @gallery-ads @manual
    Scenario: check all ad slots can Swipe to skip Ad on a Tablet
        Given I am viewing a gallery
        And I should see 1 "gallery__aside-ad" ad slot
        Then I should see 1st MREC after the first 3 images
        And I should see the swipe to skip add button
        And I should see 2nd MREC after the next 4 images
        And I should see the swipe to skip add button

    @DSP-890 @mobile @gallery-ads @manual
    Scenario: check all ad slots can Swipe to skip Ad on a mobile device
        Given I am viewing a gallery
        And I should see 1 "gallery__aside-ad" ad slot
        Then I should see 1st MREC after the first 3 images
        And I should see the swipe to skip add button
        And I should see 2nd MREC after the next 4 images
        And I should see the swipe to skip add button

    @desktop
    Scenario: Check the next gallery title and link on the next gallery slide at the end of the current gallery
        Given I am viewing a gallery
        And I am viewing the last image of the current gallery
        When I click on the next slide arrow
        Then I should see "NEXT GALLERY" as the section title on the next gallery page
        And I should see "Gallery: Kimberly and Stephen’s Byron Bay beach house" as the title of the next gallery
        And I should see "14 PHOTOS" as the image count of the next gallery
