import { Component, PropTypes } from 'react';
import { betterMockComponentContext } from '@bxm/flux';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const GenericSectionStub = Context.createStubComponentWithChildren();

const Section = proxyquire('../../../../app/components/section/sponsorTag/section', {
    react: React,
    '../section': GenericSectionStub
});

const tags = 'title';
const sponsorsMock = [
    {
        Campain: 'test'
    },
    {
        Campain: 'test2'
    }
];

Context.addStore('PageStore', {
    getContent: () => {
        return {
            title: tags
        };
    },

    getItems: () => sponsorsMock,
    getList: () => sponsorsMock,
    getListNextParams: () => sponsorsMock
});

describe('SponsorTagSection', () => {
    let reactModule;
    let genericSection;

    afterEach(() => {
        Context.cleanup();
    });

    beforeEach(() => {
        reactModule = Context.mountComponent(Section);
        genericSection = TestUtils.findRenderedComponentWithType(reactModule, GenericSectionStub);
    });

    it('should have pass down the sponsors', () => {
        expect(genericSection.props.articles).to.deep.equal(sponsorsMock);
    });

    it(`should pass down the isSideMenuOpen prop to the GenericSection component`, () => {
        expect(genericSection.props.isSideMenuOpen).to.be.false;
    });
});
