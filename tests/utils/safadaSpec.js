var Context = {
    getExecutedActions: function() {
        return [];
    }
};

var safada = require('../utils/safada/safada')(Context);

describe('Safada', function() {
    describe('actionMock', function() {
        it('creates unique functions per invocation', function() {
            expect(safada.actionMock()).to.not.equal(safada.actionMock());
        })
    });

    describe('wasActionExecuted', function() {
        it('returns false when there are no matches', function() {
            var action = new function() {};
            expect(safada.wasActionExecuted(action)).to.be.false;
        })
    });
});