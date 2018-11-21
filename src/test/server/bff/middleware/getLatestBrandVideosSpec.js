import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const brandVideoResStub = {
    data: ['videoItem1', 'videoItem2', 'videoItem3']
};
const makeRequestStub = sinon.stub().resolves({ articleSource: 'bell' });
const parseEntitiesStub = arg => arg;
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
        '../api/listing': isError ? getLatestTeasersRejectStub : getLatestTeasersStub,
        '../../makeRequest': makeRequestStub
    });

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

        it('should call makeRequest function with expect argument', done => {
            getLatestBrandVideosMiddleware
                .then(() => {
                    expect(makeRequestStub.callCount).to.equal(1);
                    expect(makeRequestStub.args[0][0]).to.equal('/service-for-entity/section/bell');
                    done();
                })
                .catch(done);
        });

        it('should get expect latestBrandVideos', done => {
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
