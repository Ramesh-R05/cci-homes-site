import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const LinkStub = Context.createStubComponentWithChildren();
const proxyquire = require('proxyquire').noCallThru();
const Source = proxyquire('../../../app/components/teaser/source', {
    react: React,
    '../brand/link': LinkStub
});

describe('TeaserSource', () => {
    let reactModule;

    describe('with the source prop', () => {
        const sourceValue = 'Homes+';
        let link;
        let source;
        let svg;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source source={sourceValue} />);
            link = TestUtils.findRenderedComponentWithType(reactModule, LinkStub);
            svg = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'icon-source');
            source = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__source');
        });

        it(`should have the source text equal to '${sourceValue}'`, () => {
            expect(ReactDOM.findDOMNode(source).textContent.replace(/(\n|\s)/g, '')).to.equal(sourceValue);
        });

        it('should render the icon', () => {
            const icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'icon-source');
            expect(ReactDOM.findDOMNode(source)).to.exist;
        });

        it('should pass the relevant props to the SourceLink component', () => {
            expect(link.props.source).to.eq(sourceValue);
            expect(link.props.linkSiteBrand).to.eq(false);
        });

        it('should wrap the icon and source text inside the SourceLink component', () => {
            const linkSVG = TestUtils.findRenderedDOMComponentWithClass(link, 'icon-source');

            expect(linkSVG).to.deep.eq(svg);
            expect(ReactDOM.findDOMNode(link).textContent.replace(/(\n|\s)/g, '')).to.equal(sourceValue);
        });
    });

    describe('without the source prop as an empty string', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source source="" />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the source prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
