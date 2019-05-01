import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const sortByRecentDateStub = sinon.stub();
const sortAlphabetiallyByContentTitleStub = sinon.stub();
const defaultListingSortStub = sinon.stub();

const sortListingsByRule = proxyquire('../../../../app/server/bff/helper/recentDateCompare', {
    './sortByRecentDate': sortByRecentDateStub,
    './sortAlphabeticallyByContentTitle': sortAlphabetiallyByContentTitleStub,
    './defaultListingSort': defaultListingSortStub
});

describe('sortListingsByRule function', () => {
    describe('when listings is an array and has a length', () => {
        describe(`and sortByRule is 'A-Z'`, () => {
            it('calls the sortAlphabeticallyByContentTitle function');
        });

        describe(`and sortByRule is 'recently-added'`, () => {
            it(`calls the sortByRecentDate function with the listings Array and 'pageDateCreated' key`);
        });

        describe(`and sortByRule is 'recently-updated'`, () => {
            it(`calls the sortByRecentDate function with the listings Array and 'updated_at' key`);
        });

        describe('and sortByRule is not defined', () => {
            it('calls the defaultListingSort function');
        });
    });
    describe('when listings is not an array', () => {
        it('returns the unmodified listings argument', () => {});
    });
    describe('when listings is an empty array', () => {
        it('returns the unmodified listings argument', () => {});
    });
});
