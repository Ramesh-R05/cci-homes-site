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
            "imageUrl": "/assets/svgs/realliving_black.svg",
            "url": "/real-living/",
            "title": "real living",
            "id" : "realliving",
            "newsletterUrl": "https://pages.s7.exacttarget.com/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=real_living"
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
