@live
Feature: I have an automated sanity for my live environments

    @version
     Scenario: I am able to see the site version
        * I can see the version of the site

    @testAdverts
    Scenario: Check Live Environment has the test advert configuration
        Given I am currently viewing the homepage
        * I can validate that "'targets':{'env':'test'}" is NOT present
