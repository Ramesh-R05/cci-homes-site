import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteListingUrl = 'http://dev.seo-batman.services.bauer-media.internal/v1/keywords';

const getKeywords = proxyquire('../../../../app/server/bff/api/seo', {
    '../../makeRequest': (args) => { return makeRequestStub(args) },
    '@bxm/winston-logger': { backendLogger: { error(){} } }
});

describe('SeoAPI', () => {
    describe('#getSeoData()', () => {
        let query;
		const seoData = {
            totalCount: 2,
            keywords: [
                {
                    keyword: "Kendall"
                },
                {
                    keyword: "Jenner"
                }
            ],
            primaryUrl: "http://dev.dolly-site.bauer-media.net.au/celebrity/harry-styles-mum-hacked-intimate-kendall-jenner-pictures-13394"
		};

        let articleUrl = 'http://dev.dolly-site.bauer-media.net.au/fashion/kendall-jenner-lands-us-vogue-cover-13533';

		describe('when the getSeoData method is called', () => {
            describe('and the query contains articleUrl', () => {
                before(() => {
                    makeRequestStub = sinon.stub().resolves(seoData);
                    query = `?urlName=` + articleUrl;
                });

                it(`should call makeRequest`, (done) => {
                    getKeywords(articleUrl).then(() => {
                        expect(makeRequestStub).to.be.calledWith(`${remoteListingUrl}${query}`);
                        done();
                    }).catch(done);
                });
            });

			describe('and the api returns no keywords for a url', () => {
				const emptyResponse = { };

				beforeEach(() => {
					makeRequestStub = sinon.stub().resolves(emptyResponse);
				});

				it('should return an empty object', (done) => {
					getKeywords(articleUrl).then((value) => {
						expect(value).to.deep.eq({ });
						done();
					}).catch(done);
				});
			});
		});
    });
});
