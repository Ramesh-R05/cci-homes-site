import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteListingUrl = 'http://remoteListingUrl.com/api';
const configStub = {
    services: { remote: { listings: remoteListingUrl } }
};

const getLatestTeasers = proxyquire('../../../../app/server/bff/api/listing', {
    '../../makeRequest': (args) => { return makeRequestStub(args) },
    '../../../config': configStub,
    '../../../../logger': { error(){} }
});

describe('ListingAPI', () => {
    describe('#getLatestTeasers()', () => {
        const listingData = {
            totalCount: 10,
            feedData: [
                {
                    url: "/fashion/automation-test-article-with-hero-image-3663",
                    contentImageUrl: "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/Dolly/2016/02/03/3663/test-main-image.jpg",
                    contentTitle: "Test content title",
                    parentName: "Fashion"
                },
                {
                    url: "/fashion/automation-test-article-with-hero-image-3663",
                    contentImageUrl: "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/Dolly/2016/02/03/3663/test-main-image.jpg",
                    contentTitle: "Test content title",
                    parentName: "Fashion"
                }
            ]
        };

        let sectionId = "DOLLY-3638";
        let top = 100;
        let query;

        beforeEach(() => {
            makeRequestStub = sinon.stub().resolves(listingData);
        });

        describe('when the getLatestTeasers method is called', () => {
            describe('and the query contains both a top value and section id', () => {
                beforeEach(() => {
                    query = `?$select=*&$filter=path eq '${sectionId}'&$orderby=pageDateCreated desc&$top=${top}&$skip=0`;
                });

                it(`should call makeRequest with ${remoteListingUrl}/teasers/${query}`, (done) => {
                    getLatestTeasers(top, undefined, `path eq '${sectionId}'`).then(() => {
                        expect(makeRequestStub).to.be.calledWith(`${remoteListingUrl}/teasers/${query}`);
                        done();
                    }).catch(done);
                });
            });

            describe('and the section is null', () => {
                it(`should not call makeRequest and return an empty array`, (done) => {
                    getLatestTeasers(top, undefined, null).then((value) => {
                        expect(makeRequestStub).to.not.be.called;
                        expect(value).to.deep.eq([]);
                        done();
                    }).catch(done);
                });
            });

            describe('and the section and top are not passed', () => {
                beforeEach(() => {
                    top = 20;
                    query = `?$select=*&$orderby=pageDateCreated desc&$top=${top}&$skip=0`;
                });

                afterEach(() => {
                    top = 100;
                });

                it(`should call makeRequest with ${remoteListingUrl}/teasers/${query}`, (done) => {
                    getLatestTeasers().then((value) => {
                        expect(makeRequestStub).to.not.be.called;
                        expect(value).to.deep.eq([]);
                        done();
                    }).catch(done);
                });
            });

            describe('and filter is not passed', () => {
                it(`should not call makeRequest`, (done) => {
                    getLatestTeasers(top, undefined).then((value) => {
                        expect(makeRequestStub.called).to.be.false;
                        expect(value).to.deep.eq([]);
                        done();
                    }).catch(done);
                });
            });

            describe('and the listings remote returns a list in the response', () => {
                it(`should return the listing data`, (done) => {
                    getLatestTeasers(top, undefined, sectionId).then((value) => {
                        expect(value).to.deep.eq(listingData);
                        done();
                    }).catch(done);
                });
            });

            describe('and filter is passed', () => {
                const filter = `contentTags eq '${sectionId}'`;

                beforeEach(() => {
                    query = `?$select=*&$filter=${filter}&$orderby=pageDateCreated desc&$top=${top}&$skip=0`;
                });

                it(`should call makeRequest with ${remoteListingUrl}/teasers/${query}`, (done) => {
                    getLatestTeasers(top, undefined, filter).then((value) => {
                        expect(makeRequestStub).to.be.calledWith(`${remoteListingUrl}/teasers/${query}`);
                        done();
                    }).catch(done);
                });
            });

            describe('and the listings returns an error response', () => {
                const rejectedResponse = {
                    totalCount: 0,
                    data: []
                };

                beforeEach(() => {
                    makeRequestStub = sinon.stub().rejects(rejectedResponse);
                });

                it('should return an empty array object', (done) => {
                    getLatestTeasers(top, undefined, sectionId).then((value) => {
                        expect(value).to.deep.eq([]);
                        done();
                    }).catch(done);
                });
            });
        });
    });
})
