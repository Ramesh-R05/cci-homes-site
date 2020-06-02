import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import galleryStubData from '../../../../stubs/listings-gallery';
import listingsStubData from '../../../../stubs/listings-campaign-myer-eat-live';

const getLatestTeasersStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

getLatestTeasersStub.onFirstCall().returns(listingsStubData);
parseEntitiesStub.returns(galleryStubData);

const expectedBody = {
    entity: {
        nodeType: 'Gallery'
    }
};

const galleryMiddleware = proxyquire('../../../../app/server/bff/middleware/gallery', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api': {
        getLatestTeasers: getLatestTeasersStub
    }
}).default;

describe('gallery middleware', () => {
    let res = {
        body: {
            entity: {}
        }
    };

    const req = {};

    const next = () => {};

    describe(`when receiving data`, () => {
        describe(`and nodeType is not Gallery`, () => {
            before(() => {
                res.body.entity.nodeType = '';
            });

            after(() => {
                res.body.entity.nodeType = 'Gallery';
            });

            it('should not call service urls', done => {
                galleryMiddleware(req, res, next)
                    .then(() => {
                        expect(getLatestTeasersStub.called).to.be.false;

                        done();
                    })
                    .catch(done);
            });
        });
    });
});
