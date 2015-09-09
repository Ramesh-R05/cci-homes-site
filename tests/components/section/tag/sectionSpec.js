import {Component, PropTypes} from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as articlesMock} from '../../../mock/articles';
import merge from 'lodash/object/merge';

const ComponentContext = betterMockComponentContext();
const React = ComponentContext.React;
const TestUtils = ComponentContext.TestUtils;

// ----------------------------------------------------------------------------- Stubbed components

const proxyquire = require('proxyquire').noCallThru();
const GenericSectionStub = ComponentContext.createStubComponentWithChildren();

const Section = proxyquire('../../../../app/components/section/tag/section', {
    'react': React,
    '../../actions/facetedModule': {getPage: () => {}},
    '../section': GenericSectionStub
});

// ----------------------------------------------------------------------------- Mocked data/stores

const tags = ['Test'];
const pagination = {nbFirstPageItems: 20, nbLoadMoreItems: 18};

ComponentContext.addStore('TagSectionStore', {
    getItems: () => articlesMock,
    getConfiguration: () => null,
    getIsLoading: () => false,
    getPaging: () => {},
    getCurrentPage: () => 0
});

ComponentContext.addStore('EntityStore', {
    getNavigationTags: () => tags,
    getContent: () => entity
});

ComponentContext.addStore('RequestStore', {
    getTagLeaf: () => tags
});


// ----------------------------------------------------------------------------- tests

describe(`TagSection`, () => {
    let reactModule;

    afterEach(() => {
        ComponentContext.cleanup();
    });

    let genericSection;

    before(() => {
        const contextConfigStub = {
            key: 'config',
            type: '',
            value: {pagination: pagination}
        };
        reactModule = ComponentContext.mountComponent(Section, {}, [contextConfigStub]);
        genericSection = TestUtils.findRenderedComponentWithType(reactModule, GenericSectionStub);
    });

    it(`should pass down the pagination prop to the GenericSection component`, () => {
        expect(genericSection.props.pagination).to.deep.equal(pagination);
    });

    it(`should pass down the nbLoadMoreClicks prop to the GenericSection component`, () => {
        expect(genericSection.props.nbLoadMoreClicks).to.equal(0);
    });

    it(`should pass down the articles prop to the GenericSection component`, () => {
        expect(genericSection.props.articles).to.deep.equal(articlesMock);
    });

    it(`should pass down the content prop to the GenericSection component`, () => {
        expect(genericSection.props.content).to.deep.equal(entity);
    });

    it(`should pass down the currentPage prop to the GenericSection component`, () => {
        expect(genericSection.props.currentPage).to.equal(0);
    });

    it(`should pass down the isLoading prop to the GenericSection component`, () => {
        expect(genericSection.props.isLoading).to.be.false;
    });

    it(`should pass down the isSideMenuOpen prop to the GenericSection component`, () => {
        expect(genericSection.props.isSideMenuOpen).to.be.false;
    });

    it(`should pass down the moduleConfig prop to the GenericSection component`, () => {
        expect(genericSection.props.moduleConfig).to.be.null;
    });

    it(`should pass down the tags prop to the GenericSection component`, () => {
        expect(genericSection.props.tags).to.deep.equal(tags);
    });

});

