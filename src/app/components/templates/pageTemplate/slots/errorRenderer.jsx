import ErrorHandlerBuilder from '../../../error/errorHandlerBuilder';

export default function errorRenderer({ contentProps, currentNavigateError, contentErrorStatus }) {
    if (!contentProps || currentNavigateError || contentErrorStatus) {
        let errorStatus = ErrorHandlerBuilder.DEFAULT_CODE;

        if (currentNavigateError) {
            errorStatus = currentNavigateError.statusCode;
        } else if (contentErrorStatus) {
            errorStatus = contentErrorStatus.status;
        }

        return ErrorHandlerBuilder(errorStatus);
    }

    return null;
}
