import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import each from 'lodash/collection/each';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const SocialIconsStub = Context.createStubComponent();

const SocialLinks = proxyquire('../../../app/components/social/socialLinks', {
    'react': React,
    './socialIcons': SocialIconsStub
}).default;

describe(`SocialLinks`, () => {
    const links = [
        { name: 'facebook', url: 'https://www.facebook.com/homestoloveau' },
        { name: 'twitter', url: 'https://twitter.com/homestoloveau' },
        { name: 'instagram', url: 'https://www.instagram.com/homestoloveau' },
        { name: 'pinterest', url: 'https://www.pinterest.com/homestoloveau' }
    ];
    const expectedSocialIconsCount = links.length;
    let reactModule;
    let socialIcons;

    before(() => {
        reactModule = Context.mountComponent(SocialLinks, { links });
        socialIcons = TestUtils.scryRenderedComponentsWithType(reactModule, SocialIconsStub);
    });

    it(`should render the SocialLinks Component`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it(`should render ${expectedSocialIconsCount} SocialIcons components`, () => {
        expect(socialIcons.length).to.eq(expectedSocialIconsCount);
    });

    each(links, (icon, i) => {
        const {name, url} = icon;

        describe(`${name} social icon`, () => {
            it(`sets the name to "${name}"`, () => {
                expect(socialIcons[i].props.name).to.eq(name);
            });

            it(`sets the url to "${url}"`, () => {
                expect(socialIcons[i].props.url).to.eq(url);
            });
        });
    });
});
