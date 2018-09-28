@directories @homes
Feature: Directories
    As a user
    I should be able to see the page of directory

    Scenario Outline: Users can see logo and external Links on the article page in <device> view
        Given I switch to "<device>" view
        Then I am currently viewing "bellaartista-designs-11031"
        * I can see the site logo and button clickable to open its page
        * I can see the social icons next to the logo
    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet landscape  |
            | tablet portrait   |

    Scenario Outline: Users can see the directories landing page in <device> view
        Given I switch to "<device>" view
        Then I am currently viewing "directories"
        * I can see the directory filters
        * I can see the directory "top" feed
        * I can see the directory "bottom" feed

    @high
        Examples:
            | device            |
            | mobile            |
    @med
        Examples:
            | device            |
            | desktop           |
    @low
        Examples:
            | device            |
            | tablet landscape  |
            | tablet portrait   |

