import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const RepeatableGroup = proxyquire('../../../app/components/section/repeatableGroup', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

describe('RepeatableGroup', () => {

    describe('with 9 articles', () => {
        let section;
        let reactModule;
        let teasers;
        let ads;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <RepeatableGroup items={articlesMock.slice(1, 10)} adTargets={{ position: 2 }} />
            );
            section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `section--9-items`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        const expectedNumSections = 1;
        it(`should render ${expectedNumSections} section`, () => {
            expect(section.length).to.equal(expectedNumSections);
        });

        const expectedNumTeasers = 9;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumAds = 2;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });

        describe(`native polar teasers`, () => {
            it(`should pass down the ad prop`, () => {
                expect(teasers[1].props.polar).to.deep.equal({
                    label: 'section_teaser_2',
                    targets: {
                        kw: 'section_teaser_2'
                    }
                });
            });
        });

        describe(`banner/leaderboard/billboard ad`, () => {
            it(`should not exist`, () => {
                const leaderboards = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'ad--section-middle-leaderboard');
                expect(leaderboards.length).to.equal(0);
            });
        });

        describe(`Mrec ad (visible only on large viewport)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[0].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = 'mrec';
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[0].props.sizes).to.equal(expectedSizes);
            });

            const expectedDisplayFor = 'large';
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[0].props.displayFor).to.equal(expectedDisplayFor);
            });
        });

        describe(`Mrec ad (visible only on small/medium/xlarge viewports)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[1].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'mrec',
                xlarge: ['double-mrec', 'mrec']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[1].props.sizes).to.deep.equal(expectedSizes);
            });

            const expectedDisplayFor = ['small', 'medium', 'xlarge'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[1].props.displayFor).to.deep.equal(expectedDisplayFor);
            });
        });

    });

    describe('with 10 articles', () => {
        let section;
        let reactModule;
        let teasers;
        let ads;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <RepeatableGroup items={articlesMock.slice(0, 10)} adTargets={{ position: 2 }} />
            );
            section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `section--9-items`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        const expectedNumSections = 2;
        it(`should render ${expectedNumSections} section`, () => {
            expect(section.length).to.equal(expectedNumSections);
        });

        const expectedNumTeasers = 11;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumAds = 5;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });

        describe(`banner/leaderboard/billboard ad in 2nd section`, () => {
            const expectedClassname = 'ad--section-middle-leaderboard';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[2].props.className).to.equal(expectedClassname);
            });

            it(`should be at position 2`, () => {
                expect(ads[2].props.targets).to.deep.equal({position: 2});
            });

            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };

            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[2].props.sizes).to.eql(expectedSizes);
            });
        });

        describe(`Mrec ad (visible only on large viewport) in 2nd section`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[3].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = 'mrec';
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[3].props.sizes).to.equal(expectedSizes);
            });

            const expectedDisplayFor = 'large';
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[3].props.displayFor).to.equal(expectedDisplayFor);
            });

            it(`should be at position 2`, () => {
                expect(ads[3].props.targets).to.deep.equal({position: 2});
            });
        });

        describe(`Mrec ad (visible only on small/medium/xlarge viewports) in 2nd section`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[4].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'mrec',
                xlarge: ['double-mrec', 'mrec']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[4].props.sizes).to.deep.equal(expectedSizes);
            });

            const expectedDisplayFor = ['small', 'medium', 'xlarge'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[4].props.displayFor).to.deep.equal(expectedDisplayFor);
            });

            it(`should be at position 2`, () => {
                expect(ads[4].props.targets).to.deep.equal({position: 2});
            });
        });

    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<RepeatableGroup items={[]} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<RepeatableGroup />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

});
