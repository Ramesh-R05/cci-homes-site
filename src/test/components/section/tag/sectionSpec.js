import { Component, PropTypes } from 'react';
import { betterMockComponentContext } from '@bxm/flux';
import { articles as articlesMock } from '../../../mock/articles';
import merge from 'lodash/object/merge';

const ComponentContext = betterMockComponentContext();
const React = ComponentContext.React;
const TestUtils = ComponentContext.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const GenericSectionStub = ComponentContext.createStubComponentWithChildren();

const Section = proxyquire('../../../../app/components/section/tag/section', {
    react: React,
    '../section': GenericSectionStub
});

const tags = ['luxury-home'];
const mockEntity = {
    title: 'Luxury home',
    urlName: 'luxury-home',
    nodeType: 'TagSection',
    pageTitle: 'Luxury home',
    pageMetaDescription: 'Luxury home'
};

ComponentContext.addStore('PageStore', {
    getContent: () => mockEntity,
    getItems: () => articlesMock,
    getNavigationTags: () => tags,
    getList: () => articlesMock,
    getListNextParams: () => articlesMock
});

describe(`TagSection`, () => {
    let reactModule;

    afterEach(() => {
        ComponentContext.cleanup();
    });

    let genericSection;

    before(() => {
        reactModule = ComponentContext.mountComponent(Section, {});
        genericSection = TestUtils.findRenderedComponentWithType(reactModule, GenericSectionStub);
    });

    it(`should pass down the articles prop to the GenericSection component`, () => {
        expect(genericSection.props.articles).to.deep.equal(articlesMock);
    });

    it(`should pass down the content prop to the GenericSection component`, () => {
        expect(genericSection.props.content).to.deep.equal(mockEntity);
    });

    it(`should pass down the isSideMenuOpen prop to the GenericSection component`, () => {
        expect(genericSection.props.isSideMenuOpen).to.be.false;
    });
});
