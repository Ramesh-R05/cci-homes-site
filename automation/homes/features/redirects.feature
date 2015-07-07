@local
Feature: The application checks the redirect microservice

    Scenario: Browser should be redirected on urls which are setup to redirect
        When I navigate to a page which redirects
        Then I should be on the homepage
