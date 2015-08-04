import {betterMockComponentContext} from '@bxm/flux';
import each from 'lodash/collection/each';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const FooterSocialIconStub = Context.createStubComponent();

const FooterSocialLinks = proxyquire('../../../app/components/footer/footerSocialLinks', {
    'react': React,
    './footerSocialIcon': FooterSocialIconStub
});

describe(`FooterSocialLinks`, () => {
    const nbSocialIcons = 3;
    let reactModule;
    let footerSocialIcons;

    before(() => {
        reactModule = Context.mountComponent(FooterSocialLinks);
        footerSocialIcons = TestUtils.scryRenderedComponentsWithType(reactModule, FooterSocialIconStub);
    });

    it(`should render the FooterSocialLinks Component`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });

    it(`should render ${nbSocialIcons} FooterSocialIcons components`, () => {
        expect(footerSocialIcons.length).to.eq(nbSocialIcons);
    });

    each([
        { name: 'facebook', url: 'http://www.facebook.com/homestoloveau', label: 'homestolove' },
        { name: 'twitter', url: 'http://twitter.com/homestoloveau', label: '@homestolove' },
        { name: 'instagram', url: 'http://instagram.com/homestoloveau/', label: 'homestolove' }
    ], (icon, i) => {
        const {name, url, label} = icon;

        describe(`${name} social icon`, () => {
            it(`sets the name to "${name}"`, () => {
                expect(footerSocialIcons[i].props.name).to.eq(name);
            });

            it(`sets the url to "${url}"`, () => {
                expect(footerSocialIcons[i].props.url).to.eq(url);
            });

            it(`sets the label to "${label}"`, () => {
                expect(footerSocialIcons[i].props.label).to.eq(label);
            });
        });
    });
});
