import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();
const ErrorHandlerBuilderStub = sinon.stub();

const errorRenderer = proxyquire('../../../../../app/components/templates/pageTemplate/slots/errorRenderer', {
    '../../../error/errorHandlerBuilder': ErrorHandlerBuilderStub
});

describe('errorRenderer function', () => {
    describe('with contentProps param passed', () => {
        describe('and there is no currentNavigateError', () => {
            describe('and there is a contentErrorStatus', () => {
                let result;
                let contentErrorStatusCode;
                let expectedReturnValue;

                before(() => {
                    contentErrorStatusCode = 404;
                    ErrorHandlerBuilderStub.DEFAULT_CODE = '500';
                    expectedReturnValue = 'mocked return value for stubbed func';

                    ErrorHandlerBuilderStub.withArgs(contentErrorStatusCode).returns(expectedReturnValue);

                    result = errorRenderer({
                        contentProps: { foo: true },
                        currentNavigateError: null,
                        contentErrorStatus: { status: contentErrorStatusCode }
                    });
                });

                after(() => {
                    ErrorHandlerBuilderStub.reset;
                });

                it('returns the ErrorHandlerBuilder with the status from the contentErrorStatus', () => {
                    expect(result).to.eq(expectedReturnValue);
                });
            });

            describe('and there is no contentErrorStatus', () => {
                let result;

                before(() => {
                    result = errorRenderer({
                        contentProps: { test: true },
                        currentNavigateError: null,
                        contentErrorStatus: null
                    });
                });

                after(() => {
                    ErrorHandlerBuilderStub.reset;
                });

                it('returns null to signify there not being an error', () => {
                    expect(result).to.eq(null);
                });
            });
        });
        describe('and there is a currentNavigateError', () => {
            describe('and there is no contentErrorStatus', () => {
                let result;
                let contentErrorStatusCode;
                let expectedReturnValue;

                before(() => {
                    contentErrorStatusCode = 123;
                    ErrorHandlerBuilderStub.DEFAULT_CODE = '500';
                    expectedReturnValue = 'mocked return value for stubbed func';

                    ErrorHandlerBuilderStub.withArgs(contentErrorStatusCode).returns(expectedReturnValue);

                    result = errorRenderer({
                        contentProps: { foo: true },
                        currentNavigateError: { statusCode: contentErrorStatusCode },
                        contentErrorStatus: null
                    });
                });

                after(() => {
                    ErrorHandlerBuilderStub.reset;
                });

                it('returns the ErrorHandlerBuilder with the status from the currentNavigateError', () => {
                    expect(result).to.eq(expectedReturnValue);
                });
            });
            describe('and there is a contentErrorStatus', () => {
                let result;
                let contentErrorStatusCode;
                let currentNavigateErrorStatusCode;
                let expectedReturnValue;

                before(() => {
                    contentErrorStatusCode = 456;
                    currentNavigateErrorStatusCode = 664;
                    ErrorHandlerBuilderStub.DEFAULT_CODE = '500';
                    expectedReturnValue = 'mocked return value for stubbed func';

                    ErrorHandlerBuilderStub.withArgs(currentNavigateErrorStatusCode).returns(expectedReturnValue);

                    result = errorRenderer({
                        contentProps: { foo: true },
                        currentNavigateError: { statusCode: currentNavigateErrorStatusCode },
                        contentErrorStatus: { status: contentErrorStatusCode }
                    });
                });

                after(() => {
                    ErrorHandlerBuilderStub.reset;
                });

                it('returns the ErrorHandlerBuilder with the status from the currentNavigateError', () => {
                    expect(result).to.eq(expectedReturnValue);
                });
            });
        });
    });
    describe('with no contentProps param passed, and ', () => {
        let result;
        let expectedReturnValue;

        before(() => {
            ErrorHandlerBuilderStub.DEFAULT_CODE = '500';
            expectedReturnValue = 'mocked return value for stubbed func';
            ErrorHandlerBuilderStub.withArgs(ErrorHandlerBuilderStub.DEFAULT_CODE).returns(expectedReturnValue);

            result = errorRenderer({
                contentProps: null,
                currentNavigateError: null,
                contentErrorStatus: null
            });
        });

        after(() => {
            ErrorHandlerBuilderStub.reset;
        });

        it('returns the error handler builder passing the default status code', () => {
            expect(result).to.eq(expectedReturnValue);
        });
    });
});
