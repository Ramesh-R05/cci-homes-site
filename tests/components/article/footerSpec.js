import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const ArticleCreditsStub = Context.createStubComponent();
const ArticleSourceStub = Context.createStubComponent();
const ArticleTagsStub = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Footer = proxyquire('../../../app/components/article/footer', {
    'react': React,
    'react/addons': React,
    './credits': ArticleCreditsStub,
    './source': ArticleSourceStub,
    './tags': ArticleTagsStub
});

describe(`Article Footer Component`, () => {
    const articleClassName = `article__footer`;
    const { source, articleTags: tags, authorProfiles } = articleMock;

    let reactModule;
    let tagsTag;
    let creditsTag;
    let sourceTag;

    describe(`passed all props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Footer, { source, tags, authorProfiles });
            tagsTag = TestUtils.scryRenderedComponentsWithType(reactModule, ArticleTagsStub)[0];
            creditsTag = TestUtils.scryRenderedComponentsWithType(reactModule, ArticleCreditsStub)[0];
            sourceTag = TestUtils.scryRenderedComponentsWithType(reactModule, ArticleSourceStub)[0];
        });

        it(`renders the component with class "${articleClassName}"`, () => {
            expect(React.findDOMNode(reactModule)).to.have.className(articleClassName);
        });

        describe(`"Tags" sub-component`, () => {
            it(`renders`, () => {
                expect(React.findDOMNode(tagsTag)).to.exist;
            });

            it(`sets the "tags" prop`, () => {
                expect(tagsTag.props.tags).to.eql(tags);
            });
        });

        describe(`"Credits" sub-component`, () => {
            it(`renders`, () => {
                expect(React.findDOMNode(creditsTag)).to.exist;
            });

            it(`sets the "authorProfile" prop`, () => {
                expect(creditsTag.props.authorProfiles).to.eql(authorProfiles);
            });
        });

        describe(`"Source" sub-component`, () => {
            it(`renders`, () => {
                expect(React.findDOMNode(sourceTag)).to.exist;
            });

            it(`sets the "source" prop`, () => {
                expect(sourceTag.props.source).to.eql(source);
            });
        });
    });

    describe(`passed no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Footer, {});
        });

        it(`renders the component with class "${articleClassName}"`, () => {
            const domNode = React.findDOMNode(reactModule);
            expect(domNode).to.exist;
            expect(domNode).to.have.className(articleClassName);
        });
    });
});
