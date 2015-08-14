import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const FeedItemStub = Context.createStubComponent();

const RelatedContent = proxyquire('../../../app/components/article/relatedContent', {
    'react': React,
    'react/addons': React,
    '../feed/feedItem': FeedItemStub
});

describe(`RelatedContent Component`, () => {
    const relatedContentItemsMock = articleMock.body[9].content;
    const className = 'related-content';
    const title = 'Related Articles';

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        let feedItemStub;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(RelatedContent, {
                items: relatedContentItemsMock
            });

            feedItemStub = TestUtils.scryRenderedComponentsWithType(reactModule, FeedItemStub);
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });

        it(`should render a title "${title}"`, () => {
            const h2 = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h2');
            expect(React.findDOMNode(h2).textContent).to.equal(title);
        });

        it(`should render ${relatedContentItemsMock.length} related articles`, () => {
            expect(feedItemStub.length).to.equal(relatedContentItemsMock.length);

            expect(feedItemStub[0].props.item).to.deep.equal(relatedContentItemsMock[0]);
            expect(feedItemStub[0].props.gtmClass).to.equal('gtm-related-link');

            expect(feedItemStub[1].props.item).to.deep.equal(relatedContentItemsMock[1]);
            expect(feedItemStub[1].props.gtmClass).to.equal('gtm-related-link');
        });
    });

    describe(`when passing no props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(RelatedContent, {});
        });

        it(`should not render into the DOM`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
