import { initialState, reducer } from '../../app/stores/directories';

const itemsMock = count => Array.from(count, (x, i) => ({ item: `item ${i}`, id: i }));

const createMockPayload = () => ({
    body: {
        entity: {
            title: 'directories',
            navigationTags: []
        },
        headerNavigation: { items: itemsMock(6) },
        hamburgerNavigation: { items: itemsMock(12) },
        topDirectories: itemsMock(6),
        remainingDirectories: itemsMock(12),
        directoryFilters: itemsMock(34),
        comScoreSegmentIds: 'foobar'
    },
    response: { error: 'some error' }
});

describe('Directories reducer', () => {
    describe('LOAD_DIRECTORIES_CONTENT', () => {
        describe('with entity in payload.body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
            });

            it('should return the state with all populated fields', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORIES_CONTENT');

                const expectedState = {
                    title: payload.body.entity.title,
                    content: payload.body.entity,
                    topDirectories: payload.body.topDirectories,
                    remainingDirectories: payload.body.remainingDirectories,
                    navigationTags: payload.body.entity.navigationTags,
                    comScoreSegmentIds: payload.body.comScoreSegmentIds,
                    directoryFilters: payload.body.directoryFilters,
                    headerNavigation: payload.body.headerNavigation.items,
                    hamburgerNavigation: payload.body.hamburgerNavigation.items
                };

                expect(state).to.deep.eq(expectedState);
            });
        });
        describe('without entity in payload.body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
                delete payload.body.entity;
            });

            it('should return an empty object', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORIES_CONTENT');

                expect(state).to.be.empty;
            });
        });
    });
    describe('LOAD_DIRECTORIES_CONTENT_FAILED', () => {
        describe('with comscoreSegmentIds in the payload.body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
            });

            it('should use the comscoreSegments value from the payload.body', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORIES_CONTENT_FAILED');
                const expectedState = payload.body.comScoreSegmentIds;

                expect(state.comScoreSegmentIds).to.eq(expectedState);
            });
        });
        describe('without a payload body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
                delete payload.body;
            });

            it('should set the comscoreSegmentIds to the initial state', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORIES_CONTENT_FAILED');
                const expectedState = initialState.comScoreSegmentIds;

                expect(state.comScoreSegmentIds).to.eq(expectedState);
            });
        });
    });
    describe('UNRECOGNIZED_ACTION', () => {
        let payload;

        before(() => {
            payload = { ...createMockPayload() };
        });

        it('should return the initialState of the store', () => {
            const state = reducer(initialState, payload, 'UNRECOGNIZED_ACTION');

            expect(state).to.eq(initialState);
        });
    });
});
