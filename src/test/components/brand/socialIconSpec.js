import { betterMockComponentContext } from '@bxm/flux';
import { articles as articlesMock } from '../../mock/articles';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const SocialIcon = proxyquire('../../../app/components/brand/socialIcon', {
    react: React
}).default;

describe('Brand SocialIcon', () => {
    let reactModule;
    let link;
    let svg;
    let name = 'facebook';
    const url = 'http://link.com/';

    describe('with name prop equal to facebook and a url prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name={name} url={url} />);
            link = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'a');
            svg = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'svg');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the link with the correct url`, () => {
            expect(link.href).to.equal(url);
        });

        it(`should render the svg image with the correct HTML`, () => {
            expect(ReactDOM.findDOMNode(svg).innerHTML).to.equal(SocialIcon.icons[name]);
        });
    });

    describe('with name prop equal to twitter and a url prop', () => {
        before(() => {
            name = 'twitter';
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name={name} url={url} />);
            svg = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'svg');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the svg image with the correct HTML`, () => {
            expect(ReactDOM.findDOMNode(svg).innerHTML).to.equal(SocialIcon.icons[name]);
        });
    });

    describe('with name prop equal to instagram and a url prop', () => {
        before(() => {
            name = 'instagram';
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name={name} url={url} />);
            svg = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'svg');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the svg image with the correct HTML`, () => {
            expect(ReactDOM.findDOMNode(svg).innerHTML).to.equal(SocialIcon.icons[name]);
        });
    });

    describe('with name prop equal to pinterest and a url prop', () => {
        before(() => {
            name = 'pinterest';
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name={name} url={url} />);
            svg = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'svg');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the svg image with the correct HTML`, () => {
            expect(ReactDOM.findDOMNode(svg).innerHTML).to.equal(SocialIcon.icons[name]);
        });
    });

    describe('with name prop equal to random and a url prop', () => {
        before(() => {
            name = 'random';
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name={name} url={url} />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the name prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<SocialIcon url={url} />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the url prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<SocialIcon name="facebook" />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
