import getBrand from '../../../../app/components/brand/utilities/getBrand';
import siteBrands from '../../../../app/config/siteBrands';

describe('Get Brand Method', () => {
    const config = {
        brands: {
            site: siteBrands
        }
    };
    let brandTitle = null;
    let expected = null;
    let result = null;

    describe('when passed a brand title that exists', () => {
        it(`should return the brand object from the passed in config`, () => {
            brandTitle = 'real living';
            expected = {
                title: 'real living',
                url: '/real-living/',
                id: 'realliving',
                urlName: 'real-living',
                imageUrl: '/assets/images/brand-pages/headerlogos/real-living.svg',
                heroImageUrl: '/assets/images/brand-pages/herologos/real-living.svg',
                logo: '/assets/images/brand-pages/headerlogos/real-living.svg',
                newsletterUrl: 'https://www.homestolove.com.au/real-living-newsletter/',
                subscribe: {
                    image: '/assets/images/brand-pages/subscribe/real-living.jpg',
                    link: 'https://www.magshop.com.au/store/homestolove'
                },
                social: {
                    facebook: 'https://www.facebook.com/reallivingmagazine',
                    twitter: 'https://twitter.com/reallivingmag',
                    instagram: 'https://instagram.com/reallivingmag/',
                    pinterest: 'https://au.pinterest.com/reallivingmag/'
                },
                newsletterSignupInBodyCopy: 'https://cb.sailthru.com/join/5l0/signup-realliving-article-iframe-bottom'
            };
            result = getBrand(config, brandTitle);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('when passed a non-existent brand title', () => {
        it(`should return an empty brand object from the passed in config`, () => {
            brandTitle = 'real livingggg';
            expected = {};
            result = getBrand(config, brandTitle);

            expect(result).to.deep.equal(expected);
        });
    });
});
