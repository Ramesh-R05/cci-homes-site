var _ = require('lodash');
import {betterMockActionContext} from '@bxm/flux';
var safada = require('../../utils/safada/safada')(Context);
var proxyquire = require('proxyquire').noCallThru();

var storeNameUnderTest = 'storeName';
var Context, store, anotherStore;

function createContext() {
    Context = betterMockActionContext();
    store = Context.registerStore(require('./facetedModuleImpl'));
    sinon.spy(store, 'emitChange');
}

describe('Stores', () => {
    before(() => {
        createContext();
    });

    afterEach(() => {
        store.emitChange.reset();
    });

    describe('Faceted Module', () => {
        describe('Action -> LOAD_CONTENT', () => {
            beforeEach(() => {
                Context.dispatch('LOAD_CONTENT', contentPayload);
            });

            it('reads the lynx module names and ids from the payload', () => {
                expect(store.config.modules).to.have.property('module1', "MDOULE-1");
                expect(store.config.modules).to.have.property('module2', "MDOULE-2");
            });

            it('reads the entity id from the payload', () => {
                expect(store.config.entityId).to.equal(contentPayload.body.entity.id);
            });

            it('calls emitChange()', () => {
                expect(store.emitChange.called).to.be.true;
            });
        });

        describe('Action -> FACETED_MODULE:PAGE_RECEIVED', () => {
            beforeEach(() => {
                Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', pageReceivedPayload);
            });

            it('calls emitChange()', () => {
                expect(store.emitChange.called).to.be.true;
            });

            it('#getPaging returns the correct value', () => {
                expect(store.getPaging()).to.deep.equal(pageReceivedPayload.content.paging);
            });

            it('#getPaging returns pageSize', () => {
                expect(store.getPaging()).to.have.property('pageSize', pageReceivedPayload.content.settings.pageSize);
            });

            it('#getFaceting returns the correct value', () => {
                expect(store.getFaceting()).to.deep.equal(pageReceivedPayload.content.faceting);
            });

            it('#getSettings returns the correct value', () => {
                expect(store.getSettings()).to.deep.equal(pageReceivedPayload.content.settings);
            });
        });

        describe('Action -> FACETED_MODULE:PAGE_RECEIVED:FAILURE', () => {
            beforeEach(() => {
                sinon.spy(console, 'error');
                Context.dispatch('FACETED_MODULE:PAGE_RECEIVED:FAILURE', {lynxStoreName: storeNameUnderTest, content: 'error'});
            });

            it('should trace error', () => {
                expect(console.error.called).to.be.true;
            });
        });

        describe('Events targeted at a different facetedModule store', () => {
            beforeEach(() => {
                anotherStore = Context.registerStore(require('./anotherFacetedModuleImpl'));
                Object.freeze(anotherStore.items);
            });

            after(() => {
                createContext();
            });

            it('does not call emitChange()', () => {
                expect(store.emitChange.called).to.be.false;
            });

            it('will throw if the store tries to use the payload', () => {
                expect(() => Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', _.extend(pageReceivedPayload, {lynxStoreName: storeNameUnderTest})).to.throw());
            });

            it('FACETED_MODULE:PAGE_RECEIVED ignores payloads meant for another faceted module store', () => {
                expect(() => Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', pageReceivedPayload)).to.not.throw();
            });
        });
    });
});

var contentPayload = {
    body: {
        entity: {
            id: 'ENTITY-ID'
        },
        stores: {
            store1: {module: {id: "MDOULE-1", storeName: "module1"}},
            store2: {module: {id: "MDOULE-2", storeName: "module2"}}
        }
    }
};

var pageReceivedPayload = {
    lynxStoreName: 'storeName',
    content: {
        "entity": {"id": "HOMES-1206"},
        "module": {"storeName": "taggedArticles", "id": "HOMES-1208"},
        "faceting": {
            "facetCounts": {
                "facetFields": [{"name": "articleTags", "values": [{"value": "food:Audience:All", "count": 1}]}]
            }
        },
        "settings": {"pageSize": 8},
        "items": [
            {
                "articleTags": ["food:Building:Building style:Industrial", "food:Topic:Inspired by", "food:Location and setting:Australia:New South Wales:Blue Mountains", "food:Price range:Renovating:$250,001 - $500,000", "food:Season:Autumn", "food:Building:Type:Apartment/unit", "food:Room:Living:Open plan living room", "food:Decorating:Style:Minimalist", "food:Homes navigation:Indoor"], "source": "Australian House and Garden",
                "body": [
                    {"type": "paragraph", "label": "Paragraph", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan ex non tortor condimentum, non iaculis felis consequat. Duis in iaculis metus. Duis ut metus elementum, imperdiet dui eu, vulputate tortor. Ut at est nulla. Nunc vehicula urna erat, a lobortis tellus viverra nec. "},
                    {"type": "image", "label": "Image", "content": {"url": "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/homes/2015/06/11/1433988041609_1290369106179f.jpg", "valid": true, "title": "Good news everybody", "caption": "Caption: Good news everybody"}},
                ],
                "title": "Marina's Article - This is my long title, I like to be descriptive",
                "summaryTitle": "Marina's Article - Short Title",
                "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan ex non tortor condimentum, non iaculis felis consequat. Duis in iaculis metus.",
                "imageUrl": "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/homes/2015/06/11/1229/anne-marina_d.jpg",
                "id": "HOMES-1229",
                "name": "Marina Test Article"
            }
        ],
        "paging": {
            "pages": 4,
            "totalResults": 31
        }
    }
};