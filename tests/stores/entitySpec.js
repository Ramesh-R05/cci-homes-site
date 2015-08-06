import cloneDeep from 'lodash/lang/cloneDeep';
import EntityStore from '../../app/stores/entity';
import entityMocks from '../mock/entities';

describe('Entity store', () => {
    let store;
    let emitChangeStub;

    describe('after initialising', () => {
        before(() => {
            store = new EntityStore();
        });

        it('should initialize with empty title', () => {
            expect(store.getTitle()).to.equal('');
        });

        it('should initialize with empty content', () => {
            expect(store.getContent()).to.deep.equal({});
        });

        it('should initialize with empty sectionTags', () => {
            expect(store.getNavigationTags()).to.deep.equal([]);
        });
    });

    describe('after receiving content for an article', () => {
        const pageMock = entityMocks.article;
        const entityMock = pageMock.body.entity;
        let emitChangeStub;

        before(() => {
            store = new EntityStore();
            emitChangeStub = sinon.stub(store, 'emitChange');
            store.onLoadContent(pageMock);
        });

        it(`should have the title equal to ${entityMock.title}`, () => {
            expect(store.getTitle()).to.equal(entityMock.title);
        });

        it(`should have an undefined sectionTags`, () => {
            expect(store.getNavigationTags()).to.be.undefined;
        });

        it(`should have the content equal to the entity body`, () => {
            expect(store.getContent()).to.deep.equal(entityMock);
        });

        it('should have called the store emitChange method', () => {
            expect(emitChangeStub.calledOnce).to.be.true;
        });
    });

    describe('after receiving content for a section filtered by tag', () => {
        const pageMock = entityMocks.section;
        const entityMock = pageMock.body.entity;

        before(() => {
            store = new EntityStore();
            store.onLoadContent(pageMock);
        });

        it(`should have the title equal to ${entityMock.title}`, () => {
            expect(store.getTitle()).to.equal(entityMock.title);
        });

        it(`should have the sectionTags equal to ${entityMock.navigationTags}`, () => {
            expect(store.getNavigationTags()).to.deep.equal(entityMock.navigationTags);
        });

        it(`should have the content equal to the entity body`, () => {
            expect(store.getContent()).to.deep.equal(entityMock);
        });
    });

    describe('after receiving content without the entity object', () => {
        const pageMock = cloneDeep(entityMocks.section);
        delete pageMock.body.entity;

        before(() => {
            store = new EntityStore();
            store.onLoadContent(pageMock);
        });

        it('should have an empty title', () => {
            expect(store.getTitle()).to.equal('');
        });

        it('should have an empty content', () => {
            expect(store.getContent()).to.deep.equal({});
        });

        it('should have an empty sectionTags', () => {
            expect(store.getNavigationTags()).to.deep.equal([]);
        });
    });

    describe('after receiving an error', () => {
        const error = { code: 418 };

        before(() => {
            store = new EntityStore();
            emitChangeStub = sinon.stub(store, 'emitChange');
            store.onLoadContentFailed({
                response: { error }
            });
        });

        it('stores the error data', () => {
            expect(store.getErrorStatus()).to.deep.eq(error);
        });

        it('sets its own content to null', () => {
            expect(store.getContent()).to.be.null;
        });

        it('emits a change', () => {
            expect(emitChangeStub).to.have.been.calledOnce;
        });
    });
});
