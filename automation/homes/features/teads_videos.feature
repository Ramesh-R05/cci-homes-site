@local @teads @javascript
Feature: User can see TEADs video in Homes to love
# this is configured in DFP and is also dependent of TEADs 3rd party API
# contact DigitalCampaigns <DigitalCampaigns@bauer-media.com.au> before disabling this feature

    @DIGEVT-49
    Scenario: Check article displays TEADs video
        Given I am viewing an article with a hero image
        Then I can scroll into view a TEADs video
