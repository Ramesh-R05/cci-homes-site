import { createReducerStore } from 'fluxible-reducer-store';

export const initialState = {
    response: null
};

const VERIFY_RECAPTCHA = (state, payload) => {
    const { response } = payload.body;

    return {
        ...state,
        response
    };
};

const VERIFY_RECAPTCHA_FAILED = (state, error) => ({
    ...state,
    response: {
        success: false,
        message: 'There was a network issue verifying recaptcha result. Please try again.',
        error
    }
});

export const reducer = (state = initialState, payload, action) => {
    switch (action) {
        case 'VERIFY_RECAPTCHA':
            return VERIFY_RECAPTCHA(state, payload);
        case 'VERIFY_RECAPTCHA_FAILED':
            return VERIFY_RECAPTCHA_FAILED(state, payload);
        default:
            return state;
    }
};

const EmailStore = createReducerStore({
    storeName: 'RecaptchaStore',
    initialState,
    reducers: {
        VERIFY_RECAPTCHA,
        VERIFY_RECAPTCHA_FAILED
    },
    getters: {
        getResponse: state => state.Response
    }
});

export default EmailStore;
