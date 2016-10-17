const proxyquire = require('proxyquire').noCallThru();
const sandbox = sinon.sandbox.create();
const mockContext = { dispatch: sandbox.spy() };

const MenuActions = proxyquire('../../app/actions/menuActions', {});

describe('MenuActions', () => {
    beforeEach(() => {
        sandbox.reset();
    });

    it('dispatches an event to activate the main menu', () => {
        MenuActions.activateSideMenu(mockContext);
        expect(mockContext.dispatch).to.have.been.calledWith('MENU:SIDE_MENU_ACTIVATE');
    });
});
