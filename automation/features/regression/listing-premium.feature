@listing @homes
Feature: Listing
    As a user
    I should be able to see the premimum listing page and all the sections on all devices

    Scenario Outline: Verify a premimum listing in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "directory/furniture-and-interiors/cotswold-inout-furniture-16256"
        And I scroll to the "full-width-gallery" section
        Then I can see the mixed media gallery with 3 items
        * I can see the scroll down button clickable to the next section
        When I scroll to the "company-profile" section
        Then I can see an image gallery with 5 items in the "company-profile" section
            * I can see the brand logo with the source equal to "http://d36kx15wbx6ooz.cloudfront.net/s3/digital-cougar-assets-dev/homes/2019/03/22/1553253573841_Logo.png" and clickable to the website url "https://cotswoldfurniture.com.au/"
            * I can navigate to all the social media accounts in "company-profile" section
            | title     | url                                                          |
            | facebook  | https://www.facebook.com/Cotswold-Furniture-185850414795545/ |
            | instagram | https://www.instagram.com/cotswoldfurniture/                 |
            | pinterest | https://www.pinterest.com/                                   |
            | twitter   | https://www.twitter.com/                                     |
        * I can see the summary subheading equal to "Exclusive import arrangements with highly esteemed international brands."
        * I can see the address equal to "UNIT 29, LEVEL 1 69 O’RIORDAN STREET ALEXANDRIA, NSW 2015"
        * I can see summary copy starting with "Since its founding in 1981, Cotswold"
        And I scroll to the "product" section
        Then I can see title equal to "" on "product" section
        Then I can see 4 products with links to purchase
        When I scroll to the "gallery-link" section
        Then I can see title equal to "Explore More" on "gallery-link" section
        Then I can see an image gallery with 2 items in the "gallery-link" section
        * I can see a button with the gallery name "DINING ROOM"
        When I click on the button with the gallery name "DINING ROOM"
        Then I "can" see the gallery modal
        And I can see the title of the gallery equal to "DINING ROOM"
        And I can see 10 images from the gallery in the modal
        And I can still see the gallery modal sticky header in view
        When I close the gallery modal
        Then I "cannot" see the gallery modal
        When I scroll to the "testimonials" section
        Then I can see title equal to "What people say" on "testimonials" section
        * I can see 3 testimonial cards with all of the content
        When I scroll to the "featured-article" section
        Then I can see an image gallery with 2 items in the "featured-article" section
        * I can see title equal to "Featured In" on "featured-article" section
        * I can see the featured article title equal to "Val’s converted schoolhouse in the country"
        * I can see the featured article summary starting with "It started life and a schoolhouse, and now"
        * I can see the featured article source equal to "INSIDE OUT" and date equal to "AUG 17 2018"
        * I can see the button clickable to the featured article with url "/gallery-vals-converted-schoolhouse-in-the-country-1676"
        When I scroll to the "contact" section
        Then I can see the title equal to "Get In Touch" and subtitle equal to "Want to know more? Contact Cotswold InOut Furniture directly."
            * I can navigate to all the social media accounts in "contact" section
            | title     | url                                                          |
            | facebook  | https://www.facebook.com/Cotswold-Furniture-185850414795545/ |
            | instagram | https://www.instagram.com/cotswoldfurniture/                 |
            | pinterest | https://www.pinterest.com/                                   |
            | twitter   | https://www.twitter.com/                                     |
            * I can see the contact details equal to
            | title   | content                                                        |
            | website | https://cotswoldfurniture.com.au/                              |
            | address | Unit 29, Level 1 69 O’Riordan Street Alexandria, NSW 2015      |
            | phone   | (02) 9906 3686                                                 |
        * I can see the contact form with all fields and submit button
        Examples:
            | device           |
            | desktop          |
            | tablet landscape |


    Scenario Outline: Verify a premimum listing in <device> view
        Given I switch to "<device>" view
        When I am currently viewing "directory/furniture-and-interiors/cotswold-inout-furniture-16256"
        And I scroll to the "full-width-gallery" section
        Then I can see the mixed media gallery with 3 items
        * I can see the scroll down button clickable to the next section
        When I scroll to the "company-profile" section
        Then I can see an image gallery with 5 items in the "company-profile" section
        * I can see the brand logo with the source equal to "http://d36kx15wbx6ooz.cloudfront.net/s3/digital-cougar-assets-dev/homes/2019/03/22/1553253573841_Logo.png" and clickable to the website url "https://cotswoldfurniture.com.au/"
        * I can see the summary subheading equal to "Exclusive import arrangements with highly esteemed international brands."
        * I can see summary copy starting with "Since its founding in 1981, Cotswold"
        And I scroll to the "product" section
        Then I can see title equal to "" on "product" section
        Then I can see 4 products with links to purchase
        When I scroll to the "gallery-link" section
        Then I can see title equal to "Explore More" on "gallery-link" section
        Then I can see an image gallery with 2 items in the "gallery-link" section
        * I can see a button with the gallery name "DINING ROOM"
        When I click on the button with the gallery name "DINING ROOM"
        Then I "can" see the gallery modal
        And I can see the title of the gallery equal to "DINING ROOM"
        And I can see 10 images from the gallery in the modal
        And I can still see the gallery modal sticky header in view
        When I close the gallery modal
        Then I "cannot" see the gallery modal
        When I scroll to the "testimonials" section
        Then I can see title equal to "What people say" on "testimonials" section
        * I can see 3 testimonial cards with all of the content
        When I scroll to the "featured-article" section
        Then I can see an image gallery with 2 items in the "featured-article" section
        * I can see title equal to "Featured In" on "featured-article" section
        * I can see the featured article title equal to "Val’s converted schoolhouse in the country"
        * I can see the featured article source equal to "INSIDE OUT" and date equal to "AUG 17 2018"
        * I can see the button clickable to the featured article with url "/gallery-vals-converted-schoolhouse-in-the-country-1676"
        When I scroll to the "contact" section
        Then I can see the title equal to "Get In Touch" and subtitle equal to "Want to know more? Contact Cotswold InOut Furniture directly."
            * I can navigate to all the social media accounts in "contact" section
            | title     | url                                                          |
            | facebook  | https://www.facebook.com/Cotswold-Furniture-185850414795545/ |
            | instagram | https://www.instagram.com/cotswoldfurniture/                 |
            | pinterest | https://www.pinterest.com/                                   |
            | twitter   | https://www.twitter.com/                                     |
            * I can see the contact details equal to
            | title   | content                                                        |
            | website | https://cotswoldfurniture.com.au/                              |
            | address | Unit 29, Level 1 69 O’Riordan Street Alexandria, NSW 2015      |
            | phone   | (02) 9906 3686                                                 |
        * I can see the contact form with all fields and submit button
        Examples:
            | device          |
            | mobile          |
            | tablet portrait |
