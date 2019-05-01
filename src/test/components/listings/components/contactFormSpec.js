import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

noCallThru();
const Context = betterMockComponentContext();

const createMockFormProps = () => ({
    values: {},
    touched: {},
    errors: {},
    isSubmitting: false,
    handleChange: () => {},
    handleBlur: () => {},
    handleSubmit: () => {}
});

const ReCAPTCHAStub = Context.createStubComponent();

const ContactForm = proxyquire('../../../../app/components/listings/components/contactForm', {
    'react-google-recaptcha': ReCAPTCHAStub
});

const TestWrapper = new ShallowWrapperFactory(ContactForm);

const selectors = {
    root: '.contact-form',
    errorMsg: '.contact-form__error-msg',
    validationMsg: '.contact-form__input-feedback'
};

describe('ContactForm component', () => {
    describe('rendering', () => {
        describe('with valid required formProps prop', () => {
            let wrapper;
            let testProps;
            let formPropsMock;
            let contactFormMock = null;

            before(() => {
                formPropsMock = {
                    ...createMockFormProps()
                };

                [wrapper, testProps] = TestWrapper({
                    formProps: formPropsMock,
                    contactForm: contactFormMock,
                    recaptcha: {
                        recaptchaRef: sinon.stub()
                    }
                });
            });

            it('renders the contact form component', () => {
                const { root } = selectors;
                expect(wrapper.find(root).exists()).to.be.true;
            });

            describe('with email field set to required', () => {
                describe('with email field touched', () => {
                    let formPropsMock;

                    before(() => {
                        formPropsMock = {
                            ...createMockFormProps(),
                            errors: {
                                email: 'Required'
                            },
                            touched: {
                                email: true
                            }
                        };

                        [wrapper, testProps] = TestWrapper({
                            formProps: formPropsMock,
                            contactForm: contactFormMock,
                            recaptcha: {
                                recaptchaRef: sinon.stub()
                            }
                        });
                    });

                    it('renders the email field error message', () => {
                        const { validationMsg } = selectors;
                        expect(wrapper.find(validationMsg).exists()).to.be.true;
                    });
                });
            });

            describe('with a missing contactForm prop', () => {
                let formPropsMock;

                before(() => {
                    formPropsMock = { ...createMockFormProps() };

                    [wrapper, testProps] = TestWrapper({
                        formProps: formPropsMock,
                        contactForm: contactFormMock,
                        recaptcha: {
                            recaptchaRef: sinon.stub()
                        }
                    });
                });

                it('does not render the contact form component', () => {
                    const { root } = selectors;
                    expect(wrapper.find(root).exists()).to.be.true;
                });
            });

            describe('with a valid contactForm prop', () => {
                let formPropsMock;
                let contactFormMock;

                describe('with sendSuccessStatus equal to true', () => {
                    before(() => {
                        formPropsMock = { ...createMockFormProps() };
                        contactFormMock = {
                            sendSuccessStatus: true
                        };

                        [wrapper, testProps] = TestWrapper({
                            formProps: formPropsMock,
                            contactForm: contactFormMock,
                            recaptcha: {
                                recaptchaRef: sinon.stub()
                            }
                        });
                    });

                    it('does not render the contact form component', () => {
                        const { root } = selectors;
                        expect(wrapper.find(root).exists()).to.be.false;
                    });
                });

                describe('with sendSuccessStatus equal to false', () => {
                    describe('with a message', () => {
                        const { errorMsg } = selectors;

                        before(() => {
                            formPropsMock = { ...createMockFormProps() };
                            contactFormMock = {
                                sendSuccessStatus: false,
                                message: 'Error message'
                            };

                            [wrapper, testProps] = TestWrapper({
                                formProps: formPropsMock,
                                contactForm: contactFormMock,
                                recaptcha: {
                                    recaptchaRef: sinon.stub()
                                }
                            });
                        });

                        it('renders the contact form error message', () => {
                            expect(wrapper.find(errorMsg).exists()).to.be.true;
                        });

                        it('sets the correct contact form error message', () => {
                            expect(wrapper.find(errorMsg).text()).to.eq(contactFormMock.message);
                        });
                    });
                });
            });
        });

        describe('with missing required formsProps prop', () => {
            let wrapper;
            let testProps;
            const contactFormMock = null;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    formProps: null,
                    contactForm: contactFormMock,
                    recaptcha: {
                        recaptchaRef: sinon.stub()
                    }
                });
            });

            it('does not render the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });
    });
});
