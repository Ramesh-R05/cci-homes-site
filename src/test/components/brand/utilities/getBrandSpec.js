import getBrand from '../../../../app/components/brand/utilities/getBrand';
import brands from '../../../../app/config/brands';

describe('Get Brand Method', () => {

    const config = {brands: {uniheader: brands}};
    let brandTitle = null;
    let expected = null;
    let result = null;

    it(`should return the brand object from the passed in config`, () => {

        brandTitle = 'real living';
        expected = {
            "title": "real living",
            "url": "/real-living/",
            "id" : "realliving",
            "urlName" : "real-living",
            "imageUrl": "/assets/svgs/realliving_black.svg",
            "logo": "/assets/svgs/realliving_black.svg",
            "newsletterUrl": "http://www.homestolove.com.au/real-living-newsletter/",
            "subscribe" :{
                "image": "/assets/images/brand-pages/subscribe/real-living.jpg",
                "link": "https://www.magshop.com.au/store/homestolove"
            },
            "social" :{
                "facebook": "https://www.facebook.com/reallivingmagazine",
                "twitter": "https://twitter.com/reallivingmag",
                "instagram": "https://instagram.com/reallivingmag/",
                "pinterest": "https://au.pinterest.com/reallivingmag/"
            }
        };
        result = getBrand(config, brandTitle);

        expect(result).to.deep.equal(expected);

    });

    it(`should return an empty brand object from the passed in config`, () => {

        brandTitle = 'real livingggg';
        expected = {};
        result = getBrand(config, brandTitle);

        expect(result).to.deep.equal(expected);

    });

});
