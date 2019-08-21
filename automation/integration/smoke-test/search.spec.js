/* 
Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
  Given I switch to "<device>" view
  When I am currently viewing "<pageUrl>"
  * I should see the search icon in the navigation bar
  Given I click on the search icon in the navigation bar
  Then I should see the search input
  Given I scroll down the page
  Then I should see the search input
  * I should be able to search a keyword "house" on "navigation bar" and see the result page
  * I should be able to search a keyword "home" on "search result page" and see the result page
  Examples:
  |device             |page       |pageUrl                                            |
  |desktop            |homepage   |                                                   |

  Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
    Given I switch to "<device>" view
    When I am currently viewing "<pageUrl>"
    * I should be able to search a keyword "house" on "navigation bar" and see the result page
    Examples:
    |device             |page       |pageUrl                                            |
    |tablet landscape   |section    |real-homes                                         |

  Scenario Outline: Verify the search feature on <page> in <device> (Desktop style)
    Given I switch to "<device>" view
    When I am currently viewing "<pageUrl>"
    * I should be able to search a keyword "house" on "navigation bar" and see the result page
    Examples:
    |device             |page        |pageUrl                                                         |
    |tablet portrait    |article     |ikea-collaborates-with-louis-vuitton-designer-4197     
*/
