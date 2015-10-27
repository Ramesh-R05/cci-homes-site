@local @load-more @javascript
Feature: Load more
    As a user
    I should to be able to click on a 'Load more' button to see more results
  
    Scenario: Load More From Section Landing Page 0
        When I am on the "section" landing page
        And I should see a 'Load More' button
        When I click on the 'Load More' button
        Then I should see 38 teasers
        And I should see a 'Load More' button
        When I click on the 'Load More' button
        Then I should see 41 teasers
        And I should not see a 'Load More' button

    Scenario: Load More From Section Landing Page 1
        When I am on the "section" landing page1
        Then I should see 20 teasers
        And I should see a 'Load More' button
        When I click on the 'Load More' button
        Then I should see 21 teasers
        And I should not see a 'Load More' button

    Scenario: Load More From Section Landing Page 2
        When I am on the "section" landing page2
        Then I should see 1 teasers
        And I should not see a 'Load More' button