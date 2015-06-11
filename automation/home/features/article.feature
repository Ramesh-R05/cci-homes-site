@local @article-detail-page
Feature: article detail page
  As a user
  I want to view the article
  So that I can browser the content I enjoy

  @DHO-41
  Scenario: Check article title, summary and content body
    When I am viewing the article page
    Then I should see "Article 01 - Creative Home - Long Title" as the title
    And I should see a hero image
	And I should see "Article 01 - Creative Home - Short Teaser" within the summary