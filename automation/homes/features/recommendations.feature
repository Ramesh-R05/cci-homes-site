@local @recommendations @javascript @manual
Feature: Recommendations
    As a user
    I want to be given a list of recommended articles
    So I can be directed to interesting content

    @DHO-13 @article-detail-page
    Scenario: Check that the network recommendations are shown for articles
        Given I am viewing an article
        Then I should see 5 Homes recommendations
        And I should see 5 network recommendations
        And I should see 2 MRECs in the recommendation section
        Then I should see image link redirected to a recommendation page in the current window
        Then I should see title link redirected to a recommendation page in the current window
        Then I should see source link redirected to a recommendation page in the current window

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
    
    @DHO-14 @homepage
    Scenario: Check that the network recommendations are shown for homepage
        Given I am on the homepage
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section
        Then I should see image link redirected to a recommendation page in the current window
        Then I should see title link redirected to a recommendation page in the current window
        Then I should see source link redirected to a recommendation page in the current window

    @DHO-14 @section-landing
    Scenario: Check that the network recommendations are shown for section landing page
        Given I am on a section landing page
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section
        Then I should see image link redirected to a recommendation page in the current window
        Then I should see title link redirected to a recommendation page in the current window
        Then I should see source link redirected to a recommendation page in the current window
    
    @DHO-119 @tag-landing
    Scenario: Check that the network recommendations are shown for tag landing page
        Given I am viewing a tag landing page   
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section
        And I should see image link redirected to a recommendation page in the current window
        And I should see title link redirected to a recommendation page in the current window
        And I should see source link redirected to a recommendation page in the current window
    
    @DHO-130 @DHO-132 @brand-listing
    Scenario: Check that the network recommendations are shown for tag landing page   
        Given I am viewing a brand listing page 
        Then I should see 6 network recommendations
        And I should not see ad in the recommendation section
        And I should see image link redirected to a recommendation page in the current window
        And I should see title link redirected to a recommendation page in the current window
        And I should see source link redirected to a recommendation page in the current window