@local @javascript @DHO-106
Feature: The network header should appear at the top of the page with a menu

    Scenario: Check the menu items are displayed correctly
        Given I am on the homepage
        Then I should see the "Australian Women's Weekly" menu item with href "http://aww.com.au/"
        When I hover on the "More" menu item
        Then I should see the "Cleo" drop down menu item with href "http://www.cleo.com.au/"
        And I should see the "Competitions & Rewards" menu heading

        When I switch to mobile view
        And I click on the network header logo
        Then I should see the expanded menu
        And I should see the "Australian Women's Weekly" logo menu item with href "http://aww.com.au/"
        And I should see the "Cleo" text menu item with href "http://www.cleo.com.au/"
