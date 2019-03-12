import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const LinkStub = Context.createStubComponentWithChildren();
const getStub = sinon.stub();
noCallThru();

const Source = proxyquire('../../../app/components/teaser/source', {
    react: React,
    '../brand/link': LinkStub
});

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        get: getStub
    }
};

describe('TeaserSource', () => {
    let reactModule;

    describe('with the source prop', () => {
        const sourceValue = 'Country Style';
        const sourceLogoPath = 'countrystyle.svg';
        getStub.withArgs(`article.sources.${sourceValue.toLowerCase()}.logo`).returns(sourceLogoPath);
        let link;
        let source;
        let svg;
        let brandImage;

        before(() => {
            reactModule = Context.mountComponent(Source, { source: sourceValue }, [contextConfigStub]);
            link = TestUtils.findRenderedComponentWithType(reactModule, LinkStub);
            svg = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'icon-source');
            source = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__source');
            brandImage = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__source-image');
        });

        it(`should have the source image equal to the source prop'`, () => {
            expect(ReactDOM.findDOMNode(brandImage).getAttribute('alt')).to.equal(sourceValue);
            expect(ReactDOM.findDOMNode(brandImage).getAttribute('src')).to.equal('/assets/images/source/countrystyle.svg');
        });

        it('should render the icon', () => {
            expect(ReactDOM.findDOMNode(source)).to.exist;
        });

        it('should pass the relevant props to the SourceLink component', () => {
            expect(link.props.source).to.eq(sourceValue);
            expect(link.props.linkSiteBrand).to.eq(false);
        });

        it('should wrap the icon and source text inside the SourceLink component', () => {
            const linkSVG = TestUtils.findRenderedDOMComponentWithClass(link, 'icon-source');
            expect(linkSVG).to.deep.eq(svg);
        });
    });

    describe('without the source prop as an empty string', () => {
        before(() => {
            reactModule = Context.mountComponent(Source, { source: '' }, [contextConfigStub]);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the source prop', () => {
        before(() => {
            reactModule = Context.mountComponent(Source, {}, [contextConfigStub]);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
