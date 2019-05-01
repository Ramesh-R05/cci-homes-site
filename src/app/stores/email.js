import { createReducerStore } from 'fluxible-reducer-store';

export const initialState = {
    contactForm: null
};

const SEND_EMAIL = (state, payload) => {
    const { contactForm } = payload.body;

    return {
        ...state,
        contactForm
    };
};

const SEND_EMAIL_FAILED = (state, error) => ({
    ...state,
    contactForm: {
        sendSuccessStatus: false,
        message: 'There was an issue sending your message. Please try again.',
        error
    }
});

export const reducer = (state = initialState, payload, action) => {
    switch (action) {
        case 'SEND_EMAIL':
            return SEND_EMAIL(state, payload);
        case 'SEND_EMAIL_FAILED':
            return SEND_EMAIL_FAILED(state, payload);
        default:
            return state;
    }
};

const EmailStore = createReducerStore({
    storeName: 'EmailStore',
    initialState,
    reducers: {
        SEND_EMAIL,
        SEND_EMAIL_FAILED
    },
    getters: {
        getContactForm: state => state.contactForm
    }
});

export default EmailStore;
