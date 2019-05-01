import proxyquire, { noCallThru } from 'proxyquire';
import listingsMock from '../../../mock/listingsForCategory';

noCallThru();

const sortAlphabeticallyByContentTitleStub = sinon.stub();
const sortByRecentDateStub = sinon.stub();

const defaultListingSort = proxyquire('../../../../app/server/bff/helper/defaultListingSort', {
    './sortAlphabeticallyByContentTitle': sortAlphabeticallyByContentTitleStub,
    './sortByRecentDate': sortByRecentDateStub
});

describe('defaultListingSort function', () => {
    describe('when passed an array', () => {
        let args;
        let recentDateResult;
        let alphabeticalResult;
        let filteredPremium;
        let remainingItems;
        let result;

        before(() => {
            args = [...listingsMock.data];
            recentDateResult = [{ foo: 'bar' }];
            alphabeticalResult = [{ baz: 'quz' }];

            filteredPremium = args.filter(a => a.nodeTypeAlias === 'PremiumListing');
            remainingItems = args.filter(a => a.nodeTypeAlias !== 'PremiumListing');

            sortByRecentDateStub.returns(recentDateResult);
            sortAlphabeticallyByContentTitleStub.returns(alphabeticalResult);
            result = defaultListingSort(args);
        });

        it('calls sortByRecentDate with correct arguments', () => {
            expect(sortByRecentDateStub).to.be.calledWith(filteredPremium, 'pageDateCreated');
        });

        it('calls sortAlphabeticallyByContentTitle with correct arguments', () => {
            expect(sortAlphabeticallyByContentTitleStub).to.be.calledWith(remainingItems);
        });

        it('creates the correctly ordered array with results from the functions', () => {
            expect(result).to.deep.eq([...recentDateResult, ...alphabeticalResult]);
        });
    });
});
