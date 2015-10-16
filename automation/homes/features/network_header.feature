@local @DHO-106 @javascript
Feature: The network header should appear at the top of the page with a menu
    
    @desktop
    Scenario: On desktop, check the menu items are displayed correctly
        Given I am on the homepage
        Then I should see the following sites opened in the current window with the specific url:
            |name                     |url                               |
            |Australian Women's Weekly|http://aww.com.au/                |
            |Woman's Day              |http://womansday.com.au/          |
            #|Food To Love             |http://www.foodtolove.com.au/     |
            |Homes To Love            |http://www.homestolove.com.au/    |   
        When I hover on the "More" menu item
        Then I should see the "Competitions & Rewards" menu heading
        And I should see the additionals sites opened in the current window with the specific url:
            |name                     |url                                |
            |Elle                     |http://www.elle.com.au/            |
            |Gourmet Traveller        |http://www.gourmettraveller.com.au/|
            |Cosmopolitan             |http://www.cosmopolitan.com.au/    |
            |Cleo                     |http://www.cleo.com.au/            |
            |Dolly                    |http://www.dolly.com.au/           |
            |Shop Til You Drop        |http://www.shoptilyoudrop.com.au/  |
            |Mother & Baby            |http://www.motherandbaby.com.au/   |
            #|Bounty Rewards           |http://www.bountyrewards.com.au/   |
            |Harper's Bazaar          |http://www.harpersbazaar.com.au/   |
            |Take 5                   |http://www.take5mag.com.au/        |
            |Sweepon.com.au           |http://www.sweepon.com.au/         |
            |Woman's Day Win it       |http://winit.womansday.com.au/     |
            |Reader Rewards           |http://www.readerrewards.com.au/   |
    
    @mobile
    Scenario: On mobile, check the menu items are displayed correctly
        Given I am on the homepage
        And I click on the network header logo
        Then I should see the expanded menu
        And I should see the following logos opened in the current window with the specific url:
            |name                     |url                               |
            |Australian Women's Weekly|http://aww.com.au/                |
            |Woman's Day              |http://womansday.com.au/          |
            #|Food To Love             |http://www.foodtolove.com.au/     |
            |Homes To Love            |http://www.homestolove.com.au/    |   
        And I should see the additionals links opened in the current window with the specific url:
            |name                     |url                                |
            |Elle                     |http://www.elle.com.au/            |
            |Gourmet Traveller        |http://www.gourmettraveller.com.au/|
            |Cosmopolitan             |http://www.cosmopolitan.com.au/    |
            |Cleo                     |http://www.cleo.com.au/            |
            |Dolly                    |http://www.dolly.com.au/           |
            |Shop Til You Drop        |http://www.shoptilyoudrop.com.au/  |
            |Mother & Baby            |http://www.motherandbaby.com.au/   |
            #|Bounty Rewards           |http://www.bountyrewards.com.au/   |
            |Harper's Bazaar          |http://www.harpersbazaar.com.au/   |
            |Take 5                   |http://www.take5mag.com.au/        |
            |Sweepon.com.au           |http://www.sweepon.com.au/         |
            |Woman's Day Win it       |http://winit.womansday.com.au/     |
            |Reader Rewards           |http://www.readerrewards.com.au/   |
