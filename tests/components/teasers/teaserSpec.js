import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const ImageStub = Context.createStubComponentWithChildren();
const TitleStub = Context.createStubComponentWithChildren();
const SummaryStub = Context.createStubComponentWithChildren();
const SourceStub = Context.createStubComponentWithChildren();
const TagsStub = Context.createStubComponentWithChildren();
const Teaser = proxyquire('../../../app/components/teaser/teaser', {
    'react': React,
    '@bxm/article/lib/components/teaser/title': TitleStub,
    '@bxm/article/lib/components/teaser/image': ImageStub,
    '@bxm/article/lib/components/teaser/summary': SummaryStub,
    './tags': TagsStub,
    './source': SourceStub,
    './icon': Context.createStubComponent()
});

describe('Teaser', () => {

    describe('with correct article data', () => {
        let reactModule;
        let Image;
        let Title;
        let Summary;
        let Tags;
        let Source;
        const props = articlesMock.basic;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            Image = TestUtils.findRenderedComponentWithType(reactModule, ImageStub);
            Title = TestUtils.findRenderedComponentWithType(reactModule, TitleStub);
            Summary = TestUtils.findRenderedComponentWithType(reactModule, SummaryStub);
            Source = TestUtils.findRenderedComponentWithType(reactModule, SourceStub);
            Tags = TestUtils.findRenderedComponentWithType(reactModule, TagsStub);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        const expectedClassName = 'teaser';
        it(`should be rendered with the .${expectedClassName} classname`, () => {
            const component = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedClassName);
            expect(component.length).to.equal(1);
        });

        // Image
        it(`should set the Image link prop to ${props.url}`, () => {
            expect(Image.props.link).to.equal(props.url);
        });

        it(`should set the Image imageUrl prop to ${props.imageUrl}`, () => {
            expect(Image.props.imageUrl).to.equal(props.imageUrl);
        });

        it(`should set the Image alt prop to ${props.imageAltText}`, () => {
            expect(Image.props.alt).to.equal(props.imageAltText);
        });

        it(`should set the Image gtmClass prop to gtm-${props.id}`, () => {
            expect(Image.props.gtmClass).to.equal(`gtm-${props.id}`);
        });

        it(`should set the Image breakpoints prop`, () => {
            expect(Image.props.breakpoints).to.equal(require('../../../app/breakpoints'));
        });

        // Title
        it(`should set the Title url prop to ${props.url}`, () => {
            expect(Title.props.url).to.equal(props.url);
        });

        it(`should set the Title title prop to ${props.title}`, () => {
            expect(Title.props.title).to.equal(props.title);
        });

        it(`should set the Title gtmClass prop to gtm-${props.id}`, () => {
            expect(Title.props.gtmClass).to.equal(`gtm-${props.id}`);
        });

        //Summary
        it(`should set the Summary summary prop to ${props.summary}`, () => {
            expect(Summary.props.summary).to.equal(props.summary);
        });

        //Source
        it(`should set the Source source prop to ${props.source}`, () => {
            expect(Source.props.source).to.equal(props.source);
        });

        //Tags
        it(`should set the Tags tags prop to ${props.articleTags}`, () => {
            expect(Tags.props.tags).to.deep.equal(props.articleTags);
        });
    });

    describe('with the modifier prop', () => {
        let reactModule;
        let Image;
        const props = articlesMock.basic;
        props.modifier = 'hero';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            Image = TestUtils.findRenderedComponentWithType(reactModule, ImageStub);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        const expectedClassName = 'teaser--hero';
        it(`should be rendered with the .${expectedClassName} classname`, () => {
            const component = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedClassName);
            expect(component.length).to.equal(1);
        });

    });

    describe('with the sizes prop', () => {
        let reactModule;
        let Image;
        const props = articlesMock.basic;
        props.sizes = 'narrow';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            Image = TestUtils.findRenderedComponentWithType(reactModule, ImageStub);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it(`should set the Image sizes prop to`, () => {
            expect(Image.props.imageSizes).to.deep.eq(Teaser.imageSizes[props.sizes]);
        });
    });

    describe('without the id prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser />);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

});
