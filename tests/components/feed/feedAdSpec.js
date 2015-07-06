import {clone} from 'lodash/lang';
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
    const position = 2;
    const keyword = ['red', 'white', 'kitchen'];
    const pageId = 'kitchen-1032';
    const source = 'homes+';
    const props = { position, keyword, pageId, source };
    let reactModule;

    describe('all props set', () => {
        let li;
        let ad;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<FeedAd {...props}/>);
            li = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'li');
            ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        });

        describe('li', () => {
            const expectedClassName = 'feed-ad';
            it(`sets the className to "${expectedClassName}"`, () => {
                expect(React.findDOMNode(li).className).to.eq(expectedClassName);
            });
        });

        describe('Ad', () => {
            it('sets the displayFor array', () => {
                expect(ad.props.displayFor).to.eql(['medium', 'large', 'xlarge']);
            });

            it('sets the sizes array', () => {
                expect(ad.props.sizes).to.eql(['double-mrec', 'mrec']);
            });

            it('sets the brand prop ${source}', () => {
                expect(ad.props.targets.brand).to.eq(source);
            });

            it(`sets targets.pageId to ${pageId}`, () => {
                expect(ad.props.targets.pageId).to.eq(pageId);
            });

            it(`sets targets.keyword to ${keyword}`, () => {
                expect(ad.props.targets.keyword).to.eql(keyword);
            });

            it(`sets targets.keyword to an array`, () => {
                expect(ad.props.targets.keyword).to.eql(keyword);
            });

            it(`sets targets.position to ${position}`, () => {
                expect(ad.props.targets.position).to.eq(position);
            });
        });
    });

    describe('required props unset', () => {
        let propsClone;

        beforeEach(() => {
            propsClone = clone(props);
        });

        ['position', 'keyword', 'pageId'].forEach(propName => {

            it(`returns an empty component when "${propName}" prop is empty`, () => {
                delete propsClone[propName];
                reactModule = TestUtils.renderIntoDocument(<FeedAd {...propsClone}/>);
                expect(React.findDOMNode(reactModule)).to.not.exist;
            });

        });
    });
});
