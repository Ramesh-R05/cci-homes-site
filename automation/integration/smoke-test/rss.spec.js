/* 
Scenario: Verify the RSS feed
  Given I am currently viewing "rss"
  Then I should see "link" tag containing "http://homes-site-au.sit.bxm.net.au" value
  * I should see "dc:creator" tag containing "Homes To Love" in CDATA
  * I should see "title" tag containing a value
  * I should see "dc:creator" tag containing a value
  * I should see "content:encoded" tag containing a value
  When I am currently viewing "rss/summary"
  * I should see "title" tag containing a value
  * I should not see "content:encoded" tag
  When I am currently viewing "rss/summary/realliving"
  * I should see "title" tag containing a value
  When I am currently viewing "rss/info"
  * I should see "rss/summary/realliving" in json
*/