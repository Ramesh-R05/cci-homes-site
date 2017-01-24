import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import itemsStubData from '../../../../stubs/listings-food-Homes-navigation-DIY';

const getLatestTeasersStub = () => ({data: {}});
const parseEntitiesStub = sinon.stub();

parseEntitiesStub.returns(itemsStubData);

const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const expectedBody = {
    entity: {
        nodeType: 'HomesArticle',
        tags: [
            "food:Garden/Outdoor:Garden style:Tropical garden",
            "food:Garden/Outdoor:Garden style:Coastal garden",
            "food:Homes navigation:DIY",
            "food:Topic:In focus"
        ]
    },
    leftHandSide: {items: itemsStubData}
};

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/article', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersSpy
    }
});

describe('article middleware', () => {
    let res = {
            body: {
            entity: {
                nodeType: 'HomesArticle',
                tags: [
                    "food:Garden/Outdoor:Garden style:Tropical garden",
                    "food:Garden/Outdoor:Garden style:Coastal garden",
                    "food:Homes navigation:DIY",
                    "food:Topic:In focus"
                ]
            }
        }
    };

    const req = {};

    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and nodeType is not HomesArticle`, () => {

            before(()=>{
                res.body.entity.nodeType = '';
            });

            after(()=>{
                res.body.entity.nodeType = 'HomesArticle';
            });

            it('should not call service urls', (done) => {
                articleMiddleware(req, res, next).then(() => {

                    expect(getLatestTeasersSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and nodeType is HomesArticle`, () => {

            it('should use the tags from the response object to call getLatestTeasers', (done)=> {
                articleMiddleware(req, res, next).then(() => {

                    let queryTags = 'food:Homes navigation:DIY';

                    expect(getLatestTeasersSpy.firstCall.calledWith(14, 0, `tags eq '${queryTags}'`)).to.be.true;

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)=> {
                articleMiddleware(req, res, next).then(() => {

                    let queryTags = 'food:Homes navigation:DIY';

                    expect(getLatestTeasersSpy.firstCall.calledWith(14, 0, `tags eq '${queryTags}'`)).to.be.true;
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});
