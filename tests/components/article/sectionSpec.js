import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import feedMock from '../../mock/feed';
import noop from 'lodash/utility/noop';
import findWhere from 'lodash/collection/findWhere';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const ArticleStub = Context.createStubComponent();
const FeedStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const feedConfigMock = {};
const getPageMock = () => {};
const ArticleSection = proxyquire('../../../app/components/article/section', {
    'react': React,
    'react/addons': React,
    './article': ArticleStub,
    '../feed/feed': FeedStub,
    '../footer/footer': FooterStub,
    '../../actions/facetedModule': { getPage: getPageMock }
});


Context.addStore('EntityStore', {
    getTitle() {
        return articleMock.title;
    },
    getContent() {
        return articleMock;
    }
});

Context.addStore('FeedStore', {
    getConfiguration() {
        return feedConfigMock;
    },
    getItems() {
        return feedMock;
    }
});

describe(`ArticleSection Component`, () => {
    const sectionClassName = `article-section`;
    let reactModule;
    const localDataMock = {iframeUrl: ''};
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: { get: (key) => key === 'localeData' ? localDataMock : {} }
    };


    before(`rendering component`, () => {
        reactModule = Context.mountComponent(ArticleSection, {}, [contextConfigStub]);
    });

    describe(`Stores`, () => {
        let getPageAction;
        before(() => {
            getPageAction = findWhere(Context.instanceContext.executeActionCalls, { action: getPageMock });
        });

        it(`should execute an action to collect the feed data`, () => {
            expect(getPageAction).to.exist;
        });

        it(`should pass the feed module config`, () => {
            expect(getPageAction.payload.moduleConfig).to.eql(feedConfigMock);
        });

        it(`should request only the 1st page of fed items`, () => {
            expect(getPageAction.payload.page).to.eq(0);
        });

        it(`should pass only the first the article navigation tag as a param`, () => {
            expect(getPageAction.payload.params.tags).to.eql([
                'homes:Homes navigation:Outdoor'
            ]);
        });
    });

    describe(`Section`, () => {
        it(`should render the Article Section with class "${sectionClassName}"`, () => {
            expect(TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName)).to.exist;
        });

        it(`should render the Article component on the page`, () => {
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleStub)).to.exist;
        });

        it(`should render the Article Feed on the page`, () => {
            expect(TestUtils.findRenderedComponentWithType(reactModule, FeedStub)).to.exist;
        });
    });

    describe(`Article`, () => {
        let article;
        const { body: contentBody, title, tags, authorProfiles } = articleMock;
        const { imageUrl, imageAltText, imageCaption, video } = articleMock;
        const { source, summary } = articleMock;
        const heroItem = {imageUrl, imageAltText, imageCaption, video};

        before(() => {
            article = TestUtils.findRenderedComponentWithType(reactModule, ArticleStub);
        });

        it(`sets the title prop`, () => {
            expect(article.props).to.have.property('title', title);
        });

        it(`sets the heroItem prop`, () => {
            expect(article.props.heroItem).to.eql(heroItem);
        });

        it(`sets the contentBody prop`, () => {
            expect(article.props.contentBody).to.eql(contentBody);
        });

        it(`sets the source prop`, () => {
            expect(article.props.source).to.eql(source);
        });

        it(`sets the summary prop`, () => {
            expect(article.props.summary).to.eq(summary);
        });

        it(`sets the tags prop`, () => {
            expect(article.props.tags).to.eql(tags);
        });

        it(`sets the authorProfiles prop`, () => {
            expect(article.props.authorProfiles).to.eql(authorProfiles);
        });
    });

    describe(`Feed`, () => {
        const tags = [
            'homes:Topic:Garden planner',
            'homes:Homes navigation:Outdoor',
            'homes:Homes navigation:Garden'
        ];
        const pageId = 'HOMES-1169';
        let feed;

        before(() => {
            feed = TestUtils.findRenderedComponentWithType(reactModule, FeedStub);
        });

        it(`sets the items to an array`, () => {
            expect(feed.props.items).to.eql(feedMock);
        });

        it(`sets the tags to an array`, () => {
            expect(feed.props.tags).to.eql(tags);
        });

        it(`sets the pageId to ${pageId}`, () => {
            expect(feed.props).to.have.property('pageId', pageId);
        });
    });

    describe(`Footer`, () => {
        let footer;
        before(() => {
            footer = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
        });

        const expectedIframeId = 'articlefooter';
        it(`sets the items to ${expectedIframeId}`, () => {
            expect(footer.props.iframeKey).to.eql(expectedIframeId);
        });

        it(`sets the correct data`, () => {
            expect(footer.props.config).to.deep.eql(localDataMock);
        });

        const expectedModifier = 'article';
        it(`sets the modifier to ${expectedModifier}`, () => {
            expect(footer.props.modifier).to.eql(expectedModifier);
        });
    });
});
