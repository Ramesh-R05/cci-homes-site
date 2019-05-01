import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;
const FormikStub = Context.createStubComponent();
const sendEmailStub = sinon.stub();
const executeActionStub = sinon.stub();

const ContactFormWrapper = proxyquire('../../../../app/components/listings/components/contactFormWrapper', {
    react: React,
    formik: { Formik: FormikStub },
    '../../../actions/sendEmail': sendEmailStub
});

const TestWrapper = new ShallowWrapperFactory(ContactFormWrapper);

const selectors = {
    root: '.contact-form-wrapper',
    successMsg: '.contact-form-wrapper__success-msg'
};

describe('ContactFormWrapper component', () => {
    describe('rendering', () => {
        describe('with valid required emailAddress prop and all context config', () => {
            let wrapper;

            const emailAddressMock = 'test@test.com';
            let contactFormMock = null;

            before(() => {
                [wrapper] = TestWrapper(
                    {
                        emailAddress: emailAddressMock,
                        contactForm: contactFormMock
                    },
                    {
                        executeAction: executeActionStub,
                        config: {
                            grecaptcha: {
                                siteKey: 'xxx-xxx-xxx-xxx'
                            }
                        }
                    }
                );
            });

            it('renders the contact form wrapper component', () => {
                const { root } = selectors;
                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the Formik component', () => {
                expect(wrapper.find(FormikStub).exists()).to.be.true;
            });

            describe('with valid contactForm prop', () => {
                describe('with sendSuccessStatus set to true and all context config', () => {
                    const { successMsg } = selectors;

                    before(() => {
                        contactFormMock = {
                            sendSuccessStatus: true,
                            message: 'Success message'
                        };

                        [wrapper] = TestWrapper(
                            {
                                emailAddress: emailAddressMock,
                                contactForm: contactFormMock
                            },
                            {
                                executeAction: executeActionStub,
                                config: {
                                    grecaptcha: {
                                        siteKey: 'xxx-xxx-xxx-xxx'
                                    }
                                }
                            }
                        );
                    });

                    it('renders the contact form success message', () => {
                        expect(wrapper.find(successMsg).exists()).to.be.true;
                    });

                    it('sets the correct contact form success message', () => {
                        expect(wrapper.find(successMsg).text()).to.eq(contactFormMock.message);
                    });
                });
            });
        });

        describe('with missing required emailAddress prop and all context config', () => {
            let wrapper;
            const emailAddressMock = null;
            const contactFormMock = null;

            before(() => {
                filterErrors();

                [wrapper] = TestWrapper(
                    {
                        emailAddress: emailAddressMock,
                        contactForm: contactFormMock
                    },
                    {
                        executeAction: executeActionStub,
                        config: {
                            grecaptcha: {
                                siteKey: 'xxx-xxx-xxx-xxx'
                            }
                        }
                    }
                );
            });

            after(() => {
                restoreErrors();
            });

            it('does not render the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });
    });
});
