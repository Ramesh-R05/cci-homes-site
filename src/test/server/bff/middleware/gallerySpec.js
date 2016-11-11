import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import galleryStubData from '../../../../stubs/listings-gallery';

const getLatestTeasersStub = () => ({data: {}});
const parseEntitiesStub = sinon.stub();

parseEntitiesStub.returns(galleryStubData);

const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);


const expectedBody = {
    entity: {
        nodeType: 'Gallery',
    },
    moreGalleries: galleryStubData
};

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/gallery', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersSpy
    }
});

describe('gallery middleware', () => {
    let res = {
        body: {
            entity: {}
        }
    };

    const req = {};

    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and nodeType is not Gallery`, () => {

            before(()=>{
                res.body.entity.nodeType = '';
            });

            after(()=>{
                res.body.entity.nodeType = 'Gallery';
            });

            it('should not call service urls', (done) => {
                articleMiddleware(req, res, next).then(() => {

                    expect(getLatestTeasersSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and nodeType is Gallery`, () => {

            it('should call getLatestTeasers', (done) => {
                articleMiddleware(req, res, next).then(() => {

                    expect(getLatestTeasersSpy.firstCall.calledWith(10, 0, 'Gallery', 'nodeTypeAlias')).to.be.true;

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done) => {
                articleMiddleware(req, res, next).then(() => {

                    expect(getLatestTeasersSpy.firstCall.calledWith(10, 0, 'Gallery', 'nodeTypeAlias')).to.be.true;
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});
