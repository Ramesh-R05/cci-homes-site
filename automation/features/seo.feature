Feature: Ensure our Network has good SEO

    @seo
    Scenario: Ensure Metadata has the correct index on the live sites
    # Meta description should contain <meta name="robots" content="INDEX,FOLLOW"/>
        * I can validate the below sites have the correct meta description
            | site                                             | meta                                                              |
            | view-source:http://www.dolly.com.au              | meta name="robots" content="INDEX,FOLLOW"                           |
            | view-source:http://www.cosmopolitan.com.au       | meta name="robots" content="INDEX,FOLLOW"                           |
            | view-source:http://www.homestolove.com.au        | meta name="robots" content="INDEX,FOLLOW"                           |
            | view-source:http://www.aww.com.au                | meta name="robots" content="INDEX,FOLLOW"                         |
            | view-source:http://www.womensweekly.co.nz        | meta name="robots" content="INDEX,FOLLOW"                         |
            | view-source:http://www.foodtolove.com.au         | meta name="robots" content="INDEX,FOLLOW"                         |
            | view-source:http://www.foodtolove.co.nz          | meta name="robots" content="INDEX,FOLLOW"                         |
            | view-source:http://www.womansday.com.au          | meta name="robots" content="INDEX,FOLLOW"                         |
            | view-source:http://www.womansday.co.nz           | meta name="robots" content="INDEX,FOLLOW"                         |

    @seo
    Scenario: Ensure Canonical Metadata has the correct index on the live sites
    # Meta description should contain link rel="canonical" href="http://www.cosmopolitan.com.au/"
        * I can validate the below sites have the correct meta description
            | site                                             | meta                                                              |
            | view-source:http://www.cosmopolitan.com.au       | link rel="canonical" href="http://www.cosmopolitan.com.au/"       |
            | view-source:http://www.dolly.com.au              | link rel="canonical" href="http://www.dolly.com.au/"              |
            | view-source:http://www.foodtolove.com.au         | link rel="canonical" href="http://www.foodtolove.com.au/"         |
            | view-source:http://www.foodtolove.co.nz          | link rel="canonical" href="http://www.foodtolove.co.nz/"          |
            | view-source:http://www.homestolove.com.au        | link rel="canonical" href="http://www.homestolove.com.au/"        |
            | view-source:http://www.aww.com.au                | link rel="canonical" href="http://www.aww.com.au/"                |
            | view-source:http://www.womansday.com.au          | link rel="canonical" href="http://www.womansday.com.au/"          |
            | view-source:http://www.womensweekly.co.nz        | link rel="canonical" href="http://www.womensweekly.co.nz/"        |
            | view-source:http://www.womansday.co.nz           | link rel="canonical" href="http://www.womansday.co.nz/"           |
            | view-source:http://www.elle.com.au               | link rel='canonical' href='http://www.elle.com.au/'               |
            | view-source:http://www.harpersbazaar.com.au      | link rel='canonical' href='http://www.harpersbazaar.com.au/'      |
            | view-source:http://www.gourmettraveller.com.au   | link rel='canonical' href='http://www.gourmettraveller.com.au/'   |

    @seo
    Scenario: Verify crawlers are enable correctly
        * I can validate the below sites have the correct robots.txt config
            | site                              |
            | www.dolly.com.au/robots.txt       |
            | www.homestolove.com.au/robots.txt |
            | www.aww.com.au/robots.txt         |
            | www.womensweekly.co.nz/robots.txt |
            | www.foodtolove.com.au/robots.txt  |
            | www.foodtolove.co.nz/robots.txt   |
            | www.womansday.com.au/robots.txt   |
            | www.womansday.co.nz/robots.txt    |

    #below scenario can only be run when the URL is up, so this can not be monitor every 2 hours
    Scenario: Verify crawlers are enable correctly for non live site
        * I can validate the below DEV sites have the correct robots.txt config
            | site                                                  |
            | automation.aww-site.wn.bauer-media.net.au/robots.txt  |
            | dev.aww-site.wn.bauer-media.net.au/robots.txt         |
            | dev.nzaww-site.wn.bauer-media.net.au/robots.txt       |
            | automation.wd-site.wn.bauer-media.net.au/robots.txt   |
            | dev.wd-site.wn.bauer-media.net.au/robots.txt          |
            | dev.nzwd-site.wn.bauer-media.net.au/robots.txt        |
            | automation.food-site.wn.bauer-media.net.au/robots.txt |
            | dev.food-site.wn.bauer-media.net.au/robots.txt        |
            | dev.nzfood-site.wn.bauer-media.net.au/robots.txt      |
            | automation.homes-site.wn.bauer-media.net.au/robots.txt|
            | dev.homes-site.wn.bauer-media.net.au/robots.txt       |
            | automation.dolly-site.bauer-media.net.au/robots.txt   |
            | dev.dolly-site.bauer-media.net.au/robots.txt          |
            | automation.cosmo-site.bauer-media.net.au/robots.txt   |
            | dev.cosmo-site.bauer-media.net.au/robots.txt          |
