import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

// stubs
let AmazonSESStub = sinon.stub();
const loggerStub = { error: sinon.stub() };

// spies
const AmazonSESSpy = sinon.spy(AmazonSESStub);

const getBaseRequest = () => ({
    query: {
        preview: 'preview',
        id: 16224
    },
    app: {
        locals: {
            config: {
                isFeatureEnabled: () => true,
                listings: {
                    testToEmail: 'test@bauerxcelmedia.com.au',
                    senderName: 'Homes To Love',
                    senderEmail: 'test@bauerxcelmedia.com.au'
                }
            }
        }
    }
});

const getMockEmailData = () => ({
    fromEmail: 'testFrom@test.com',
    toEmail: 'testTo@test.com',
    message: 'Test email message'
});

function resetStubsAndSpies() {
    AmazonSESStub.reset();
    loggerStub.error.reset();
}

const sendEmailMiddleware = proxyquire('../../../../app/server/bff/middleware/sendEmail', {
    'aws-sdk/clients/ses': () => ({ sendEmail: AmazonSESStub }),
    '../../../../logger': loggerStub
}).default;

describe('sendEmail middleware', () => {
    describe(`when receiving data`, () => {
        let req;
        let res;

        afterEach(() => {
            res = {};
            resetStubsAndSpies();
        });

        describe(`when email send is successful`, () => {
            before(() => {
                AmazonSESStub.callsArgWith(1, false);

                req = { ...getBaseRequest() };
                res = {};
                res.status = () => {
                    return { json: () => {} };
                };
                sendEmailMiddleware(req, res);
            });

            it('should set the response body to the correct shape', () => {
                const expectedBody = {
                    contactForm: {
                        sendSuccessStatus: true,
                        message: 'Thank you for contacting us. We will be in touch shortly.'
                    }
                };

                expect(res.body).to.deep.eq(expectedBody);
            });
        });

        describe(`when email send is not successful`, () => {
            before(() => {
                AmazonSESStub.callsArgWith(1, true);

                req = { ...getBaseRequest() };
                res = {};
                res.status = () => {
                    return { json: () => {} };
                };
                sendEmailMiddleware(req, res);
            });

            it('should set the response body to the correct shape', () => {
                const expectedBody = {
                    contactForm: {
                        sendSuccessStatus: false,
                        message: 'There was an issue sending your message. Please try again.'
                    }
                };

                expect(res.body).to.deep.eq(expectedBody);
            });

            it('should pass the error to the logger', () => {
                // TODO - test the logger
            });

            it('should set the correct response status', () => {
                // TODO - test the status
            });
        });

        describe('when sendEmail throws an error', () => {
            // TODO - add a test for when an erorr is thrown and caught by the .catch()
        });
    });
});
