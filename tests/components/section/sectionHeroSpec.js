import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const SectionHero = proxyquire('../../../app/components/section/hero', {
    'react': React,
    '../teaser/teaser': TeaserStub
});

describe('GroupHero', () => {
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

        it('should first teaser to be load with lazyloader off and second one on', () => {
            expect(teasers[0].props.lazyload).to.equal(false);
            expect(teasers[1].props.lazyload).to.equal(undefined);
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
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
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
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });

});
