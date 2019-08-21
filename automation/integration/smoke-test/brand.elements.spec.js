/* 

Scenario Outline: Verify the <page> brand landing page
  Given I switch to "mobile" view
  When I am currently viewing "<page>"
  Then I should see the sign up button containing "<link>" url in "mobile" view
  And I should see the hero teaser
  And I should see a "top" feed item containing its image and clickable to open its page
  And I should see a "bottom" feed item containing its title and clickable to open its page
  Examples:
      | page                          | link                                                                         |
      | belle/                        | https://www.homestolove.com.au/belle-newsletter/                             |
      | real-living/                  | https://www.homestolove.com.au/real-living-newsletter/                       |
      | australian-house-and-garden/  | https://www.homestolove.com.au/australian-house-and-garden-newsletter/       |
      | inside-out/                   | https://www.homestolove.com.au/insideout-newsletter/                         |
      | country-style/                | https://www.homestolove.com.au/countrystyle-newsletter/                      |

*/

const brands = [
    {
        url: 'belle/',
        signUpLink: 'https://www.homestolove.com.au/belle-newsletter/',
        title: 'Belle'
    },
    {
        url: 'real-living/',
        signUpLink: 'https://www.homestolove.com.au/real-living-newsletter/',
        title: 'Real Living'
    },
    {
        url: 'australian-house-and-garden/',
        signUpLink: 'https://www.homestolove.com.au/australian-house-and-garden-newsletter/',
        title: 'Australian House And Garden'
    },
    {
        url: 'inside-out/',
        signUpLink: 'https://www.homestolove.com.au/insideout-newsletter/',
        title: 'Inside Out'
    },
    {
        url: 'country-style/',
        signUpLink: 'https://www.homestolove.com.au/countrystyle-newsletter/',
        title: 'Country style'
    }
];

describe('@sitAU verify the brand page elements', () => {
    describe('in mobile view', () => {
        brands.forEach(({ title, signUpLink, url }) => {
            describe(`${title} landing page`, () => {
                it('has a sign up button containing the correct link');
                it('has a hero teaser article');
                it('has 6 top feed items');
                it('has 6 bottom feed items');
            });
        });
    });
});
