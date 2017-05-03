import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteModuleUrl = 'http://remoteModuleUrl.com/api';
const configStub = {
    services: { remote: { module: remoteModuleUrl } }
};

const getModules = proxyquire('../../../../app/server/bff/api/module', {
    '../../makeRequest': (args) => { return makeRequestStub(args) },
    '../../../config': configStub
});

describe(`Module API`, () => {
    describe(`#getModules`, () => {
        let footerModuleData;
        let headerNavigationModuleData;

        describe(`when passing no arguments`, () => {
            it(`should return an empty object`, (done) => {
                getModules().then((modules) => {
                    expect(modules).to.deep.eq({});
                    done()
                }).catch(done);
            });
        });

        describe(`when passing 1 argument`, () => {
            afterEach(() => {
                footerModuleData = null;
            });

            describe(`and the response returns an empty object`, () => {
                beforeEach(() => {
                    headerNavigationModuleData = {headernavigation: []};
                    makeRequestStub = sinon.stub().resolves([]);
                });

                it(`should return an empty array`, (done) => {
                    getModules('headernavigation').then((modules) => {
                        expect(makeRequestStub).to.have.been.calledWith(`${remoteModuleUrl}/headernavigation`);
                        expect(modules).to.deep.eq(headerNavigationModuleData);
                        done();
                    }).catch(done);
                });
            });

            describe(`and the response returns an object with an array of data`, () => {
                describe(`and there is no moduleName that matches what is expected`, () => {
                    beforeEach(() => {
                        headerNavigationModuleData = {headernavigation: []};
                        makeRequestStub = sinon.stub().resolves({ data: [ { moduleName: 'headernavigation' } ] });
                    });

                    it(`should return an empty array`, (done) => {
                        getModules('headernavigation').then((modules) => {
                            expect(modules).to.deep.eq(headerNavigationModuleData);
                            done();
                        }).catch(done);
                    });
                });

                describe(`and there is a moduleName that matches the arg being passed`, () => {
                    describe(`and there is no moduleManualContent property`, () => {
                        beforeEach(() => {
                            headerNavigationModuleData = {headernavigation: []};
                            makeRequestStub = sinon.stub().resolves({ data: [ { moduleName: 'headernavigation' } ] });
                        });

                        it(`should return an empty array`, (done) => {
                            getModules('headernavigation').then((modules) => {
                                expect(modules).to.deep.eq(headerNavigationModuleData);
                                done();
                            }).catch(done);
                        });
                    });

                    describe(`and there is a moduleManualContent with a data property`, () => {
                        beforeEach(() => {
                            footerModuleData = { moduleName: 'footer', moduleManualContent: { data: ['footer 1', 'footer 2'] } };
                            makeRequestStub = sinon.stub().resolves({
                                data: [ footerModuleData ]
                            });
                        });

                        it(`should return the footer data`, (done) => {
                            getModules('footer').then((modules) => {
                                expect(modules).to.deep.eq({footer: footerModuleData});
                                done();
                            }).catch(done);
                        });
                    });
                });
            });

            describe(`and the response from the module service returns an error`, () => {
                beforeEach(() => {
                    footerModuleData = ['footer 1', 'footer 2'];
                    makeRequestStub = sinon.stub().rejects({});
                });

                it(`should return an empty object`, (done) => {
                    getModules('footer').then((modules) => {
                        expect(modules).to.deep.eq({});
                        done();
                    }).catch(done);
                });
            });
        });

        describe(`when passing 2 argument`, () => {
            afterEach(() => {
                footerModuleData = null;
                headerNavigationModuleData = null;
            });

            describe(`and the response returns an empty object`, () => {
                beforeEach(() => {
                    footerModuleData = {};
                    headerNavigationModuleData = [];
                    makeRequestStub = sinon.stub().resolves([]);
                });

                it(`should return an object which contains a footer and headernavigation property with an empty array`, (done) => {
                    getModules('footer', 'headernavigation').then((modules) => {
                        expect(makeRequestStub).to.have.been.calledWith(`${remoteModuleUrl}/footer,headernavigation`);
                        expect(modules).to.deep.eq({footer: footerModuleData, headernavigation: headerNavigationModuleData});
                        done();
                    }).catch(done);
                });
            });

            describe(`and the response returns an object with an array of data`, () => {
                describe(`and there is a moduleName that matches only one of the items`, () => {
                    beforeEach(() => {
                        footerModuleData = {};
                        headerNavigationModuleData = ['header-1', 'header-2'];
                        makeRequestStub = sinon.stub().resolves({
                            data: [ { moduleName: 'headernavigation', moduleManualContent: { data: headerNavigationModuleData } } ]
                        });
                    });

                    it(`should return an object which contains a footer property with an empty array and the headernavigation with data`, (done) => {
                        getModules('footer', 'headernavigation').then((modules) => {
                            expect(modules).to.deep.eq({footer: footerModuleData, headernavigation: headerNavigationModuleData});
                            done();
                        }).catch(done);
                    });
                });

                describe(`and there is a moduleName that matches both args being passed`, () => {
                    describe(`and there is a moduleManualContent with a data property`, () => {
                        beforeEach(() => {
                            footerModuleData = {moduleName: 'footer', moduleManualContent: { data: ['footer 1', 'footer 2'] } };
                            headerNavigationModuleData = ['header 1', 'header 2'];
                            makeRequestStub = sinon.stub().resolves({
                                data: [
                                    footerModuleData,
                                    { moduleName: 'headernavigation', moduleManualContent: { data: headerNavigationModuleData } }
                                ]
                            });
                        });

                        it(`should return an object which contains the data for both footer and headernavigation`, (done) => {
                            getModules('footer', 'headernavigation').then((modules) => {
                                expect(modules).to.deep.eq({footer: footerModuleData, headernavigation: headerNavigationModuleData});
                                done();
                            }).catch(done);
                        });
                    });
                });
            });
        });
    });
});
