const Context = {
    getExecutedActions: function() {
        return [];
    }
};

const safada = require('../utils/safada/safada')(Context);

describe('Safada', function() {
    describe('actionMock', () => {
        it('creates unique functions per invocation', function() {
            expect(safada.actionMock()).to.not.equal(safada.actionMock());
        })
    });

    describe('wasActionExecuted', () => {
        it('returns false when there are no matches', function() {
            const action = new function() {};
            expect(safada.wasActionExecuted(action)).to.be.false;
        })
    });
});
