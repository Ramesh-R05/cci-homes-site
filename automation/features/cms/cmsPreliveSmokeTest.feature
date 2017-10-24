@cmsprelive
Feature: CMS Prelive Smoke Test
    As an editor
    I should be able to check if prelive url for cms is up

    Scenario: Login cms and check if prelive site is up
        Given I am logging in Prelive CMS
        When I am currently viewing "editContent.aspx?id=" of live "Homes Article" Page
        * I should be able to publish the live item
        * I should be able to see the "preview" URL of live item
        * I should be able to see the "live" URL of live item
