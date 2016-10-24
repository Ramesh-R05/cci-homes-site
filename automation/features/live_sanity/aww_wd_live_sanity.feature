@liveaww @livewd
Feature: I have an automated sanity for my live environments

    @article
    Scenario: User is interact with the article
        * I switch to "desktop" view
        Given I navigate to an article page
        Then I can see the social share icons
        And see the publishing date
        And I can see the reactions to this article

    @contentTags
    Scenario: User is able to find content base on tags
        Given the user lands on the "Comedy" tage page
        Then the results are presented on the page

    @search
    Scenario: User is able to search content
        Given I am currently viewing the homepage
        When I search for "kim" using the search box
        Then the results are presented on the page
        When I click on Load More
#        Then I should see additional results
