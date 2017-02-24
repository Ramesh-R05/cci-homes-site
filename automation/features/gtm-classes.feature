@dataprep
Feature: Ensure our pages have the right gtm classes
    Scenario: Click through the elements with gtm classes to validate in GA
        Given I switch to "desktop" view
        * I can click the elements with gtm class
            | URL           | gtm class                                 |
            | belle         | gtm-hero-brand                            |
            | belle         | gtm-topteaserlist-brand                   |
            | belle         | gtm-bottomteaserlist-brand                |
            | belle         | gtm-loadmore-button                       |
            | real-homes    | gtm-topteaserlist-index                   |
            | real-homes    | gtm-bottomteaserlist-index                |
            | real-homes    | gtm-loadmore-button                       |
            |               | gtm-topteaserlist-homepage                |
            |               | gtm-bottomteaserlist-homepage             |
            |               | gtm-loadmore-button                       |
#           |               | gtm-hero-homepage                         |
