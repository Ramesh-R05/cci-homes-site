import {extend} from 'lodash';
import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const FeedAd = proxyquire('../../../app/components/feed/feedAd', {
    'react': React,
    'react/addons': React,
    '@bxm/ad/src/google/components/ad': AdStub
});

describe('FeedAd Component', () => {
    let reactModule;
    let li;
    let ad;

    before(() => {
        reactModule = TestUtils.renderIntoDocument(<FeedAd/>);
        li = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'li');
        ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
    });

    const expectedClassName = 'feed-ad';
    it(`sets the li className to "${expectedClassName}"`, () => {
        expect(React.findDOMNode(li).className).to.eq(expectedClassName);
    });

    it('sets the Ad displayFor array', () => {
        expect(ad.props.displayFor).to.eql(['medium', 'large', 'xlarge']);
    });

    it('sets the Ad sizes array', () => {
        expect(ad.props.sizes).to.eql(['double-mrec', 'mrec']);
    });
});
