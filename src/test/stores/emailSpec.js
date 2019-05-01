import { initialState, reducer } from '../../app/stores/email';

const createMockPayload = () => ({
    body: {
        contactForm: {
            sendSuccessStatus: false,
            message: 'test message'
        }
    }
});

describe('Email reducer', () => {
    describe('SEND_EMAIL', () => {
        let payload;

        before(() => {
            payload = { ...createMockPayload() };
        });

        it('should return the state with all populated fields', () => {
            const state = reducer(initialState, payload, 'SEND_EMAIL');

            const expectedState = {
                contactForm: {
                    sendSuccessStatus: payload.body.contactForm.sendSuccessStatus,
                    message: payload.body.contactForm.message
                }
            };

            expect(state).to.deep.eq(expectedState);
        });
    });
    describe('SEND_EMAIL_FAILED', () => {
        let error;

        before(() => {
            error = 'error message';
        });

        it('should return the state with all populated fields', () => {
            const state = reducer(initialState, error, 'SEND_EMAIL_FAILED');

            const expectedState = {
                contactForm: {
                    sendSuccessStatus: false,
                    message: 'There was an issue sending your message. Please try again.',
                    error: error
                }
            };

            expect(state).to.deep.eq(expectedState);
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
