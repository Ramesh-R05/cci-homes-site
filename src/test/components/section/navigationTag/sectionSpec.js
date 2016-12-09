import {Component, PropTypes} from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as articlesMock} from '../../../mock/articles';
import {items as gogMock} from '../../../mock/galleryOfGalleries';
import merge from 'lodash/object/merge';

const ComponentContext = betterMockComponentContext();
const React = ComponentContext.React;
const TestUtils = ComponentContext.TestUtils;

// ----------------------------------------------------------------------------- Stubbed components

const proxyquire = require('proxyquire').noCallThru();
const GenericSectionStub = ComponentContext.createStubComponentWithChildren();
const InlineGalleryStub = ComponentContext.createStubComponent();

const Section = proxyquire('../../../../app/components/section/navigationTag/section', {
    'react': React,
    '../../actions/facetedModule': {getPage: () => {}},
    '../section': GenericSectionStub,
    '../../inlineGallery/customInlineGallery': InlineGalleryStub,
    '@bxm/tags/lib/utils': {
        getTagName: () => 'interiors'
    }
});

// ----------------------------------------------------------------------------- Mocked data/stores

const tags = [{ name: 'homes:Homes navigation:Section' }];
const pagination = {nbFirstPageItems: 20, nbLoadMoreItems: 18};

ComponentContext.addStore('AppStore', {
    getContent: () => entity,
    getModuleItems: () => gogMock,
    getItems: () => articlesMock,
    getNavigationTags: () => tags,
    getList: () => articlesMock,
    getListNextParams: () => articlesMock
});


// ----------------------------------------------------------------------------- tests

describe(`NavigationTagSection`, () => {
    let reactModule;

    afterEach(() => {
        ComponentContext.cleanup();
    });

    let genericSection;

    before(() => {
        const contextConfigStub = {
            key: 'config',
            type: React.PropTypes.object,
            value: {pagination: pagination}
        };
        reactModule = ComponentContext.mountComponent(Section, {}, [contextConfigStub]);
        genericSection = TestUtils.findRenderedComponentWithType(reactModule, GenericSectionStub);
    });

    it(`should pass down the articles prop to the GenericSection component`, () => {
        expect(genericSection.props.articles).to.deep.equal(articlesMock);
    });

    it(`should pass down the content prop to the GenericSection component`, () => {
        expect(genericSection.props.content).to.deep.equal(entity);
    });

    it(`should pass down the isSideMenuOpen prop to the GenericSection component`, () => {
        expect(genericSection.props.isSideMenuOpen).to.be.false;
    });

    it(`should pass down the tags prop to the GenericSection component`, () => {
        expect(genericSection.props.tags).to.deep.equal(tags);
    });

    it(`should pass down the inlineGalleries component to the GenericSection component with the galleries data`, () => {
        expect(genericSection.props.inlineGalleries.props.galleries).to.deep.equal(gogMock);
    });
});

