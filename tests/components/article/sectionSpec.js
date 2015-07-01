import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import feedMock from '../../mock/feed';
import {noop} from 'lodash/utility';
import {findWhere} from 'lodash/collection';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const ArticleStub = Context.createStubComponent();
const FeedStub = Context.createStubComponent();
const feedConfigMock = {};
const getPageMock = () => {};
const ArticleSection = proxyquire('../../../app/components/article/section', {
    'react': React,
    'react/addons': React,
    './article': ArticleStub,
    '../feed/feed': FeedStub,
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

    afterEach(Context.cleanup);

    before(`rendering component`, () => {
        reactModule = Context.mountComponent(ArticleSection);
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

        it(`should pass the article navigation tag as a param`, () => {
            expect(getPageAction.payload.params.tags).to.eql([
                'homes:Homes navigation:Outdoor',
                'homes:Homes navigation:Garden'
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
        const { body: contentBody, title, articleTags } = articleMock;
        const { imageUrl, imageAltText, imageCaption, video } = articleMock;
        const { source, summary } = articleMock;
        const heroItem = {imageUrl, imageAltText, imageCaption, video};

        // TODO (cjenkins): change when credits are in the CMS
        const mockCredits = {
            writer: 'John Doe',
            photographer: 'Julia Smith',
            stylist: 'Julie Brooks',
            experter: 'Andrew White'
        };

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
            expect(article.props.tags).to.eql(articleTags);
        });

        it(`sets the credits prop`, () => {
            expect(article.props.credits).to.eql(mockCredits);
        });
    });

    describe(`Feed`, () => {
        const articleTags = [
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

        it(`sets the articleTags to an array`, () => {
            expect(feed.props.articleTags).to.eql(articleTags);
        });

        it(`sets the pageId to ${pageId}`, () => {
            expect(feed.props).to.have.property('pageId', pageId);
        });
    });
});
