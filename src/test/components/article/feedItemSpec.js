import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const FeedItemStub = Context.createStubComponent();
const themeSpy = sinon.spy();
noCallThru();

describe('FeedItem', () => {
    const dataPath = 'item.source';
    let HomesFeedItems;

    before(() => {
        HomesFeedItems = proxyquire('../../../app/components/article/feedItem', {
            '@bxm/tags/lib/components/link': FeedItemStub,
            '@bxm/article/lib/components/feed/feedItem': FeedItemStub,
            '../helpers/theme': themeSpy
        });
    });

    it(`should call the theme higher order component with the FeedItem component and ${dataPath}`, () => {
        expect(themeSpy).to.be.calledOnce;
        expect(themeSpy.args[0][1]).to.be.deep.eq(dataPath);
    });
});
