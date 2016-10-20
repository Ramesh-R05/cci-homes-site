@wnheader @DDO-62 @homes
Feature: WN Header
    As a user
    I should be able to see the WN header

@homepage
    Scenario: Verify mobile WN header is functional correctly on homepage
        When I switch to "mobile" view
        Given I am currently viewing the homepage
        * To Love is clickable to open the menu list of all sites
        * I can navigate to all sites in the mobile menu list on the left side
            |title                      |url                                |
            |Australian Women's Weekly  |http://aww.com.au/                 |
            |Woman's Day                |http://womansday.com.au/           |
            |Food To Love               |http://www.foodtolove.com.au/      |
            |Homes To Love              |http://www.homestolove.com.au/     |
            |beautyheaven               |http://www.beautyheaven.com.au/    |
        * I can navigate to all sites in the mobile menu list on the right side
            |title                             |url                                        |
            |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
            |Elle                              |http://www.elle.com.au/                    |
            |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
            |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
            |Dolly                             |http://www.dolly.com.au/                   |
            |Mother & Baby                     |http://www.motherandbaby.com.au/           |
            |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
            |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
            |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
            |Woman's Day Win it                |http://winit.womansday.com.au/             |
            |Food To Love Win it               |http://winit.foodtolove.com.au/            |
            |Homes To Love Win it              |http://winit.homestolove.com.au/           |
            |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
            |Take 5 Win it                     |http://winit.take5mag.com.au/              |
            |Take 5                            |http://www.take5mag.com.au/                |
            |Reader Rewards                    |http://www.readerrewards.com.au/           |
        * The mobile menu list can be closed by clicking To Love

@section
    Scenario: Verify mobile WN header is functional correctly on section landing page
        When I switch to "mobile" view
        Given I am currently viewing "section"
        * To Love is clickable to open the menu list of all sites
        * I can navigate to all sites in the mobile menu list on the left side
            |title                      |url                                |
            |Australian Women's Weekly  |http://aww.com.au/                 |
            |Woman's Day                |http://womansday.com.au/           |
            |Food To Love               |http://www.foodtolove.com.au/      |
            |Homes To Love              |http://www.homestolove.com.au/     |
            |beautyheaven               |http://www.beautyheaven.com.au/    |
        * I can navigate to all sites in the mobile menu list on the right side
            |title                             |url                                        |
            |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
            |Elle                              |http://www.elle.com.au/                    |
            |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
            |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
            |Dolly                             |http://www.dolly.com.au/                   |
            |Mother & Baby                     |http://www.motherandbaby.com.au/           |
            |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
            |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
            |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
            |Woman's Day Win it                |http://winit.womansday.com.au/             |
            |Food To Love Win it               |http://winit.foodtolove.com.au/            |
            |Homes To Love Win it              |http://winit.homestolove.com.au/           |
            |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
            |Take 5 Win it                     |http://winit.take5mag.com.au/              |
            |Take 5                            |http://www.take5mag.com.au/                |
            |Reader Rewards                    |http://www.readerrewards.com.au/           |
        * The mobile menu list can be closed by clicking To Love

@article
    Scenario: Verify mobile WN header is functional correctly on article page
        When I switch to "mobile" view
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
        * To Love is clickable to open the menu list of all sites
        * I can navigate to all sites in the mobile menu list on the left side
            |title                      |url                                |
            |Australian Women's Weekly  |http://aww.com.au/                 |
            |Woman's Day                |http://womansday.com.au/           |
            |Food To Love               |http://www.foodtolove.com.au/      |
            |Homes To Love              |http://www.homestolove.com.au/     |
            |beautyheaven               |http://www.beautyheaven.com.au/    |
        * I can navigate to all sites in the mobile menu list on the right side
            |title                             |url                                        |
            |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
            |Elle                              |http://www.elle.com.au/                    |
            |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
            |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
            |Dolly                             |http://www.dolly.com.au/                   |
            |Mother & Baby                     |http://www.motherandbaby.com.au/           |
            |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
            |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
            |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
            |Woman's Day Win it                |http://winit.womansday.com.au/             |
            |Food To Love Win it               |http://winit.foodtolove.com.au/            |
            |Homes To Love Win it              |http://winit.homestolove.com.au/           |
            |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
            |Take 5 Win it                     |http://winit.take5mag.com.au/              |
            |Take 5                            |http://www.take5mag.com.au/                |
            |Reader Rewards                    |http://www.readerrewards.com.au/           |
        * The mobile menu list can be closed by clicking To Love

@homepage
    Scenario: Verify desktop WN header is functional correctly on homepage
        When I switch to "desktop" view
        Given I am currently viewing the homepage
        * To Love is unclickable
        * I can navigate to all sites in the desktop list on the header
            |title                      |url                                |
            |Australian Women's Weekly  |http://aww.com.au/                 |
            |Woman's Day                |http://womansday.com.au/           |
            |Food To Love               |http://www.foodtolove.com.au/      |
            |Homes To Love              |http://www.homestolove.com.au/     |
            |beautyheaven              |http://www.beautyheaven.com.au/    |
        * More should show more sites on hover
        * I can navigate to all sites in the desktop list under More
            |title                             |url                                        |
            |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
            |Elle                              |http://www.elle.com.au/                    |
            |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
            |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
            |Dolly                             |http://www.dolly.com.au/                   |
            |Mother & Baby                     |http://www.motherandbaby.com.au/           |
            |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
            |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
            |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
            |Woman's Day Win it                |http://winit.womansday.com.au/             |
            |Food To Love Win it               |http://winit.foodtolove.com.au/            |
            |Homes To Love Win it              |http://winit.homestolove.com.au/           |
            |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
            |Take 5 Win it                     |http://winit.take5mag.com.au/              |
            |Take 5                            |http://www.take5mag.com.au/                |
            |Reader Rewards                    |http://www.readerrewards.com.au/           |
        * The list under More should disappear if there is no hover on More

@section
    Scenario: Verify desktop WN header is functional correctly on section landing page
        When I switch to "desktop" view
        Given I am currently viewing "section"
         * To Love is unclickable
         * I can navigate to all sites in the desktop list on the header
             |title                      |url                                |
             |Australian Women's Weekly  |http://aww.com.au/                 |
             |Woman's Day                |http://womansday.com.au/           |
             |Food To Love               |http://www.foodtolove.com.au/      |
             |Homes To Love              |http://www.homestolove.com.au/     |
             |beautyheaven               |http://www.beautyheaven.com.au/    |
         * More should show more sites on hover
         * I can navigate to all sites in the desktop list under More
             |title                             |url                                        |
             |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
             |Elle                              |http://www.elle.com.au/                    |
             |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
             |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
             |Dolly                             |http://www.dolly.com.au/                   |
             |Mother & Baby                     |http://www.motherandbaby.com.au/           |
             |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
             |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
             |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
             |Woman's Day Win it                |http://winit.womansday.com.au/             |
             |Food To Love Win it               |http://winit.foodtolove.com.au/            |
             |Homes To Love Win it              |http://winit.homestolove.com.au/           |
             |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
             |Take 5 Win it                     |http://winit.take5mag.com.au/              |
             |Take 5                            |http://www.take5mag.com.au/                |
             |Reader Rewards                    |http://www.readerrewards.com.au/           |
         * The list under More should disappear if there is no hover on More

@article
    Scenario: Verify desktop WN header is functional correctly on article page
        Given I am currently viewing "fashion/automation-test-article-with-hero-image-3663"
         * To Love is unclickable
         * I can navigate to all sites in the desktop list on the header
             |title                      |url                                |
             |Australian Women's Weekly  |http://aww.com.au/                 |
             |Woman's Day                |http://womansday.com.au/           |
             |Food To Love               |http://www.foodtolove.com.au/      |
             |Homes To Love              |http://www.homestolove.com.au/     |
             |beautyheaven               |http://www.beautyheaven.com.au/    |
         * More should show more sites on hover
         * I can navigate to all sites in the desktop list under More
             |title                             |url                                        |
             |Harper's Bazaar                   |http://www.harpersbazaar.com.au/           |
             |Elle                              |http://www.elle.com.au/                    |
             |Gourmet Traveller                 |http://www.gourmettraveller.com.au/        |
             |Cosmopolitan                      |http://www.cosmopolitan.com.au/            |
             |Dolly                             |http://www.dolly.com.au/                   |
             |Mother & Baby                     |http://www.motherandbaby.com.au/           |
             |Bounty Rewards                    |http://www.bountyrewards.com.au/           |
             |Sweepon.com.au                    |http://www.sweepon.com.au/                 |
             |Australian Women's Weekly Win it  |http://winit.aww.com.au/                   |
             |Woman's Day Win it                |http://winit.womansday.com.au/             |
             |Food To Love Win it               |http://winit.foodtolove.com.au/            |
             |Homes To Love Win it              |http://winit.homestolove.com.au/           |
             |Australian Geographic Win it      |http://winit.australiangeographic.com.au/  |
             |Take 5 Win it                     |http://winit.take5mag.com.au/              |
             |Take 5                            |http://www.take5mag.com.au/                |
             |Reader Rewards                    |http://www.readerrewards.com.au/           |
         * The list under More should disappear if there is no hover on More

@homepage
Scenario: Verify WN header on homepage on different screen sizes
    Given I am currently viewing the homepage
    When I switch to "mobile" view
    * I should not see any sites displaying on the WN header
    * I should see the clickable To Love
    When I scroll the page down
    * I should not see the WN header

    When I switch to "tablet portrait" view
    And I scroll the page up
    * I should see the unclickable To Love
    When I scroll the page down
    * I should not see the WN header

    When I switch to "tablet landscape" view
    And I scroll the page up
    * I should see the unclickable To Love
    When I scroll the page down
    * I should not see the WN header

    When I switch to "desktop" view
    And I scroll the page up
    * I should see the unclickable To Love
    When I scroll the page down
    * I should not see the WN header
