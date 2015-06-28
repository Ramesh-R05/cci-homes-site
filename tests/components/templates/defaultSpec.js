import {betterMockComponentContext} from '@bxm/flux';
import {forOwn} from 'lodash/object';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

let content;
Context.addStore('EntityStore', {
    getContent() {
        return content;
    }
});

const NetworkHeaderStub = Context.createStubComponent();
const HomepageStub = Context.createStubComponent();
const HomesArticleStub = Context.createStubComponent();
const SectionStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();
const proxyquire = require('proxyquire').noCallThru();
const Default = proxyquire('../../../app/components/templates/default', {
    'react': React,
    'react/addons': React,
    '@bxm/header/lib/header/header': NetworkHeaderStub,
    '../home/home': HomepageStub,
    '../article/section': HomesArticleStub,
    '../section/section': SectionStub,
    '../gallery/gallery': GalleryStub
});

describe('Default Component template', () => {
    let reactModule;
    let template;
    let header;

    it('returns a null handler if content is not specified', () => {
        content = undefined;
        reactModule = Context.mountComponent(Default);
        expect(React.findDOMNode(reactModule)).to.be.null;
    });

    it('returns a null handler if nodeType is unknown', () => {
        content = { nodeType: 'RickRoll' };
        reactModule = Context.mountComponent(Default);
        expect(React.findDOMNode(reactModule)).to.be.null;
    });

    forOwn({
        'Homepage': { component: HomepageStub, hideHeader: false },
        'HomesArticle': { component: HomesArticleStub, hideHeader: false },
        'NavigationSection': { component: SectionStub, hideHeader: false },
        'Gallery': { component: GalleryStub, hideHeader: true }
    }, (metadata, nodeType) => {
        const {component, hideHeader} = metadata;

        describe(`for nodeType "${nodeType}"`, () => {
            before(() => {
                content = { nodeType };
                reactModule = Context.mountComponent(Default);
            });

            it('returns the correct handler', () => {
                template = TestUtils.findRenderedComponentWithType(reactModule, component);
                expect(template).to.exist;
            });

            it(`${hideHeader ? 'hides' : 'shows'} the network header`, () => {
                header = TestUtils.scryRenderedComponentsWithType(reactModule, NetworkHeaderStub);
                expect(header).to.have.length(hideHeader ? 0 : 1);
            });
        });
    });
});
