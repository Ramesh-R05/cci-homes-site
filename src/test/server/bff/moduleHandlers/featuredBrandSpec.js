import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const transformFeaturedBrandStub = sinon.stub();
const loggerStub = sinon.stub();

const featuredBrand = proxyquire('../../../../app/server/bff/moduleHandlers/featuredBrand', {
    '../helper/transformFeaturedBrand': transformFeaturedBrandStub,
    '../../../../logger': loggerStub
})

describe('featuredBrand', () => {
    describe('when pass in correct moduleData', () => {
        const moduleData = [
            'brand1', 'brand2', 'brand3'
        ];

        beforeEach(() => {
            transformFeaturedBrandStub.reset()
            featuredBrand(moduleData)
        })

        it(`should call transformFeaturedBrand ${moduleData.length} times`, () => {
            expect(transformFeaturedBrandStub.callCount).to.equal(moduleData.length)
        })
    })

    describe('when pass incorrect moduleData', () => {
        const moduleData = null;
        let result;
        beforeEach(() => {
            transformFeaturedBrandStub.reset()
            result = featuredBrand(moduleData)
        })

        it(`should not call transformFeaturedBrand`, () => {
            expect(transformFeaturedBrandStub.callCount).to.equal(0)
        })

        it('should return empty item list', () => {
            expect(result).to.deep.equal({ items: [] })
        })
    })
})