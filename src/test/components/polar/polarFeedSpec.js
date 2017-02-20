import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';
import cloneDeep from 'lodash/lang/cloneDeep';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';
import proxyquire, {noCallThru} from 'proxyquire';

noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const FeedItemStub = Context.createStubComponentWithChildren();

const FeedItem = proxyquire('../../../app/components/polar/polarFeed', {
    'react': React,
    '@bxm/ad/lib/polar/decorators/polarAd': (component) => component,
    '@bxm/ad/lib/polar/decorators/polarConfig': (component) => component,
    '../article/feedItem': FeedItemStub,
});


describe('Polar Feed Item', () => {

    describe(`without the ad prop`, () => {
        let reactModule;
        let feedItem;
        const props = articlesMock.basic;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<FeedItem {...props} />);
            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub)
        });

        it('should render the initial article teaser', () => {
            expect(feedItem).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(feedItem.props, ['ad', 'modifier'])).to.deep.equal(props);
        });
    });

    describe(`when polar doesn't return a response`, () => {
        let reactModule;
        let feedItem;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'test' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<FeedItem {...props} />);
            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub)
        });

        it('should render the initial article teaser', () => {
            expect(feedItem).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(feedItem.props, ['modifier'])).to.deep.equal(props);
        });
    });

    describe(`with an ad label and when polar doesn't return a response`, () => {
        let reactModule;
        let feedItem;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'ad_label' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<FeedItem {...props} />);
            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub)
        });

        it('should render the initial article teaser', () => {
            expect(feedItem).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(feedItem.props, ['modifier'])).to.deep.equal(props);
        });
    });
});
