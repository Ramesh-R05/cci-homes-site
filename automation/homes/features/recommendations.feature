@local @recommendations @javascript
Feature: Recommendations
    As a user
    I want to be given a list of recommended articles
    So I can be directed to interesting content

    @DHO-13
    Scenario: Check that the network recommendations are shown for articles
        Given I am viewing an article
        Then I should see 5 Homes recommendations
        And I should see 5 network recommendations
        And I should see 2 MRECs in the recommendation section

        When I switch to "tablet landscape" view
        And I am viewing an article
        Then I should see 5 Homes recommendations
        And I should see 5 network recommendations
        And I should see 2 MRECs in the recommendation section

        When I switch to "tablet portrait" view
        And I am viewing an article
        Then I should see 5 Homes recommendations
        And I should see 5 network recommendations
        And I should see 2 MRECs in the recommendation section

        When I switch to "mobile" view
        And I am viewing an article
        Then I should see 5 Homes recommendations
        And I should see 5 network recommendations
        And I should see 2 MRECs in the recommendation section
    
    @DHO-13
    Scenario: Confirm that links are working for recommendations
        Given I am viewing an article
        When I click on the teaser image for first Homes recommendation
        Then I should be on a Home article or gallery page
    
        Given I am viewing an article
        When I click on the teaser text for first Homes recommendation
        Then I should be on a Home article or gallery page

    @DHO-14 @janice
    Scenario: Check that the network recommendations are shown for homepage
        Given I am on the homepage
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section

        When I switch to "tablet landscape" view
        And I am on the homepage
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section

        When I switch to "tablet portrait" view
        And I am on the homepage
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section

        When I switch to "mobile" view
        And I am on the homepage
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section
    
    @DHO-14 @janice
    Scenario: Confirm that links are working for recommendations
        Given I am on the homepage
        When I click on the teaser image for first network recommendation
        Then I should be on a Home article or gallery page
    
        Given I am on the homepage
        When I click on the teaser text for first network recommendation
        Then I should be on a Home article or gallery page