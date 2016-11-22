@homepage @homes 
Feature: Homepage
    As a user
    I should be able to see homepage

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in mobile view
        Given I am currently viewing the homepage
        When I switch to "mobile" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser
        * I should see the homepage hero containing its tag and clickable to open its page
        * I should see the homepage hero source and it should be clickable

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in tablet portrait view
        Given I am currently viewing the homepage
        When I switch to "tablet portrait" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero short teaser
        * I should see the homepage hero containing its tag and clickable to open its page
        * I should see the homepage hero source and it should be clickable

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in tablet landscape view
        Given I am currently viewing the homepage
        When I switch to "tablet landscape" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero containing its tag and clickable to open its page
        * I should see the homepage hero source and it should be clickable

    @hero @DDO-294
    Scenario: Verify the hero teaser element is functional correctly in desktop view
        Given I am currently viewing the homepage
        When I switch to "desktop" view
        * I should see the homepage hero element
        * I should see the homepage hero image
        * The homepage hero image should be clickable to open its page
        * I should see the homepage hero title
        * The homepage hero title should be clickable to open its page
        * I should see the homepage hero containing its tag and clickable to open its page
        * I should see the homepage hero source and it should be clickable

    @homepagefeed-top @DDO-235
    Scenario Outline: Verify the homepage top teaser elements are functional correctly in <device> view
        Given I am currently viewing the homepage
        When I switch to "<device>" view
        * I should see 10 top teasers on the homepage page
        * I should see each top teaser containing its image and clickable to open its page
        * I should see each top teaser containing its title and clickable to open its page
        * I should see each top teaser containing its tag and clickable to open its page
        Examples:
        |device|
        |tablet landscape|
        |tablet portrait |
        |desktop|
        |mobile|



