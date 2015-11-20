import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';
import cloneDeep from 'lodash/lang/cloneDeep';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const Teaser = proxyquire('../../../app/components/polar/polarTeaser', {
    'react': React,
    '@bxm/ad/lib/polar/decorators/polarAd': (component) => component,
    '@bxm/ad/lib/polar/decorators/polarConfig': (component) => component,
    '../teaser/teaser': TeaserStub
});


describe('PolarTeaser', () => {

    describe(`without the ad prop`, () => {
        let reactModule;
        let teaser;
        const props = articlesMock.basic;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['ad', 'modifier'])).to.deep.equal(props);
        });
    });

    describe(`when polar doesn't return a response`, () => {
        let reactModule;
        let teaser;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'test' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['modifier'])).to.deep.equal(props);
        });
    });

    describe(`with an ad label and when polar doesn't return a response`, () => {
        let reactModule;
        let teaser;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'ad_label' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['modifier'])).to.deep.equal(props);
        });
    });
});
