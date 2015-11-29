@javascript @live @manual @regressionTest 
Feature: Regression Testing
    As the project owner
    I should see the ads on the homepage
    So I can ensure that the site is generating revenue

    Scenario: Homepage
        Given I am on the homepage
        And I should see 30 teasers on the homepage
        And I should see 5 galleries in the gallery of galleries
        And I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should not see a 'Load More' button
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present
    
    Scenario: Section Landing page - Home Tour
        Given I am on a section landing page
        And I should see "HOME TOURS" heading
        And I should see 20 teasers
        And I should see 5 galleries in the gallery of galleries
        And I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see a 'Load More' button
        When I click on the 'Load More' button
        Then I should see 38 teasers
        And I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 3 "ad--section-middle-leaderboard" ad slot
        And I should see 4 "ad--section-mrec" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present
    
    Scenario: Brand Listing page - Australian House and Garden
        Given I am viewing a brand listing page
        Then I should see "Australian House and Garden" logo
        And I should see 12 teasers on the brand listing page
        And I should see the Subscribe image link redirected to the magshop in the current window
        And I should see the Subscribe title link redirected to the magshop in the current window
        And I should see the Facebook link opens in a new window
        And I should see the Instagram link opens in a new window
        And I should see the Pinterest link opens in a new window
        And I should not see the Twitter link  
        And I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should not see a 'Load More' button
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present

    Scenario: Tag Landing Page - Feature Home
        Given I am viewing a tag landing page
        Then I should see "FEATURE HOME" heading
        And I should see 20 teasers on the tag landing page
        And I should see "FEATURE HOME" as a primary tag on all teasers
        And I should see a 'Load More' button
        And I should see 1 "ad--section-top-leaderboard" ad slot
        And I should see 1 "ad--section-middle-leaderboard" ad slot
        And I should see 1 "ad--section-bottom-leaderboard" ad slot
        And I should see 2 "ad--section-mrec" ad slot
        And I should see a 'Load More' button
        And I should be navigated to the "tags/feature-home" page in the current window after clicking any primary tag
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present

    Scenario: Article Page
        Given I am viewing a "how-to-get-black-and-white-decorating-right-1397" page   
        Then I should see "How to get black and white decorating right" as the title
        And I should see a hero image
        And I should see "Find out how to use a combination of black and white to striking effect in your home." within the summary
        And I should see "Technically black and white are not even colours" within the first paragragh
        And I should see the "Real Living" logo redirected to the brand listing page in the current window
        And I should see 1 "ad--article-top" ad slot
        And I should see 1 "ad--article-beneath-recommendations" ad slot
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present

    Scenario: Gallery Page
        Given I am viewing a "gallery-paula-and-martins-dramatic-timber-home-renovation-1413" page  
        Then I should see "Paula and Martin’s dramatic timber home renovation" as the gallery title
        Then I should see "Interior designer Paula Bowen and her husband, Martin Breeze" contained in the gallery summary
        And I should see the right slide arrows
        And I should see "1/12" as the gallery count
        And I should see "I love how the elements all marry together" contained in the image caption
        And I should see "CREATIVE HOME" as the sub-section title above the gallery summary
        And I should see 1 "gallery__aside-ad" ad slot
        And I should see 1 "gallery__footer-ad" ad slot
        And I should see 1st MREC after the first 3 images
        And I should see the swipe to skip add button
        And I should see 2nd MREC after the next 4 images
        And I should see the swipe to skip add button
        And I should see 3rd MREC after the next 4 images
        And I should see the swipe to skip add button
        And I can validate that "\"ads\"\:\{\"targets\"\:\{\"env\"\:\"test\"\}\}" is NOT present
