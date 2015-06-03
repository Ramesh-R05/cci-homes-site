import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const Credits = proxyquire('../../../app/components/article/credits', {
    'react': React,
    'react/addons': React
});

describe(`Credits Component`, () => {
    const className = `article__credits`;
    const firstClassName = `article-credit--first`;
    const writer = articleMock.writer;
    const photographer = articleMock.photographer;
    const stylist = articleMock.stylist;
    const experter = articleMock.experter;


    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Credits, {
                writer, photographer, stylist, experter
            });
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(className)).to.be.greaterThan(-1);
        });

        it(`should render a writer and have set a class "${firstClassName}"`, () => {
            const writerEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__writer`);

            expect(writerEl).to.exist;
            expect(React.findDOMNode(writerEl).textContent).to.equal(`Writer: ${writer}`);
            expect(React.findDOMNode(writerEl).className.indexOf(firstClassName)).to.be.greaterThan(-1);
        });

        it(`should render a stylist`, () => {
            const stylistEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__stylist`);

            expect(stylistEl).to.exist;
            expect(React.findDOMNode(stylistEl).textContent).to.equal(`Stylist: ${stylist}`);
            expect(React.findDOMNode(stylistEl).className.indexOf(firstClassName)).to.equal(-1);

        });

        it(`should render a photographer`, () => {
            const photographerEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__photographer`);

            expect(photographerEl).to.exist;
            expect(React.findDOMNode(photographerEl).textContent).to.equal(`Photographer: ${photographer}`);
            expect(React.findDOMNode(photographerEl).className.indexOf(firstClassName)).to.equal(-1);

        });

        it(`should render a experter`, () => {
            const experterEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__renovation-experter`);

            expect(experterEl).to.exist;
            expect(React.findDOMNode(experterEl).textContent).to.equal(`Renovation experter: ${experter}`);
            expect(React.findDOMNode(experterEl).className.indexOf(firstClassName)).to.equal(-1);
        });
    });

    describe(`when passing all expect a writer`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Credits, {
                photographer, stylist, experter
            });
        });

        it(`should not render the writer`, () => {
            const writerEl = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `article-credit__writer`);

            expect(writerEl[0]).to.not.exist;
        });

        it(`should render the photographer and have set a class "${firstClassName}"`, () => {
            const photographerEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__photographer`);

            expect(photographerEl).to.exist;
            expect(React.findDOMNode(photographerEl).textContent).to.equal(`Photographer: ${photographer}`);
            expect(React.findDOMNode(photographerEl).className.indexOf(firstClassName)).to.be.greaterThan(-1);
        });

        it(`should render a stylist`, () => {
            const stylistEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__stylist`);

            expect(stylistEl).to.exist;
            expect(React.findDOMNode(stylistEl).textContent).to.equal(`Stylist: ${stylist}`);
            expect(React.findDOMNode(stylistEl).className.indexOf(firstClassName)).to.equal(-1);
        });

        it(`should render a experter`, () => {
            const experterEl = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article-credit__renovation-experter`);

            expect(experterEl).to.exist;
            expect(React.findDOMNode(experterEl).textContent).to.equal(`Renovation experter: ${experter}`);
            expect(React.findDOMNode(experterEl).className.indexOf(firstClassName)).to.equal(-1);
        });
    });
});
