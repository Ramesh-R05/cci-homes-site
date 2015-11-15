@local @competition @javascript
Feature: Competition Form

    @janice
    Scenario: Check competition form
        Given I am viewing a competition page
        Then I should see "dc/02495dc3-28bb-4aa0-b2a9-0f020f9db611" as the embed code
        And I fill in the following information:
        |field                              |value                          |
        |Title                              |Ms                             |
        |First Name                         |Janice                         |
        |Last Name                          |S.                             |
        |Address Line 1                     |66 Goulburn St.                | 
        |Address Line 2                     |                               |
        |City/Suburb                        |Sydney                         |
        |State                              |NSW                            |
        |Postcode                           |2000                           |
        |DOB Day                            |Default Value                  |    
        |DOB Month                          |Default Value                  |
        |DOB Year                           |Default Value                  |
        |Email Address                      |Default Value                  |
        |Tell us in 25 words or less        |Janice Test                    |
        |I accept the Terms and Conditions  |Yes                            |
        And I click ENTER button
        Then I should see "Thanks for entering" as a conformation message
