import { betterMockComponentContext } from '@bxm/flux';
import { articles as articlesMock } from '../../mock/articles';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponent();
const Subscribe = proxyquire('../../../app/components/brand/subscribe', {
    react: React,
    '../teaser/teaser': TeaserStub
}).default;

describe('Brand Subscribe', () => {
    let reactModule;
    let teaser;
    const image = 'http://image.com';
    const link = 'http://image.com';
    const defaultSubscribeUrl = 'http://default.com';
    const className = 'testClass';
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            get() {
                return defaultSubscribeUrl;
            }
        }
    };

    describe('with all props', () => {
        before(() => {
            reactModule = Context.mountComponent(
                Subscribe,
                {
                    className,
                    image,
                    link
                },
                [contextConfigStub]
            );
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should render the component`, () => {
            const dom = ReactDOM.findDOMNode(reactModule);
            expect(dom).to.exist;
            expect(dom.className).to.contain(`brand-subscribe`);
            expect(dom.className).to.contain(className);
        });

        it(`should render the teaser component with relevant props`, () => {
            const summary =
                'Subscribe to get your hands on more inspiring homes and gardens, plus renovating,' + ' decorating, food and travel stories.';

            expect(teaser.props.id).to.equal(`brand-subscribe`);
            expect(teaser.props.modifier).to.equal(`img-top`);
            expect(teaser.props.title).to.equal(`Subscribe now`);
            expect(teaser.props.url).to.equal(link);
            expect(teaser.props.summary).to.equal(summary);
            expect(teaser.props.imageUrl).to.equal(image);
        });
    });

    describe('without props', () => {
        let reactModule;

        before(() => {
            reactModule = Context.mountComponent(Subscribe, {}, [contextConfigStub]);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub);
        });

        it(`should render the component`, () => {
            const dom = ReactDOM.findDOMNode(reactModule);
            expect(dom).to.exist;
            expect(dom.className).to.contain(`brand-subscribe`);
            expect(dom.className).to.not.contain(className);
        });

        it(`should render the teaser component with relevant props`, () => {
            const summary =
                'Subscribe to get your hands on more inspiring homes and gardens, plus renovating,' + ' decorating, food and travel stories.';

            expect(teaser.props.id).to.equal(`brand-subscribe`);
            expect(teaser.props.modifier).to.equal(`img-top`);
            expect(teaser.props.title).to.equal(`Subscribe now`);
            expect(teaser.props.url).to.equal(defaultSubscribeUrl);
            expect(teaser.props.summary).to.equal(summary);
            expect(teaser.props.imageUrl).to.be.undefined;
        });
    });
});
