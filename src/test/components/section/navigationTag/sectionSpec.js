import {Component, PropTypes} from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as articlesMock} from '../../../mock/articles';
import {items as gogMock} from '../../../mock/galleryOfGalleries';

const ComponentContext = betterMockComponentContext();
const React = ComponentContext.React;
const TestUtils = ComponentContext.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const GenericSectionStub = ComponentContext.createStubComponentWithChildren();
const InlineGalleryStub = ComponentContext.createStubComponent();

const Section = proxyquire('../../../../app/components/section/navigationTag/section', {
    'react': React,
    '../../actions/facetedModule': {getPage: () => {}},
    '../section': GenericSectionStub,
    '../../inlineGallery/customInlineGallery': InlineGalleryStub
});

ComponentContext.addStore('AppStore', {
    getContent: () => entity,
    getModuleItems: () => gogMock,
    getItems: () => articlesMock,
    getNavigationTags: () => tags,
    getList: () => articlesMock,
    getListNextParams: () => articlesMock
});

describe(`NavigationTagSection`, () => {
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
        expect(genericSection.props.content).to.deep.equal(entity);
    });

    it(`should pass down the isSideMenuOpen prop to the GenericSection component`, () => {
        expect(genericSection.props.isSideMenuOpen).to.be.false;
    });

    it(`should pass down the inlineGalleries component to the GenericSection component with the galleries data`, () => {
        expect(genericSection.props.inlineGalleries.props.galleries).to.deep.equal(gogMock);
    });
});

