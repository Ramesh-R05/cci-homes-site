import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';
import intersection from 'lodash/array/intersection';
import extend from 'lodash/object/extend';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

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

    const allowedThemeClasses = ['theme-australian_house_and_garden', 'theme-real_living', 'theme-homes_', 'theme-belle'];

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
                let domElement = ReactDOM.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        const expectedClassName = 'teaser';
        it(`should be rendered with the .${expectedClassName} classname`, () => {
            const component = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedClassName);
            expect(component.length).to.equal(1);
        });

        it(`Teaser should have the themeClass defined`, () => {
            expect(reactModule).to.have.property('themeClass');
        });

        it(`Teaser should have the themeClass set to one of these theme values .${allowedThemeClasses} `, () => {
            const intersect = intersection([reactModule.themeClass], allowedThemeClasses);
            expect(intersect.length).to.eq(1);
        });

        it(`should have the themeClass set to one of these theme values .${allowedThemeClasses} `, () => {
            const classNames = ReactDOM.findDOMNode(reactModule).className.split(/\s+/);
            const intersect = intersection(classNames, allowedThemeClasses);
            expect(intersect.length).to.eq(1);
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

        const expectedImgQuality = 80;
        it(`should set the Image quality prop to ${expectedImgQuality}`, () => {
            expect(Image.props.quality).to.equal(expectedImgQuality);
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
        it(`should set the Tags tags prop to ${props.tags}`, () => {
            expect(Tags.props.tags).to.deep.equal(props.tags);
        });
    });

    describe('with the modifier prop', () => {
        let reactModule;
        let Image;
        const props = extend({}, articlesMock.basic, { modifier: 'hero' });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            Image = TestUtils.findRenderedComponentWithType(reactModule, ImageStub);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = ReactDOM.findDOMNode(reactModule);
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
        let image;
        const props = extend({}, articlesMock.basic, { sizes: 'narrow' });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            image = TestUtils.findRenderedComponentWithType(reactModule, ImageStub);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = ReactDOM.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it(`should set the Image sizes prop to`, () => {
            expect(image.props.imageSizes).to.deep.eq({
                s: {w: 640, h: 341},
                m: {w: 640, h: 341},
                l: {w: 400, h: 213},
                xl: {w: 300, h: 160}
            });
        });
    });

    describe('without the id prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser />);
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = ReactDOM.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

});
