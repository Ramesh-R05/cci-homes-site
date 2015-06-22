@local @article-detail-page
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
	And I should see an inline image with the text as "Inline Image Caption" in caption
	And I should see a source logo 

  @DHO-183
  Scenario: Check hero video
    When I am viewing an article with a hero video
    Then I should see a hero video

  @DHO-192
  Scenario: Check all ad slots are visible on the article detail page
    When I am viewing an article with a hero image
    Then I should see 1 "ad--article-top" ad slot
