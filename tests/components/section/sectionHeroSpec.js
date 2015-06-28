import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const SectionHero = proxyquire('../../../app/components/section/hero', {
    'react': React,
    '../teaser/teaser': TeaserStub
});

describe('SectionHero', () => {
    describe('with firstHero and secondHero defined', () => {
        let sectionHero;
        let reactModule;
        let teasers;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <SectionHero firstHero={articlesMock.slice(0, 1)[0]} secondHero={articlesMock.slice(4, 5)[0]} />
            );
            sectionHero = TestUtils.findRenderedComponentWithType(reactModule, SectionHero);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        it(`should render two teasers`, () => {
            expect(teasers.length).to.equal(2);
        });

    });

    describe('with only firstHero defined', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <SectionHero firstHero={articlesMock.slice(0, 1)[0]} />
            );
        });

        it(`should render`, () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('with firstHero not defined', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <SectionHero />
            );
        });

        it(`should not render`, () => {
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });

});
