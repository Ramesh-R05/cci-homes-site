export default function MiddlewareTestFactory(middleware, { baseRequest = {}, baseResponse = {} } = {}) {
    if (!middleware) {
        throw new Error('middleware function required');
    }

    /*  eslint-disable no-param-reassign */

    // this is needed because we want to have a friendly api
    return async function TestWrapper({ req = {}, res = {} } = {}) {
        req = { ...baseRequest, ...req };
        res = { ...baseResponse, ...res };

        const next = sinon.stub();

        const promiseRes = () =>
            new Promise(async resolve => {
                const requestCopy = { ...req };
                const responseCopy = { ...res };

                await middleware(requestCopy, responseCopy, next);

                resolve({ res: responseCopy, req: requestCopy });
            });

        return [{ req, res, next }, promiseRes];
    };

    /*  eslint-enable no-param-reassign */
}
