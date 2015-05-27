import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

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
    const source = articleMock.source;
    const className = `article__source`;
    const imgPath = `/images/source/`;

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, {
                source
            });
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(className)).to.be.greaterThan(-1);
        });

        it(`should render text "Article By" followed by the brand logo`, () => {
            const image = TestUtils.findRenderedDOMComponentWithTag(reactModule, `img`);
            expect(React.findDOMNode(reactModule).textContent).to.equal(`Article By`);
            expect(React.findDOMNode(image).src).to.contain(`${imgPath}australian-house-and-garden.svg`);

        });
    });

    describe(`when passing no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, {});
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
