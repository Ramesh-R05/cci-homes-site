import proxyquire, { noCallThru } from 'proxyquire';
import tagsMock from '../../../mock/tagsPost';

noCallThru();

const configStub = {
    services: { remote: { tag: 'http://remote-tag-url.com/api' } }
};

const requestStub = {
    post: sinon.stub()
};

const loggerStub = {
    error: sinon.stub()
};

const getTagListFromNames = proxyquire('../../../../app/server/bff/api/tag', {
    request: requestStub,
    '../../../config': configStub,
    '../../../../logger': loggerStub
});

describe('getTagListFromNames api', () => {
    describe('when a valid tagList is passed', () => {
        describe('and the API responds with data', () => {
            let tagList;
            let response;

            before(() => {
                tagList = [
                    'location:australian_state:Victoria',
                    'location:australian_state:Tasmania',
                    'location:australian_state:South Australia',
                    'location:australian_state:Queensland'
                ];

                requestStub.post
                    .withArgs(
                        {
                            url: `${configStub.services.remote.tag}/tags/list`,
                            json: true,
                            body: {
                                names: tagList
                            }
                        },
                        sinon.match.any
                    )
                    .callsArgWith(1, null, { statusCode: 200 }, { ...tagsMock });

                response = getTagListFromNames(tagList);
            });

            after(() => {
                requestStub.post.reset();
            });

            it('resolves to a list of tags', done => {
                response
                    .then(data => {
                        expect(data).to.eq(tagsMock);

                        done();
                    })
                    .catch(() => {
                        done();
                    });
            });
        });
        describe('and the API response with an error', () => {
            let tagList;
            let response;
            let errorMock;
            let errorBody;

            before(() => {
                tagList = ['location:australian_state:Victoria', 'location:australian_state:Tasmania'];
                errorMock = new Error('misc server error');
                errorBody = {
                    message: 'there was an error fetching the data'
                };

                requestStub.post
                    .withArgs(
                        {
                            url: `${configStub.services.remote.tag}/tags/list`,
                            json: true,
                            body: {
                                names: tagList
                            }
                        },
                        sinon.match.any
                    )
                    .callsArgWith(1, errorMock, { statusCode: 500 }, 'error message');

                response = getTagListFromNames(tagList);
            });

            after(() => {
                requestStub.post.reset();
                loggerStub.error.reset();
            });

            it('rejects with an error', done => {
                response.catch(error => {
                    expect(error).to.eq({
                        message: errorBody,
                        err: errorMock
                    });
                    done();
                });

                done();
            });

            it('calls the logger with an error', () => {
                expect(loggerStub.error).to.be.calledWith({ err: errorMock, message: 'error message', status: 500 });
            });
        });
    });
    describe('when an invalid tag list is passed', () => {
        let tagList;
        let response;

        before(() => {
            tagList = [];

            response = getTagListFromNames(tagList);
        });

        it('does not call request', () => {
            expect(requestStub.post).not.to.be.called;
        });

        it('does not call the logger', () => {
            expect(loggerStub.error).not.to.be.called;
        });

        it('resolves with empty data', done => {
            response
                .then(data => {
                    expect(data).to.deep.eq({
                        data: []
                    });

                    done();
                })
                .catch(() => {
                    done();
                });
        });
    });
});
