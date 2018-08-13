import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

let getModulesStub = () => {};
const parseEntityStub = () => {};
let parseEntitiesStub = () => {};

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
    '../helper/parseEntity': {
        parseEntity: (...args) => parseEntityStub(...args),
        parseEntities: (...args) => parseEntitiesStub(...args)
    },
    '../api/module': () => getModulesStub(),
    '../../../../logger': { error() {} }
});

describe('PageModules middleware', () => {
    let res = {};
    const module = [];
    let req = {};
    let next;

    describe('when the response is valid', () => {
        before(() => {
            next = sinon.spy();
            getModulesStub = sinon.stub().resolves({ headernavigation: module });
        });

        after(() => {
            req = {};
            res = {};
        });

        it('should set `req.data.headernavigation` to equal the response', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.deep.eq({ headernavigation: module });
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('processing module data', () => {
        describe('when data contains `headernavigation`', () => {
            const headernavigation = ['Nav item 1', 'Nav Item 2'];
            before(() => {
                req = {
                    data: {
                        headernavigation
                    }
                };
                res = {};

                next = sinon.spy();
                parseEntitiesStub = sinon.stub().returns(headernavigation);
                getModulesStub = sinon.stub().resolves({ headernavigation });
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should set `res.body.headerNavigation`', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.been.calledWith(headernavigation, { contentTitle: 'name' });
                        expect(res.body.headerNavigation).to.deep.equal({ items: headernavigation });
                        done();
                    })
                    .catch(done);
            });
        });
        describe('when data contains `hamburgernavigation`', () => {
            const hamburgernavigation = ['Nav item 1', 'Nav Item 2'];

            before(() => {
                req = {
                    data: {
                        hamburgernavigation
                    }
                };
                res = {};
                next = sinon.spy();
                parseEntitiesStub = sinon.stub().returns(hamburgernavigation);
                getModulesStub = sinon.stub().resolves({ hamburgernavigation });
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should set `res.body.hamburgernavigation`', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.been.calledWith(hamburgernavigation, { contentTitle: 'name' });
                        expect(res.body.hamburgerNavigation).to.deep.equal({ items: hamburgernavigation });
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });
        describe('when getModules response is empty', () => {
            before(() => {
                next = sinon.spy();
                getModulesStub = sinon.stub().resolves({});
                parseEntitiesStub = sinon.stub();
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should not add any new properties to `res.body`', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.not.be.called;
                        expect(res).to.deep.equal({ body: {} });
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
