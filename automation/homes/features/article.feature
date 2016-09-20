@local @article-detail-page @javascript
Feature: article detail page
    As a user
    I want to view the article
    So that I can browse the content I enjoy

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
