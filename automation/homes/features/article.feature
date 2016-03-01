@local @article-detail-page @javascript
Feature: article detail page
    As a user
    I want to view the article
    So that I can browse the content I enjoy

    @DHO-41 @DHO-101 @DHO-228
    Scenario: Check article title, summary, content body, inline image with caption and source
        Given I am viewing an article with a hero image
        Then I should see "Article Long Title" as the title
        And I should see a hero image
        And I should see "Article Short Teaser" within the summary
        And I should see "Technically black and white are not even colours" within the first paragragh
        And I should see the "AUSTRALIAN HOUSE AND GARDEN" logo redirected to the brand listing page in the current window

    @video @DHO-183 @crossbrowser
    Scenario: Check hero video
        When I am viewing an article with a hero video
        Then I should see hero video title
        And I should see a hero video

    @video @DHO-418
    Scenario: Check inline video
        When I am viewing an article with a hero video
        Then I should see inline video title
        And I should see 1 inline videos
        When I am able to click the video
        Then I can see an ad is played
        And the video starts playing

    @DHO-258 @crossbrowser
    Scenario: Check inline gallery
        Given I am viewing an article
        Then I should see the inline gallery cover image redirected to the gallery page in the current window
        And I should see "GALLERY", "9 PHOTOS" and "HOT DESKING: CREATE A HOME OFFICE TO SUIT YOUR STYLE" on the inline gallery cover image

    @DHO-157
    Scenario: Check related content
        Given I am viewing an article
        Then I should see 2 related articles
        And I should see the image, title and topic tag of the related article
        And I should see the related content image links redirected to the specific article page in the current window
        And I should see the related content title links redirected to the specific article page in the current window

        When I switch to "mobile" view
        And I am viewing an article
        Then I should not see the image for the related article in mobile
        And I should see the related content title links redirected to the specific article page in the current window

    @DHO-192 @DHO-194 @article-detail-page-ads
    Scenario: Check all ad slots are visible on the article detail page
        When I switch to "desktop" view
        Given I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        #And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "tablet landscape" view
        And I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        #And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "tablet portrait" view
        And I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        #And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "mobile" view
        And I am viewing an article
        Then I should see 1 "ad--beneath-short-teaser" ad slot
        #And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

    @DHO-195 @desktop @article-detail-page-ads
    Scenario: Check all ad slots are visible on the left-hand rail
        Given I am viewing an article
        # Assume ads start at the 3rd slot
        Then I should see the 1st ad in the 3rd position in the left-hand rail
        # There should be 11 teasers between each ad; 3 + 11 + 1 = 15
        And I should see the 2nd ad in the 15th position in the left-hand rail
