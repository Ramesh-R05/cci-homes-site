import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const singleBrandResStub = {
    data: ['brandItem1', 'brandItem2', 'brandItem3']
};
const brandUniheaderStub = [{ id: 'brand1', title: 'brand1' }, { id: 'brand2', title: 'brand2' }, { id: 'brand3', title: 'brand3' }];

const parseEntitiesStub = arg => arg;
const getLatestTeasersStub = sinon.stub().resolves(singleBrandResStub);
const getLatestTeasersRejectStub = sinon.stub().rejects({ msg: 'fail' });
const reqStub = {
    app: {
        locals: {
            config: {
                brands: {
                    uniheader: brandUniheaderStub
                }
            }
        }
    }
};

const latestBrandItemsMiddlewareFunc = isError =>
    proxyquire('../../../../app/server/bff/middleware/latestBrandItems', {
        '../helper/parseEntity': { parseEntities: parseEntitiesStub },
        '../api/listing': isError ? getLatestTeasersRejectStub : getLatestTeasersStub
    });

const expectLatestBrandItems = {
    brand1: ['brandItem1', 'brandItem2', 'brandItem3'],
    brand2: ['brandItem1', 'brandItem2', 'brandItem3'],
    brand3: ['brandItem1', 'brandItem2', 'brandItem3']
};

describe('latestBrandItemsMiddleware', () => {
    let LatestBrandItemsMiddleware;
    let resStub;
    let nextStub;

    describe('if there is no request rejected', () => {
        beforeEach(() => {
            nextStub = sinon.spy();
            resStub = { body: {} };
            LatestBrandItemsMiddleware = latestBrandItemsMiddlewareFunc(false)(reqStub, resStub, nextStub);
        });

        it('should get expect latestBrandItems', done => {
            LatestBrandItemsMiddleware.then(() => {
                expect(resStub.body.latestBrandItems).to.deep.equal(expectLatestBrandItems);
                done();
            }).catch(done);
        });
    });

    describe('if there are requests rejected', () => {
        beforeEach(() => {
            nextStub = sinon.spy();
            resStub = { body: {} };
            LatestBrandItemsMiddleware = latestBrandItemsMiddlewareFunc(true)(reqStub, resStub, nextStub);
        });

        it('should throw call next function with arguments', done => {
            LatestBrandItemsMiddleware.then(() => {
                expect(nextStub.called).to.equal(true);
                expect(nextStub.args[0][0]).to.deep.equal({ msg: 'fail' });
                done();
            }).catch(done);
        });
    });
});
