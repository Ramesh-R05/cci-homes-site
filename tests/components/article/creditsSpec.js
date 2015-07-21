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
    const articleCreditClassName = `article-credit`;
    const valueClassName = `article-credit__value`;
    const authorProfiles = articleMock.authorProfiles;

    let reactModule;
    let writer;
    let photog;
    let stylist;
    let experter;

    describe(`passed all props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Credits, { authorProfiles });
            writer = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'article-credit--writer')[0];
            photog = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'article-credit--photographer')[0];
            stylist = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'article-credit--stylist')[0];
            experter = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'article-credit--renovation-expert')[0];
        });

        it(`renders with class "${className}"`, () => {
            expect(React.findDOMNode(reactModule)).to.have.className(className);
        });

        it(`renders the writer list item with class name ${articleCreditClassName}`, () => {
            expect(React.findDOMNode(writer).textContent).to.eq('Writer: Writer Alpha');
            expect(writer).to.have.className(articleCreditClassName);
        });

        it(`wraps each writer name in a span with class name "${valueClassName}"`, () => {
            const writers = TestUtils.scryRenderedDOMComponentsWithClass(writer, valueClassName);
            expect(writers).to.have.length(1);
            expect(writers.map(w => React.findDOMNode(w).textContent)).to.eql([
                'Writer Alpha'
            ]);
        });

        it(`renders the photographer list item with class name ${articleCreditClassName}`, () => {
            expect(React.findDOMNode(photog).textContent).to.eq('Photographers: Photog Alpha, Photog Bravo');
            expect(photog).to.have.className(articleCreditClassName);
        });

        it(`wraps each photographer name in a span with class name "${valueClassName}"`, () => {
            const photogs = TestUtils.scryRenderedDOMComponentsWithClass(photog, valueClassName);
            expect(photogs).to.have.length(2);
            expect(photogs.map(p => React.findDOMNode(p).textContent)).to.eql([
                'Photog Alpha',
                'Photog Bravo'
            ]);
        });

        it(`renders the renovation experter list item with class name ${articleCreditClassName}`, () => {
            expect(React.findDOMNode(experter).textContent).to.eq('Renovation expert: Renovation Expert Alpha');
            expect(experter).to.have.className(articleCreditClassName);
        });

        it(`renders the credits in order`, () => {
            const items = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'li');
            const labels = items.map(i => React.findDOMNode(i).textContent.split(':')[0]);

            expect(labels).to.eql([
                'Writer',
                'Photographers',
                'Stylist',
                'Renovation expert',

                // Unknown credit titles get thrown on at the end in the order
                // that they were encountered
                'unknownb',
                'unknown'
            ]);
        });
    });

    describe(`passed all props`, () => {
        it(`does not render when the credits are empty`, () => {
            reactModule = Context.mountComponent(Credits, { authorProfiles: [] });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });

        it(`does not render the credits are not specified`, () => {
            reactModule = Context.mountComponent(Credits, {});
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });
});
