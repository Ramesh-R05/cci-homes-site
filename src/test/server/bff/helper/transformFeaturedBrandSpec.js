import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const configStub = {
    brands: {
        site: [{ title: 'brand1', otherProp: 'otherProp1' }, { title: 'brand2', otherProp: 'otherProp2' }]
    }
};

const transformFeaturedBrand = proxyquire('../../../../app/server/bff/helper/transformFeaturedBrand', {
    '../../../config': configStub
}).default;

describe('TransformFeaturedBrand middleware', () => {
    it('should find given brand from config', () => {
        const expectBrand = { title: 'brand1', otherProp: 'otherProp1' };
        expect(transformFeaturedBrand({ articleSource: 'brand1' })).to.deep.equal(expectBrand);
    });
});
