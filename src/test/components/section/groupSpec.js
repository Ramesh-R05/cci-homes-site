import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren({className: 'teaser'});
const PolarTeaserStub = Context.createStubComponentWithChildren({className: 'teaser teaser--native'});
const Group = proxyquire('../../../app/components/section/group', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '../polar/polarTeaser': PolarTeaserStub
});

describe('Group', () => {

    describe('with 3 articles and a modifier prop', () => {
        let section;
        let reactModule;
        let teasers;
        const groupModifier = 'modifier';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group articles={articlesMock.slice(1, 4)} modifier={groupModifier} />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, `section--${groupModifier}`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        it(`should render three teasers`, () => {
            expect(teasers.length).to.equal(3);
        });

        const expectedTeaserModifier = Group.defaultProps.teaserModifier;
        it(`should set the Teaser modifier prop to the default '${expectedTeaserModifier}'`, () => {
            expect(teasers[0].props.modifier).to.equal(expectedTeaserModifier);
        });
    });

    describe('with a teaser modifier prop', () => {
        let section;
        let reactModule;
        let teasers;
        const groupModifier = 'modifier';
        const teaserModifier = 'teaser-modifier';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    modifier={groupModifier}
                    teaserModifier={teaserModifier}
                    />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, `section--${groupModifier}`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        it(`should set the Teaser modifier prop to the default '${teaserModifier}'`, () => {
            expect(teasers[0].props.modifier).to.equal(teaserModifier);
        });
    });

    describe('with a className prop', () => {
        let section;
        let reactModule;
        const className = 'test-class';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    className={className}
                    modifier={'modifier'}
                />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, className);
        });

        it('Group should exist', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('should have the custom classname "${className}"', () => {
            let classNames = ReactDOM.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });
    });

    describe('with children', () => {
        let reactModule;
        let childComponent;
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group articles={articlesMock.slice(1, 4)} modifier={'modifier'}>
                    <ChildrenComponentStub />
                </Group>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(ReactDOM.findDOMNode(childComponent)).to.exist;
        });
    });

    describe('with the polarAd prop', () => {
        const polarAdLabel = 'label_1';
        const teaserModifier = 'teaser-modifier';
        let reactModule;
        let articleTeasers;
        let polarTeaser;
        let allTeasers;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    modifier={'modifier'}
                    polarAd={{
                        index: 1,
                        label: polarAdLabel
                    }}
                    teaserModifier={teaserModifier}
                />
            );
            articleTeasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeaser = TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
            allTeasers = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'teaser');
        });

        const expectedNumTeasers = 2;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(articleTeasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumPolarTeasers = 1;
        it(`should render ${expectedNumPolarTeasers} polar teasers`, () => {
            expect(polarTeaser.length).to.equal(expectedNumPolarTeasers);
        });

        it(`should render the polar teaser in the second position`, () => {
            expect(allTeasers[1].getAttribute('class')).to.contain('teaser--native');
        });

        it(`should pass down the ad settings to the PolarTeaser`, () => {
            expect(polarTeaser[0].props.ad).to.deep.equal({
                label: polarAdLabel,
                targets: {
                    kw: polarAdLabel
                }
            });
        });

        it(`should pass down the modifier to the PolarTeaser`, () => {
            expect(polarTeaser[0].props.modifier).to.equal(teaserModifier);
        });

        it(`should pass down the initial article to the PolarTeaser`, () => {
            expect(polarTeaser[0].props.id).to.equal(articlesMock[2].id);
        });
    });

    describe('with the polarAd prop but no index key', () => {
        let reactModule;
        let articleTeasers;
        let polarTeaser;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    modifier={'modifier'}
                    polarAd={{
                        label: 'label_1'
                    }}
                />
            );
            articleTeasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeaser = TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
        });

        const expectedNumTeasers = 3;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(articleTeasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumPolarTeasers = 0;
        it(`should render ${expectedNumPolarTeasers} polar teasers`, () => {
            expect(polarTeaser.length).to.equal(expectedNumPolarTeasers);
        });

    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group articles={[]} modifier={'modifier'} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group modifier={'modifier'} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the modifier prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group articles={articlesMock.slice(1, 4)} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });


});