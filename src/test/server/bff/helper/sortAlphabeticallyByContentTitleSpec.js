import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const alphabeticalCompareStub = sinon.stub();

const sortAlphabeticallyByContentTitle = proxyquire('../../../../app/server/bff/helper/sortAlphabeticallyByContentTitle', {
    './alphabeticalCompare': alphabeticalCompareStub
}).default;

describe('sortAlphabeticallyByContentTitle function', () => {
    describe('when passed an array', () => {
        let args;

        before(() => {
            args = [{ contentTitle: 'a' }, { contentTitle: 'z' }, { contentTitle: 'f' }, { contentTitle: 'c' }];
            sortAlphabeticallyByContentTitle(args);
        });

        it('calls alphabeticalCompare for each pair of items in the array', () => {
            expect(alphabeticalCompareStub.callCount).to.eq(args.length - 1);
        });
    });
});
