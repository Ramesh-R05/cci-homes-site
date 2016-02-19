@local @seo-fields @javascript
Feature: SEO Fields
    As an SEO guru
    I want to be ensure that page title and meta description fields default to a value
    that optimises SEO benefits so that pages rank higher in search engine results

    @DHO-162 @DHO-167
    Scenario: Check that the page title, meta description and canonical URL on an article page
        Given I am viewing an article
        Then the page should have a title "Article Long Title | HOMES TO LOVE"
        And the page should have a meta description "Article Long Title, Article Short Teaser"
        And the page should have a canonical URL "/section/article-hero-image"

    @DHO-421
    Scenario: Check that the page title and canonical URL on tag page
        Given I am on the "/tags/feature-home" landing page
        Then the page should have a title "Feature Home | HOMES TO LOVE"
        And the page should have a canonical URL "/tags/feature-home"

    @DHO-216
    Scenario: Check that the page title, meta description and canonical URL on a gallery page
        Given I am viewing a gallery
        Then the page should have a title "Gallery Long Title | HOMES TO LOVE"
        And the page should have a meta description "Gallery Long Title, Gallery Short Teaser"
