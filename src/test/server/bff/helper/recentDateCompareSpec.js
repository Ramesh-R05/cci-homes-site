import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();
const isAfterStub = sinon.stub();
const momentStub = sinon.stub().returns({ isAfter: isAfterStub });

const recentDateCompare = proxyquire('../../../../app/server/bff/helper/recentDateCompare', {
    moment: momentStub
});

describe('recent date compare function', () => {
    describe('when a key is not passed', () => {
        let result;

        before(() => {
            result = recentDateCompare({}, {}, '');
        });

        it('returns 0', () => {
            expect(result).to.eq(0);
        });
    });

    describe('when a key is passed', () => {
        describe(' and the key is valid and present in both itemA and itemB', () => {
            describe('and the itemA date comes before the itemB date', () => {
                let result;

                before(() => {
                    isAfterStub.returns(true);
                    result = recentDateCompare({ key: '0000' }, { key: '111' }, 'key');
                });

                after(() => {
                    isAfterStub.reset();
                });

                it('returns 1', () => {
                    expect(result).to.eq(1);
                });
            });

            describe('and itemB date comes before itemA date', () => {
                let result;

                before(() => {
                    isAfterStub.returns(false);
                    result = recentDateCompare({ key: '0000' }, { key: '111' }, 'key');
                });

                after(() => {
                    isAfterStub.reset();
                });

                it('returns -1', () => {
                    expect(result).to.eq(-1);
                });
            });
        });
    });
});
