import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import each from 'lodash/collection/each';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Source = proxyquire('../../../app/components/article/source', {
    'react': React,
    'react/addons': React
});

describe(`Source Component`, () => {
    let reactModule;
    let link;
    let image;

    describe(`when passing all props`, () => {
        const source = articleMock.source;
        const className = `article__source`;
        const imgPath = `/assets/images/source`;
        const sourceUrl = `http://www.homestolove.com.au/house-and-garden/`;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, { source });
            link = TestUtils.findRenderedDOMComponentWithTag(reactModule, `a`);
            image = TestUtils.findRenderedDOMComponentWithTag(link, `img`);
        });

        it(`should render the component with class "${className}"`, () => {
            expect(React.findDOMNode(reactModule)).to.have.className(className);
        });

        it(`should render text "Article By" followed by the brand logo`, () => {
            expect(React.findDOMNode(reactModule).textContent).to.equal(`Article By`);
        });

        it(`should render the brand logo`, () => {
            expect(image.props.src).to.eq(`${imgPath}/australian-house-and-garden.svg`);
        });

        it(`should link the brand logo to URL "${sourceUrl}"`, () => {
            expect(link.props.href).to.eq(sourceUrl);
        });
    });

    describe(`source links`, () => {
        each({
            'homes+': 'http://www.homestolove.com.au/homes-plus/',
            'real living': 'http://www.homestolove.com.au/real-living/',
            'Belle': 'http://www.homestolove.com.au/belle/',
            'Australian House and Garden': 'http://www.homestolove.com.au/house-and-garden/'
        }, (sourceUrl, source) => {
            it(`should link the ${source} brand logo to "${sourceUrl}"`, () => {
                reactModule = Context.mountComponent(Source, { source });
                link = TestUtils.findRenderedDOMComponentWithTag(reactModule, `a`);
                expect(link.props.href).to.eq(sourceUrl);
            });
        });

        it(`should not render at all if the source is unknown`, () => {
            reactModule = Context.mountComponent(Source, { source: `Tony Abbott` });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });

    describe(`when passing no props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, {});
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
