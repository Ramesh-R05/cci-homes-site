import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

let getModulesStub = () => {};
let parseEntityStub = () => {};
let parseEntitiesStub = () => {};

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
     '../helper/parseEntity': {
        parseEntity: (...args) => {
            return parseEntityStub(...args)
        },
        parseEntities: (...args) => {
            return parseEntitiesStub(...args)
        }
    },
	'../api/module': {
        getModules: () => { return getModulesStub() }
    }
});

describe('PageModules middleware', () => {
    const res = {};
    const module = [];
    let req = {};
    let next;

    describe('when the response is valid', () => {
        before(() => {
            next = sinon.spy();
            getModulesStub = sinon.stub().resolves({ headernavigation: module });
        });

        after(() => {
            req = {};
        });

        it('should set `req.data.headernavigation` to equal the response', (done) => {
            pageModulesMiddleware(req, res, next).then(() => {
                expect(req.data).to.deep.eq({ headernavigation: module });
                expect(next).to.be.called;
                done();
            }).catch(done);
        });
    });

	describe('when data contains `headernavigation`', () => {
        const headernavigation = ['Nav item 1', 'Nav Item 2'];
        let req = {
            data: {
                headernavigation
            }
        };
        let res = {};
        let next;

        before(() => {
            next = sinon.spy();
            parseEntitiesStub = sinon.stub().returns(headernavigation);
			getModulesStub = sinon.stub().resolves({ headernavigation });
        });

        it('should set `res.body.headerNavigation`', (done)=> {
			 pageModulesMiddleware(req, res, next).then(() => {
			        expect(parseEntitiesStub).to.have.been.calledWith(headernavigation, { contentTitle: 'name' });
					expect(res.body.headerNavigation).to.deep.equal({ items: headernavigation });
                done();
            }).catch(done);
			
        });
    });
});
