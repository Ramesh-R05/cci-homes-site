import proxyquire, {noCallThru} from 'proxyquire';
import seo from '../../../mock/seo';
noCallThru();

let getKeywordsStub = () => {};
const seoInitSpy = sinon.spy();
const seoMiddleware = proxyquire('../../../../app/server/bff/middleware/seo', {
    '../api/keywords': {
        getKeywords: () => { return getKeywordsStub() }
    },
    '../helper/seoInsertKeywordLink': {
        init: seoInitSpy
    }
});

describe('Seo middleware', () => {
    const req = {};
    const validNodeType = 'HomesArticle';
    const entity = { siteUrl: 'http://siteUrl.com/', url: '/url' };
    let res = {
        body: {
            entity: {
                tet: 'test'
            }
        }
    };

    before(() => {
        getKeywordsStub = sinon.stub().resolves(seo);
    });

    describe('when seo data reject', () => {
        before(() => {
            getKeywordsStub = sinon.stub().rejects(seo);
        });

        it('should pass to the next', (done) => {
            const nextSpy = sinon.spy();

            seoMiddleware(req, res, nextSpy).then(() => {
                expect(nextSpy.called).to.be.true;
            }).then(done, done);
        });
    });

    describe('when not a valid nodeType', () => {
        before(() => {
            res.body.entity.nodeType = 'Gallery';
        });

        after(() => {
            res.body.entity.nodeType = validNodeType;
        });

        it('should skip to the next middleware and req data remain unchange', (done) => {
            const nextSpy = sinon.spy();

            seoMiddleware(req, res, nextSpy).then(() => {
                const data = req.data;
                expect(nextSpy.called).to.be.true;
                expect(data).to.be.deep.equal(req.data);
            }).then(done, done);
        });
    });

    describe('when a valid nodeType', () => {
        describe('required fields not found in entity', () => {
            it('should not call seoInsertKeywordLink', (done) => {
                res = {
                    body: {}
                };
                const nextSpy = sinon.spy();

                seoMiddleware(req, res, nextSpy).then(() => {
                    expect(seoInitSpy.called).to.be.false;
                    expect(nextSpy.called).to.be.true;
                }).then(done, done);
            });
        });

        describe('required fields found in entity', () => {
            before(() => {
                getKeywordsStub = sinon.stub().resolves(seo);

                res = {
                    body: { entity: { ...entity, nodeType: validNodeType } }
                };
            });

            it('should call seoInsertKeywordLink', (done) => {
                const nextSpy = sinon.spy();

                seoMiddleware(req, res, nextSpy).then(() => {
                    expect(seoInitSpy.called).to.be.true;
                    expect(nextSpy.called).to.be.true;
                }).then(done, done);
            });
        });
    });
});
