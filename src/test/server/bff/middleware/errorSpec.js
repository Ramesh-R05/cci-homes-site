import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

const errorMiddleware = proxyquire('../../../../app/server/bff/middleware/error', {
    '../../../../logger': { error() {} }
});

describe('Error middleware', () => {
    let next;

    before(() => {
        next = sinon.spy();
    });

    describe('when an unhandled exception occurs', () => {
        let err = {};
        let res = {};
        let req = { };
        let statusStub;
        let jsonStub;
        res.status = () => { return {json: () => {}}};

        before(() => {
            err = {
                message: 'this is a fake unhandled exception message'
            };
            statusStub = sinon.stub(res, 'status', () => {
                jsonStub = sinon.stub();
                return {
                    json: jsonStub
                };
            });
        });

        it('should set response status to 500', () => {
            errorMiddleware(err, req, res, next);
            expect(statusStub).to.be.calledWith(500);
        });

        it('should set response status to 404', () => {
            const err404 = {...err};
            err404.status = 404;

            errorMiddleware(err404, req, res, next);
            expect(statusStub).to.be.calledWith(404);
        });

        it('should set response json to the error object', () => {
            errorMiddleware(err, req, res, next);
            expect(jsonStub).to.be.calledWith({
                error: err
            });
        });
    });
});
