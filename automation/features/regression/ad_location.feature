@ad @high @homes

Feature: Ads Location
    As a user
    I should see an ad slot containing the correct class name which is the adLocation parameter in the ad call.

#--Start testing in desktop view--#

    Scenario: Ads slot elements should have proper class name
        Given I switch to "desktop" view
        When I am currently viewing the homepage
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |home_outside_1    |
            |Middle Leaderboard |home_outside_2    |
            |Bottom Leaderboard |home_outside_3    |
        And I should see each RHS ad slot element containing proper class name
            |ad                         |class-name    |
            |Top MREC RHS on Homepage   |home_rhs_1    |
            |Bottom MREC RHS            |home_rhs_2    |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |home_outofpage_1  |
            |Left Side Panel    |home_panel_1      |
            |Right Side Panel   |home_panel_2      |
            |Wallpaper          |home_wallpaper_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name    |
            |Load More MREC RHS |home_rhs_3    |

    Scenario: Ads slot elements should have proper class name on navigation section page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "real-homes"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name                    |
            |Top Leaderboard    |navigationsection_outside_1   |
            |Middle Leaderboard |navigationsection_outside_2   |
            |Bottom Leaderboard |navigationsection_outside_3   |
        And I should see each RHS ad slot element containing proper class name
            |ad                         |class-name                |
            |Top MREC RHS on Section    |navigationsection_rhs_1   |
            |Bottom MREC RHS            |navigationsection_rhs_2   |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name                    |
            |Out Of Page        |navigationsection_outofpage_1 |
            |Left Side Panel    |navigationsection_panel_1     |
            |Right Side Panel   |navigationsection_panel_2     |
            |Wallpaper          |navigationsection_wallpaper_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name                |
            |Load More MREC RHS |navigationsection_rhs_3   |

    Scenario: Ads slot elements should have proper class name on tag section page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "tags/luxury-home/"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |index_outside_1   |
            |Middle Leaderboard |index_outside_2   |
            |Bottom Leaderboard |index_outside_3   |
        And I should see each RHS ad slot element containing proper class name
            |ad                         |class-name    |
            |Top MREC RHS on Section    |index_rhs_1   |
            |Bottom MREC RHS            |index_rhs_2   |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |index_outofpage_1 |
            |Left Side Panel    |index_panel_1     |
            |Right Side Panel   |index_panel_2     |
            |Wallpaper          |index_wallpaper_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name  |
            |Load More MREC RHS |index_rhs_3 |

    Scenario: Ads slot elements should have proper class name on brand page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "australian-house-and-garden"
        Then I should see each outside ad slot element containing proper class name
            |ad                 |class-name        |
            |Top Leaderboard    |brandsection_outside_1   |
            |Middle Leaderboard |brandsection_outside_2   |
            |Bottom Leaderboard |brandsection_outside_3   |
        And I should see each RHS ad slot element containing proper class name
            |ad                       |class-name           |
            |Top MREC RHS on Brand    |brandsection_rhs_1   |
            |Bottom MREC RHS          |brandsection_rhs_2   |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |brandsection_outofpage_1 |
            |Left Side Panel    |brandsection_panel_1     |
            |Right Side Panel   |brandsection_panel_2     |
            |Wallpaper          |brandsection_wallpaper_1 |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                 |class-name  |
            |Load More MREC RHS |brandsection_rhs_3 |

    Scenario: Ads slot elements should have proper class name on gallery page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-gallery-3201"
        Then I should see each outside ad slot element containing proper class name
            |ad                             |class-name        |
            |Top Leaderboard                |gallery_outside_1 |
            |Teads                          |gallery_outside_2 |
            |Bottom Leaderboard on Gallery  |gallery_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                 |class-name     |
            |MREC After Slide 3 |gallery_body_2 |
            |MREC After Slide 7 |gallery_body_3 |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name     |
            |MREC RHS 1      |gallery_rhs_6  |
            |MREC RHS 2      |gallery_rhs_7  |
            |MREC RHS 3      |gallery_rhs_8  |
            |MREC RHS 4      |gallery_rhs_9  |
            |Sticky MREC RHS |gallery_rhs_10 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |gallery_outofpage_1 |
            |Left Side Panel    |gallery_panel_1     |
            |Right Side Panel   |gallery_panel_2     |
            |Wallpaper          |gallery_wallpaper_1 |

    Scenario: Ads slot elements should have proper class name on article page in desktop view
        Given I switch to "desktop" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I should see each outside ad slot element containing proper class name
            |ad                            |class-name        |
            |Top Leaderboard               |homesarticle_outside_1 |
            |Teads                         |homesarticle_outside_2 |
            |Bottom Leaderboard on Article |homesarticle_outside_3 |
        And I should see each RHS ad slot element containing proper class name
            |ad              |class-name     |
            |MREC RHS 1      |homesarticle_rhs_1  |
            |MREC RHS 2      |homesarticle_rhs_2  |
            |MREC RHS 3      |homesarticle_rhs_3  |
            |MREC RHS 4      |homesarticle_rhs_4  |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |homesarticle_outofpage_1 |
            |Left Side Panel    |homesarticle_panel_1     |
            |Right Side Panel   |homesarticle_panel_2     |
            |Wallpaper          |homesarticle_wallpaper_1 |


##--Start testing in mobile view--#

    Scenario: Ads slot elements should have proper class name on home page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing the homepage
        Then I should see each outside ad slot element containing proper class name
            |ad                     |class-name     |
            |Top Leaderboard        |home_outside_1 |
            |MREC Under Hero Teaser |home_body_1    |
            |Middle Leaderboard     |home_outside_2 |
            |Bottom Leaderboard     |home_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name  |
            |MREC In Bottom Feed  |home_body_3 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name        |
            |Out Of Page        |home_outofpage_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name    |
            |Load More MREC In Bottom Feed |home_body_5   |

    Scenario: Ads slot elements should have proper class name on navigation section page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "real-homes"
        Then I should see each outside ad slot element containing proper class name
            |ad                                 |class-name                  |
            |Top Leaderboard                    |navigationsection_outside_1 |
            |MREC Under Hero Teaser on Section  |navigationsection_body_2    |
            |Middle Leaderboard                 |navigationsection_outside_2 |
            |Bottom Leaderboard                 |navigationsection_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name               |
            |MREC In Bottom Feed  |navigationsection_body_4 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name                     |
            |Out Of Page        |navigationsection_outofpage_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name                 |
            |Load More MREC In Bottom Feed |navigationsection_body_6   |

    Scenario: Ads slot elements should have proper class name on tag section page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "tags/luxury-home"
        Then I should see each outside ad slot element containing proper class name
            |ad                                 |class-name      |
            |Top Leaderboard                    |index_outside_1 |
            |MREC Under Hero Teaser on Section  |index_body_2    |
            |Middle Leaderboard                 |index_outside_2 |
            |Bottom Leaderboard                 |index_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name   |
            |MREC In Bottom Feed  |index_body_4 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name         |
            |Out Of Page        |index_outofpage_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name     |
            |Load More MREC In Bottom Feed |index_body_6   |

    Scenario: Ads slot elements should have proper class name on brand page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "australian-house-and-garden"
        Then I should see each outside ad slot element containing proper class name
            |ad                             |class-name             |
            |Top Leaderboard                |brandsection_outside_1 |
            |MREC Under Hero Teaser on Brand|brandsection_body_1    |
            |Middle Leaderboard             |brandsection_outside_2 |
            |Bottom Leaderboard             |brandsection_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                   |class-name          |
            |MREC In Bottom Feed  |brandsection_body_3 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name                |
            |Out Of Page        |brandsection_outofpage_1  |
        When I click on the Load More button
        Then I should see each load more ad slot element containing proper class name
            |ad                            |class-name            |
            |Load More MREC In Bottom Feed |brandsection_body_5   |

    Scenario: Ads slot elements should have proper class name on gallery page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-gallery-3201"
        Then I should see each outside ad slot element containing proper class name
            |ad                            |class-name        |
            |Top Leaderboard               |gallery_outside_1 |
            |Teads                         |gallery_outside_2 |
            |Bottom Leaderboard on Gallery |gallery_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                         |class-name     |
            |MREC Under Hero Image      |gallery_body_1 |
            |MREC After Slide 3         |gallery_body_2 |
            |MREC After Slide 7         |gallery_body_3 |
            |MREC Before Recommendation |gallery_body_4 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name          |
            |Out Of Page        |gallery_outofpage_1 |

    Scenario: Ads slot elements should have proper class name on article page in mobile view
        Given I switch to "mobile" view
        When I am currently viewing "automation-test-article-with-hero-image-3193"
        Then I should see each outside ad slot element containing proper class name
            |ad                             |class-name             |
            |Top Leaderboard                |homesarticle_outside_1 |
            |Teads                          |homesarticle_outside_2 |
            |Bottom Leaderboard on Article  |homesarticle_outside_3 |
        And I should see each body ad slot element containing proper class name
            |ad                         |class-name          |
            |MREC Under Hero Image      |homesarticle_body_1 |
            |MREC Before Recommendation |homesarticle_body_2 |
        And I should see each additional ad slot element containing proper class name
            |ad                 |class-name               |
            |Out Of Page        |homesarticle_outofpage_1 |

