@livefood
Feature: I have an automated sanity for my live environments

    @recipe
    Scenario: User is interact with the recipe
        * I switch to "desktop" view
        Given I am currently viewing the homepage
        And I search for "Lamb" recipe
        When I navigate to the first recipe
        Then I can see the recipe info
        And share the recipe in facebook

    @contentTags
    Scenario: User is able to find content base on tags
        Given the user lands on the "pasta" recipes search
        Then the recipe search results are presented on the page

    @search
    Scenario: User is able to search content
        Given I am currently viewing the homepage
        When I search for "chicken" recipe
        Then the recipe search results are presented on the page
        When I click on Load More
#        Then I should see additional results
