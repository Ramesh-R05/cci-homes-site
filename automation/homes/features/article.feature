@local @article-detail-page @javascript
Feature: article detail page
    As a user
    I want to view the article
    So that I can browser the content I enjoy

    @DHO-41 @DHO-101
    Scenario: Check article title, summary, content body, inline image with caption and source
        Given I am viewing an article with a hero image
        Then I should see "Article Long Title" as the title
        And I should see a hero image
        And I should see "Article Short Teaser" within the summary
        And I should see "Perhaps the best way to make a house" within the first paragragh
        And I should see a source logo

    @DHO-183
    Scenario: Check hero video
        When I am viewing an article with a hero video
        Then I should see a hero video

    @DHO-192 @DHO-194
    Scenario: Check all ad slots are visible on the article detail page
        Given I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "tablet landscape" view
        And I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "tablet portrait" view
        And I am viewing an article
        Then I should see 1 "ad--article-top" ad slot
        And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

        When I switch to "mobile" view
        And I am viewing an article
        Then I should see 1 "ad--beneath-short-teaser" ad slot
        And I should see 1 "ad--article-native" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot

    @DHO-195
    Scenario: Check all ad slots are visible on the left-hand rail
        When I am viewing an article
        # Assume ads start at the 3rd slot
        Then I should see the 1st ad in the 3rd position in the left-hand rail
        # There should be 11 teasers between each ad; 3 + 11 + 1 = 15
        And I should see the 2nd ad in the 15th position in the left-hand rail
