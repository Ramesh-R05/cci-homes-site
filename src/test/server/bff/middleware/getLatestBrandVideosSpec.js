import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const brandVideoResStub = {
    data: ['videoItem1', 'videoItem2', 'videoItem3']
};
const getEntityStub = sinon.stub().resolves({ articleSource: 'bell' });
const parseEntitiesStub = sinon.stub().returns(brandVideoResStub.data);
const getLatestTeasersStub = sinon.stub().resolves(brandVideoResStub);
const getLatestTeasersRejectStub = sinon.stub().rejects({ msg: 'fail' });
const reqStub = {
    query: {
        brand: 'bell'
    },
    app: {
        locals: {
            config: {
                services: {
                    remote: {
                        entity: '/service-for-entity'
                    }
                }
            }
        }
    }
};

const getLatestBrandVideos = isError =>
    proxyquire('../../../../app/server/bff/middleware/getLatestBrandVideos', {
        '../helper/parseEntity': { parseEntities: parseEntitiesStub },
        '../api': {
            getEntity: getEntityStub,
            getLatestTeasers: isError ? getLatestTeasersRejectStub : getLatestTeasersStub
        }
    }).default;

const expectLatestBrandItems = ['videoItem1', 'videoItem2', 'videoItem3'];

describe('getLatestBrandVideosMiddleware', () => {
    let getLatestBrandVideosMiddleware;
    let resStub;
    let nextStub;

    describe('if there is no request rejected', () => {
        beforeEach(() => {
            nextStub = sinon.spy();
            resStub = { body: {} };
            getLatestBrandVideosMiddleware = getLatestBrandVideos(false)(reqStub, resStub, nextStub);
        });

        it('should call getEntity function with expect argument', done => {
            getLatestBrandVideosMiddleware
                .then(() => {
                    expect(getEntityStub.callCount).to.equal(1);
                    expect(getEntityStub.args[0][0]).to.equal('section/bell');
                    done();
                })
                .catch(done);
        });

        it('should get expected latestBrandVideos', done => {
            getLatestBrandVideosMiddleware
                .then(() => {
                    expect(resStub.body.latestBrandVideos).to.deep.equal(expectLatestBrandItems);
                    done();
                })
                .catch(done);
        });
    });

    describe('if there are requests rejected', () => {
        beforeEach(() => {
            nextStub = sinon.spy();
            resStub = { body: {} };
            getLatestBrandVideosMiddleware = getLatestBrandVideos(true)(reqStub, resStub, nextStub);
        });

        it('should throw call next function with arguments', done => {
            getLatestBrandVideosMiddleware
                .then(() => {
                    expect(nextStub.called).to.equal(true);
                    expect(nextStub.args[0][0]).to.deep.equal({ msg: 'fail' });
                    done();
                })
                .catch(done);
        });
    });
});
