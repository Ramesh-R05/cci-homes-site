@ad @high

Feature: Ads Location
    As a user
    I should see an ad slot containing the correct class name which is the adLocation parameter in the ad call.

#--Start testing in desktop view--#
    Scenario: Ads slot elements should have proper class name
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |home_outside_1    |
            |gpt-slot-3  |home_rhs_1        |
            |gpt-slot-4  |home_outside_2    |
            |gpt-slot-7  |home_rhs_2        |
            |gpt-slot-8  |home_outside_3    |
            |gpt-slot-9  |home_outOfPage_1  |
            |gpt-slot-10 |home_panel_1      |
            |gpt-slot-11 |home_panel_2      |
            |gpt-slot-12 |home_wallpaper_1  |
    When I click on the Load More button
    Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-15 |home_rhs_3    |

    Scenario: Ads slot elements should have proper class name on navigation section page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "real-homes"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |navigationsection_outside_1    |
            |gpt-slot-4  |navigationsection_rhs_1        |
            |gpt-slot-5  |navigationsection_outside_2    |
            |gpt-slot-8  |navigationsection_rhs_2        |
            |gpt-slot-9  |navigationsection_outside_3    |
            |gpt-slot-10 |navigationsection_outOfPage_1  |
            |gpt-slot-11 |navigationsection_panel_1      |
            |gpt-slot-12 |navigationsection_panel_2      |
            |gpt-slot-13 |navigationsection_wallpaper_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-16 |navigationsection_rhs_3   |

    Scenario: Ads slot elements should have proper class name on tag section page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "tags/luxury-home/"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0  |index_outside_1    |
            |gpt-slot-4  |index_rhs_1        |
            |gpt-slot-5  |index_outside_2    |
            |gpt-slot-8  |index_rhs_2        |
            |gpt-slot-9  |index_outside_3    |
            |gpt-slot-10 |index_outOfPage_1  |
            |gpt-slot-11 |index_panel_1      |
            |gpt-slot-12 |index_panel_2      |
            |gpt-slot-13 |index_wallpaper_1  |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-16 |index_rhs_3   |

    Scenario: Ads slot elements should have proper class name on brand page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "australian-house-and-garden"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | brandsection_outside_1 |
            |gpt-slot-3 | brandsection_rhs_1 |
            |gpt-slot-4 | brandsection_outside_2 |
            |gpt-slot-7 | brandsection_rhs_2 |
            |gpt-slot-8 | brandsection_outside_3 |
            |gpt-slot-9 | brandsection_outOfPage_1 |
            |gpt-slot-10 | brandsection_panel_1 |
            |gpt-slot-11 | brandsection_panel_2 |
            |gpt-slot-12 | brandsection_wallpaper_1 |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-15 |brandsection_rhs_3   |

    Scenario: Ads slot elements should have proper class name on gallery page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-gallery-3201"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | gallery_outside_1 |
            |gpt-slot-1 | gallery_outside_2 |
            |gpt-slot-3 | gallery_body_1 |
            |gpt-slot-4 | gallery_body_2 |
            |gpt-slot-16 | gallery_rhs_6 |
            |gpt-slot-17 | gallery_rhs_7 |
            |gpt-slot-18 | gallery_rhs_8 |
            |gpt-slot-19 | gallery_rhs_9 |
            |gpt-slot-20 | gallery_rhs_10 |
            |gpt-slot-11 | gallery_outside_3 |
            |gpt-slot-12 | gallery_outOfPage_1 |
            |gpt-slot-13 | gallery_panel_1 |
            |gpt-slot-14 | gallery_panel_2 |
            |gpt-slot-15 | gallery_wallpaper_1 |

    Scenario: Ads slot elements should have proper class name on article page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | homesarticle_outside_1 |
            |gpt-slot-1 | homesarticle_outside_2 |
            |gpt-slot-4 | homesarticle_rhs_1 |
            |gpt-slot-5 | homesarticle_rhs_2 |
            |gpt-slot-6 | homesarticle_rhs_3 |
            |gpt-slot-7 | homesarticle_rhs_4 |
            |gpt-slot-8 | homesarticle_outside_3 |
            |gpt-slot-9 | homesarticle_outOfPage_1 |
            |gpt-slot-10 | homesarticle_panel_1 |
            |gpt-slot-11 | homesarticle_panel_2 |
            |gpt-slot-12 | homesarticle_wallpaper_1 |

#--Start testing in mobile view--#

    Scenario: Ads slot elements should have proper class name on home page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see each ad slot element containing proper class name
         |no          |class-name        |
         |gpt-slot-0 | home_outside_1 |
         |gpt-slot-1 | home_body_1 |
         |gpt-slot-4 | home_outside_2 |
         |gpt-slot-5 | home_body_3 |
         |gpt-slot-8 | home_outside_3 |
         |gpt-slot-9 | home_outOfPage_1 |
        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name    |
            |gpt-slot-13 |home_body_5   |

    Scenario: Ads slot elements should have proper class name on navigation section page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "real-homes"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | navigationsection_outside_1 |
            |gpt-slot-2 | navigationsection_body_2 |
            |gpt-slot-5 | navigationsection_outside_2 |
            |gpt-slot-6 | navigationsection_body_4 |
            |gpt-slot-9 | navigationsection_outside_3 |
            |gpt-slot-10 | navigationsection_outOfPage_1 |

        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name     |
            |gpt-slot-14 |navigationsection_body_6 |

    Scenario: Ads slot elements should have proper class name on tag section page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "tags/luxury-home"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | index_outside_1 |
            |gpt-slot-2 | index_body_2 |
            |gpt-slot-5 | index_outside_2 |
            |gpt-slot-6 | index_body_4 |
            |gpt-slot-9 | index_outside_3 |
            |gpt-slot-10 | index_outOfPage_1 |

        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name     |
            |gpt-slot-14 |index_body_6 |

    Scenario: Ads slot elements should have proper class name on brand page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "australian-house-and-garden"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | brandsection_outside_1 |
            |gpt-slot-1 | brandsection_body_1 |
            |gpt-slot-4 | brandsection_outside_2 |
            |gpt-slot-5 | brandsection_body_3 |
            |gpt-slot-8 | brandsection_outside_3 |
            |gpt-slot-9 | brandsection_outOfPage_1 |

        When I click on the Load More button
        Then I should see each ad slot element containing proper class name
            |no          |class-name     |
            |gpt-slot-13 |brandsection_body_5   |

    Scenario: Ads slot elements should have proper class name on gallery page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-gallery-3201"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | gallery_outside_1 |
            |gpt-slot-1 | gallery_outside_2 |
            |gpt-slot-2 | gallery__1 |
            |gpt-slot-3 | gallery_body_1 |
            |gpt-slot-4 | gallery_body_2 |
            |gpt-slot-5 | gallery_body_3 |
            |gpt-slot-11 | gallery_outside_3 |
            |gpt-slot-12 | gallery_outOfPage_1 |

    Scenario: Ads slot elements should have proper class name on article page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I should see each ad slot element containing proper class name
            |no          |class-name        |
            |gpt-slot-0 | homesarticle_outside_1 |
            |gpt-slot-1 | homesarticle_outside_2 |
            |gpt-slot-2 | homesarticle__1 |
            |gpt-slot-3 | homesarticle_body_1 |
            |gpt-slot-8 | homesarticle_outside_3 |
            |gpt-slot-9 | homesarticle_outOfPage_1 |
