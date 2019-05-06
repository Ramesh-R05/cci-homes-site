import { initialState, reducer } from '../../app/stores/directory';

const itemsMock = count => Array.from(count, (x, i) => ({ item: `item ${i}`, id: i }));

const createMockPayload = () => ({
    body: {
        contactForm: {},
        entity: {
            title: 'directories',
            navigationTags: []
        },
        headerNavigation: { items: itemsMock(6) },
        hamburgerNavigation: { items: itemsMock(12) },
        listingCategories: { items: itemsMock(18) }
    },
    response: { error: 'some error' }
});

describe('Directory reducer', () => {
    describe('LOAD_DIRECTORY_CONTENT', () => {
        describe('with entity in payload.body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
            });

            it('should return the state with all populated fields', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORY_CONTENT');

                const expectedState = {
                    content: payload.body.entity,
                    navigationTags: payload.body.entity.navigationTags,
                    headerNavigation: payload.body.headerNavigation.items,
                    hamburgerNavigation: payload.body.hamburgerNavigation.items,
                    listingCategories: payload.body.listingCategories.items
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
                const state = reducer(initialState, payload, 'LOAD_DIRECTORY_CONTENT');

                expect(state).to.be.empty;
            });
        });
    });
    describe('LOAD_DIRECTORY_CONTENT_FAILED', () => {
        describe('without a payload body', () => {
            let payload;

            before(() => {
                payload = { ...createMockPayload() };
                delete payload.body;
            });

            it('should set the content to the initial state', () => {
                const state = reducer(initialState, payload, 'LOAD_DIRECTORY_CONTENT_FAILED');
                const expectedState = initialState.content;

                expect(state.content).to.eq(expectedState);
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
