import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const headerNavigationStub = sinon.stub();
const hamburgerNavigationStub = sinon.stub();
const themeStub = sinon.stub();

const processModules = proxyquire('../../../../app/server/bff/helper/processModules', {
    '../moduleHandlers/headerNavigation': headerNavigationStub,
    '../moduleHandlers/hamburgerNavigation': hamburgerNavigationStub,
    '../moduleHandlers/theme': themeStub
});

const createMockModuleResponse = () => ({
    headernavigation: {
        name: 'headernavigation'
    },
    hamburgernavigation: {
        name: 'hamburgernavigation'
    }
});

function resetStubs() {
    headerNavigationStub.reset();
    hamburgerNavigationStub.reset();
    themeStub.reset();
}

describe('processModules', () => {
    describe('processing module data', () => {
        describe('with a theme module in the module response', () => {
            const themeModule = 'real-homestheme';
            const moduleResponse = { ...createMockModuleResponse(), [themeModule]: { name: themeModule } };
            let returnValue;

            beforeEach(() => {
                headerNavigationStub.returns(moduleResponse.headernavigation);
                hamburgerNavigationStub.returns(moduleResponse.hamburgernavigation);
                themeStub.returns(moduleResponse[themeModule]);
                returnValue = processModules(moduleResponse, themeModule);
            });

            afterEach(() => {
                resetStubs();
            });

            it('calls the headerNavigation module handler with the headernavigation data from the moduleResponse', () => {
                expect(headerNavigationStub).to.have.been.calledWith(moduleResponse.headernavigation);
            });
            it('calls the hamburgerNavigation module handler with the hamburgernavigation data from the moduleResponse', () => {
                expect(hamburgerNavigationStub).to.have.been.calledWith(moduleResponse.hamburgernavigation);
            });
            it('calls the theme module handler with the theme data from the moduleResponse', () => {
                expect(themeStub).to.have.been.calledWith(moduleResponse[themeModule]);
            });
            it('returns the processed module with the correct data', () => {
                expect(returnValue).to.deep.eq({
                    headerNavigation: moduleResponse.headernavigation,
                    hamburgerNavigation: moduleResponse.hamburgernavigation,
                    theme: moduleResponse[themeModule]
                });
            });
        });
        describe('without a theme module in the module response', () => {
            const moduleResponse = { ...createMockModuleResponse() };
            let returnValue;

            beforeEach(() => {
                headerNavigationStub.returns(moduleResponse.headernavigation);
                hamburgerNavigationStub.returns(moduleResponse.hamburgernavigation);
                returnValue = processModules(moduleResponse);
            });

            afterEach(() => {
                resetStubs();
            });

            it('calls the headerNavigation module handler with the headernavigation data from the moduleResponse', () => {
                expect(headerNavigationStub).to.have.been.calledWith(moduleResponse.headernavigation);
            });
            it('calls the hamburgerNavigation module handler with the hamburgernavigation data from the moduleResponse', () => {
                expect(hamburgerNavigationStub).to.have.been.calledWith(moduleResponse.hamburgernavigation);
            });
            it('never calls the theme module handler', () => {
                expect(themeStub).to.have.not.been.called;
            });
            it('returns the processed module with the correct data', () => {
                expect(returnValue).to.deep.eq({
                    headerNavigation: moduleResponse.headernavigation,
                    hamburgerNavigation: moduleResponse.hamburgernavigation
                });
            });
            it('does not have a theme in the returned object', () => {
                expect(returnValue).to.not.have.key('theme');
            });
        });
    });
    describe('error handling', () => {
        describe('returns an empty object when', () => {
            it('moduleResponse is an empty object', () => {
                expect(processModules({})).to.deep.eq({});
            });
            it('moduleResponse is an empty array', () => {
                expect(processModules([])).to.deep.eq({});
            });
            it('moduleResponse is populated array', () => {
                expect(processModules(['foo', 'bar', 'baz'])).to.deep.eq({});
            });
            it('moduleResponse is a function', () => {
                expect(processModules(() => {})).to.deep.eq({});
            });
        });
    });
});
