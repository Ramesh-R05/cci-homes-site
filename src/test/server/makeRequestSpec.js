import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

let getRequestStub = args => {};
const requestStub = {
    get(params, cb) {
        const { err, res, body } = getRequestStub(params);
        cb(err, res, body);
    }
};

const lruResponse = {
    get: () => {},
    set: () => {}
};

const makeRequest = proxyquire('../../app/server/makeRequest', {
    request: requestStub,
    'lru-cache': () => lruResponse,
    '../../logger': { error() {}, debug() {} }
});

describe('#makeRequest()', () => {
    let lruGetStub;
    let lruSetStub;
    beforeEach(() => {
        lruGetStub = sinon.stub(lruResponse, 'get');
        lruSetStub = sinon.stub(lruResponse, 'set');
    });

    afterEach(() => {
        lruGetStub.restore();
        lruSetStub.restore();
        getRequestStub = getRequestStub.restore ? getRequestStub.restore() : args => {};
    });

    it('should return the body of the response when status is a 200', done => {
        const requestRes = { body: { entity: {} }, res: { headers: {}, statusCode: 200 }, err: null };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest('http://url.com')
            .then(res => {
                expect(res).to.eq(requestRes.body);
                done();
            })
            .catch(done);
    });

    it('should attempt to get the cache response, then set the cache response when there is no cache', done => {
        const url = 'http://url.com';
        const expire = 60;
        const expectedExpire = 1000 * expire;
        const headers = { 'cache-control': `random, max-age=${expire}` };
        const requestRes = { body: { entity: {} }, res: { headers, statusCode: 200 }, err: null };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest(url)
            .then(() => {
                expect(lruGetStub).to.have.been.calledWith(url);
                expect(lruSetStub).to.have.been.calledWith(url, requestRes.body, expectedExpire);
                done();
            })
            .catch(done);
    });

    it('should get the cache response when set and not need to request external data or set any cache data', done => {
        const url = 'http://url.com';
        const cachedRes = { entity: {} };
        lruGetStub.returns(cachedRes);
        getRequestStub = sinon.stub();
        makeRequest(url)
            .then(res => {
                expect(lruGetStub).to.have.been.calledWith(url);
                expect(res).to.eq(cachedRes);
                expect(getRequestStub).to.not.have.been.called;
                expect(lruSetStub).to.not.have.been.called;
                done();
            })
            .catch(done);
    });

    it('should return the body of the response when status is a 202', done => {
        const requestRes = { body: { entity: {} }, res: { headers: {}, statusCode: 202 }, err: null };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest('http://url.com')
            .then(res => {
                expect(res).to.eq(requestRes.body);
                done();
            })
            .catch(done);
    });

    it('should return an error response when status is a 404', done => {
        const requestRes = { body: { entity: {} }, res: { statusCode: 404 }, err: null };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest('http://url.com')
            .catch(res => {
                expect(res.message).to.eq(requestRes.body);
                expect(res.err).to.eq(requestRes.err);
                expect(res.status).to.eq(requestRes.res.statusCode);
                done();
            })
            .catch(done);
    });

    it('should return an error response when there is an err', done => {
        const requestRes = { body: { entity: {} }, res: { statusCode: 200 }, err: 'Page error' };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest('http://url.com')
            .catch(res => {
                expect(res.message).to.eq(requestRes.body);
                expect(res.err).to.eq(requestRes.err);
                expect(res.status).to.eq(requestRes.res.statusCode);
                done();
            })
            .catch(done);
    });

    it('should return an error response with a 503 status code when there is no response or no error', done => {
        const requestRes = { body: { entity: {} } };
        getRequestStub = sinon.stub().returns(requestRes);
        makeRequest('http://url.com')
            .catch(res => {
                expect(res.message).to.eq(requestRes.body);
                expect(res.err).to.eq(requestRes.err);
                expect(res.status).to.eq(503);
                done();
            })
            .catch(done);
    });
});
