const proxyquire = require('proxyquire');
const sandbox = sinon.createSandbox();
const mockContext = { dispatch: sandbox.spy() };

proxyquire.noCallThru();

const activateSideMenu = proxyquire('../../app/actions/menuActions', {});

describe('MenuActions', () => {
    beforeEach(() => {
        sandbox.reset();
    });

    it('dispatches an event to activate the main menu', () => {
        activateSideMenu(mockContext);
        expect(mockContext.dispatch).to.have.been.calledWith('MENU:SIDE_MENU_ACTIVATE');
    });
});
