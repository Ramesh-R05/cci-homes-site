import q from 'q';
var nock = require('nock');
var _ = require('lodash');
var proxyquire = require('proxyquire').noCallThru();
var service, nockScope;

describe('Services', () => {
    describe('Faceted Module', () => {
        describe('#read', () => {
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

                var settings = _.extend({}, baseSettings, {params: {tags: ['Sample-Tag1', 'Sample-Tag2']}});
                createService(serviceConfig, false).read(q.defer(), settings);
                expect(nockScope.isDone()).to.be.true;
            });

            it('should encode special chars', () => {
                nockScope = createNock('http://api-host.tld:80').get('/api/facetedModule/MODULE-ID?node=ENTITY-ID&tags=This%26That').reply(200);

                var settings = _.extend({}, baseSettings, {params: {tags: ['This&That']}});
                createService(serviceConfig, false).read(q.defer(), settings);
                expect(nockScope.isDone()).to.be.true;
            });
        });
    });
});

function createNock(scope) {
    return nock(scope); //.log(console.log);
}

function createService(config, useDOM) {
    var service = proxyquire('../../app/services/facetedModule', {
        'react/lib/ExecutionEnvironment': {canUseDOM: useDOM}
    });
    service.init(config);
    return service;
}

var serviceConfig = {
    server: {
        port: 80
    },
    service: {
        noDomain: 'http://no-domain',
        facetedModule: {
            local: 'http://api-host.tld',
            path: '/api/facetedModule'
        }
    }
};

var baseSettings = {
    moduleConfig: {
        lynxStoreName: 'testModuleName',
        entityId: 'ENTITY-ID',
        modules: {
            testModuleName: 'MODULE-ID'
        }
    }
};