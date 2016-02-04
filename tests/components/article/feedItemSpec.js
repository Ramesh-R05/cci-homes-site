import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const FeedItemStub = Context.createStubComponent();
const themeStub = sinon.stub();

describe('FeedItem', () => {
    const dataPath = 'item.source';

    before(() => {
        proxyquire('../../../app/components/article/feedItem', {
            '@bxm/article/lib/components/feed/feedItem': FeedItemStub,
            '../helpers/theme': themeStub
        });
    });

    it(`should call the theme higher order component with the FeedItem component and ${dataPath}`, () => {
        expect(themeStub).to.have.been.calledWith(FeedItemStub, dataPath);
    });
});
