import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const getModulesStub = sinon.stub();
const getThemeModuleForQueryStub = sinon.stub();
const processModulesStub = sinon.stub();
const loggerStub = { error: sinon.stub() };
const nextSpy = sinon.spy();

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
    '../helper/processModules': processModulesStub,
    '../helper/getThemeModuleForQuery': getThemeModuleForQueryStub,
    '../api/module': getModulesStub,
    '../../../../logger': loggerStub
});

const requestMock = () => ({
    query: {}
});

const getModulesResponseMock = () => ({
    headerNavigation: {
        name: 'headernavigation'
    },
    hamburgerNavigation: {
        name: 'headernavigation'
    }
});

const getModulesDefaultArgs = ['hamburgernavigation', 'headernavigation', 'featuredbrand', 'listingcategories'];

function resetStubsAndSpies() {
    getModulesStub.reset();
    getThemeModuleForQueryStub.reset();
    processModulesStub.reset();
    loggerStub.error.reset();
    nextSpy.reset;
}

describe('pageModulesMiddleware', () => {
    describe('when there is module data returned from getModules', () => {
        const req = requestMock();
        const res = {};
        const themeModuleNameMock = 'theme';
        const moduleResposeMock = getModulesResponseMock();

        beforeEach(() => {
            getThemeModuleForQueryStub.withArgs(req.query).returns(themeModuleNameMock);
            getModulesStub.withArgs(...getModulesDefaultArgs, themeModuleNameMock).returns(moduleResposeMock);
            processModulesStub.withArgs(moduleResposeMock, themeModuleNameMock).returns(moduleResposeMock);
        });

        afterEach(() => {
            resetStubsAndSpies();
        });

        it('should call getThemeModuleForQuery with the request query', done => {
            pageModulesMiddleware(req, res, nextSpy)
                .then(() => {
                    expect(getThemeModuleForQueryStub).to.be.calledWith(req.query);
                    done();
                })
                .catch(done);
        });

        it('should call getModules with the hard-coded argumnents and the value returned from getThemeModuleForQuery', done => {
            pageModulesMiddleware(req, res, nextSpy)
                .then(() => {
                    expect(getModulesStub).to.be.calledWith(...getModulesDefaultArgs, themeModuleNameMock);
                    done();
                })
                .catch(done);
        });

        it('should call processModules with the response from getModules & the response from getThemeModuleForQuery', done => {
            pageModulesMiddleware(req, res, nextSpy)
                .then(() => {
                    expect(processModulesStub).to.be.calledWith(moduleResposeMock, themeModuleNameMock);
                    done();
                })
                .catch(done);
        });

        it('adds the modules to the repsonse body', done => {
            pageModulesMiddleware(req, res, nextSpy)
                .then(() => {
                    expect(res.body).to.deep.equal({
                        ...moduleResposeMock
                    });
                    done();
                })
                .catch(done);
        });

        it('calls the next middleware in the chain', done => {
            pageModulesMiddleware(req, res, nextSpy)
                .then(() => {
                    expect(nextSpy).to.have.been.called;
                    done();
                })
                .catch(done);
        });
    });
    describe('error handling', () => {
        describe('when getThemeModuleForQuery throws an error', () => {
            let req;
            const res = {};
            const exception = new Error('getThemeModule error');

            beforeEach(() => {
                req = requestMock();
                getThemeModuleForQueryStub.throws(exception);
            });

            afterEach(() => {
                resetStubsAndSpies();
            });

            it('should pass the error to the logger', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(loggerStub.error.calledWith(exception)).to.be.true;
                        done();
                    })
                    .catch(done);
            });

            it('should not call any subsequent methods', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(getModulesStub).to.not.be.called;
                        expect(processModulesStub).to.not.be.called;
                        done();
                    })
                    .catch(done);
            });

            it('should call the next middleware in the chain', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(nextSpy.called).to.be.true;
                        done();
                    })
                    .catch(done);
            });
        });
        describe('when getModules response is empty', () => {
            let req;
            const res = {};
            const mockTheme = 'mocktheme';
            const moduleResponse = {};

            beforeEach(() => {
                req = requestMock();
                getThemeModuleForQueryStub.returns(mockTheme);
                getModulesStub.resolves(moduleResponse);
            });

            afterEach(() => {
                resetStubsAndSpies();
            });

            it('should call processModules with the empty response', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(processModulesStub).to.be.calledWith(moduleResponse, mockTheme);
                        done();
                    })
                    .catch(done);
            });

            it('should call the next middleware in the chain', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(nextSpy.called).to.be.true;
                        done();
                    })
                    .catch(done);
            });
        });
        describe('when processModules throws an error', () => {
            let req;
            const res = {};
            const exception = new Error('processModulesStub error');

            beforeEach(() => {
                req = requestMock();
                processModulesStub.throws(exception);
            });

            afterEach(() => {
                resetStubsAndSpies();
            });

            it('should pass the error to the logger', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(loggerStub.error.calledWith(exception)).to.be.true;
                        done();
                    })
                    .catch(done);
            });

            it('should call the next middleware in the chain', done => {
                pageModulesMiddleware(req, res, nextSpy)
                    .then(() => {
                        expect(nextSpy.called).to.be.true;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});
