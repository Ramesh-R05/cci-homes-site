import q from 'q';
import nock from 'nock';
import extend from 'lodash/object/extend';
const proxyquire = require('proxyquire').noCallThru();

let service;
let nockScope;


describe('Services', () => {
    describe('Faceted Module', () => {
        describe('#read', () => {
            const serviceConfig = {
                server: {
                    port: 80
                },
                services: {
                    noDomain: 'http://no-domain',
                    facetedModule: {
                        local: 'http://api-host.tld',
                        path: '/api/facetedModule'
                    }
                }
            };

            const baseSettings = {
                moduleConfig: {
                    lynxStoreName: 'testModuleName',
                    entityId: 'ENTITY-ID',
                    modules: {
                        testModuleName: 'MODULE-ID'
                    }
                }
            };

            before(() => {
                nock.disableNetConnect();
            });

            afterEach(() => {
                nock.cleanAll();
            });

            after(() => {
                nock.restore();
            });

            it('should request url without domain when canUseDom = true', () => {
                nockScope = createNock('http://no-domain:80').get('/api/facetedModule/MODULE-ID?node=ENTITY-ID').reply(200);

                createService(serviceConfig, true).read(q.defer(), baseSettings);
                expect(nockScope.isDone()).to.be.true;
            });

            it('should request url with domain when canUseDom = false', () => {
                nockScope = createNock('http://api-host.tld:80').get('/api/facetedModule/MODULE-ID?node=ENTITY-ID').reply(200);

                createService(serviceConfig, false).read(q.defer(), baseSettings);
                expect(nockScope.isDone()).to.be.true;
            });

            it('should transform multiple params to comma separated', () => {
                nockScope = createNock('http://api-host.tld:80').get('/api/facetedModule/MODULE-ID?node=ENTITY-ID&tags=Sample-Tag1%2CSample-Tag2').reply(200);

                const settings = extend({}, baseSettings, {params: {tags: ['Sample-Tag1', 'Sample-Tag2']}});
                createService(serviceConfig, false).read(q.defer(), settings);
                expect(nockScope.isDone()).to.be.true;
            });

            it('should encode special chars', () => {
                nockScope = createNock('http://api-host.tld:80').get('/api/facetedModule/MODULE-ID?node=ENTITY-ID&tags=This%26That').reply(200);

                const settings = extend({}, baseSettings, {params: {tags: ['This&That']}});
                createService(serviceConfig, false).read(q.defer(), settings);
                expect(nockScope.isDone()).to.be.true;
            });
        });
    });
});

const createNock = scope => nock(scope); //.log(console.log);
const createService = (config, useDOM) => {
    const service = proxyquire('../../app/services/facetedModule', {
        'exenv': {canUseDOM: useDOM}
    });
    service.init(config);
    return service;
};

