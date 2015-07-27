@local @seo-fields @javascript
Feature: SEO Fields
    As an SEO guru
    I want to be ensure that page title and meta description fields default to a value
    that optimises SEO benefits so that pages rank higher in search engine results

    Scenario: Check that the page title, meta description and canonical URL on an article page 
        Given I am viewing an article
        Then the page should have a title "Article Long Title | HOMES TO LOVE"
        And the page should have a meta description "Article Long Title, Article Short Teaser"
        And the page should have a canonical URL "/section/article-hero-image"
    
    Scenario: Check that the page title, meta description and canonical URL on a gallery page 
        Given I am viewing a gallery
        Then the page should have a title "Gallery Long Title | HOMES TO LOVE"
        And the page should have a meta description "Gallery Long Title, Gallery Short Teaser"