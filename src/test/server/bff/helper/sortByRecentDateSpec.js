import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const recentDateCompareStub = sinon.stub();

const sortByRecentDate = proxyquire('../../../../app/server/bff/helper/sortByRecentDate', {
    './recentDateCompare': recentDateCompareStub
}).default;

describe('sortByRecentDate function', () => {
    describe('when passed an array', () => {
        let args;
        let key;

        before(() => {
            args = [{ contentTitle: 'a' }, { contentTitle: 'z' }, { contentTitle: 'f' }, { contentTitle: 'c' }];
            key = 'updated_at';
            sortByRecentDate(args, key);
        });

        it('calls recentDateCompare for each pair of items in the array', () => {
            expect(recentDateCompareStub.callCount).to.eq(args.length - 1);
        });

        it('calls recentDateCompare with the correct key each time', () => {
            recentDateCompareStub.args.forEach(arg => {
                expect(arg[2]).to.eq(key);
            });
        });
    });
});
