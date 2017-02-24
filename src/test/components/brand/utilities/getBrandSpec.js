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
            "id" : "realliving"
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
