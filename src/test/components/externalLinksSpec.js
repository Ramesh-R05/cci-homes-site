import { betterMockComponentContext } from '@bxm/flux';
import React from 'react';
import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
const Context = betterMockComponentContext();
const SocialIconStub = Context.createStubComponent();

noCallThru();

const ExternalLinksStub = proxyquire('../../app/components/externalLinks', {
    React: React,
    '@bxm/social/lib/components/socialIcons/socialIcon': SocialIconStub
}).default;

describe('ExternalLinks', () => {
    let wrapper;
    let siteLogo;
    let siteLogoImg;
    let socialLinks;
    let props = {
        directoryLogoUrl: {
            url: 'http://logo-img-url.jpg'
        },
        externalLinks: {
            website: 'http://website.com',
            facebook: 'http://facebook.com',
            instagram: 'https://instagram.com',
            pinterest: 'https://pinterest.com'
        }
    };
    beforeEach(() => {
        wrapper = shallow(<ExternalLinksStub {...props} />);
        siteLogoImg = wrapper.find('.external-links__site-logo__img');
        siteLogo = wrapper.find('.external-links__site-logo');
        socialLinks = wrapper.find(SocialIconStub);
    });

    it('should render site logo', () => {
        expect(siteLogo).to.exist;
    });

    it('should render site logo img', () => {
        expect(siteLogoImg).to.exist;
    });

    it('should render site logo img with correct img src', () => {
        expect(siteLogo.prop('href')).to.equal(props.externalLinks.website);
    });

    it('should render site logo img with correct site link', () => {
        expect(siteLogoImg.prop('src')).to.equal(props.directoryLogoUrl.url);
    });

    it('should render 3 social links', () => {
        expect(socialLinks.length).to.equal(3);
    });

    it('should render scocial links with correct link prop', () => {
        const facebooklink = socialLinks.get(0);
        expect(facebooklink.props.name).to.equal('facebook');
        expect(facebooklink.props.url).to.equal('http://facebook.com');
    });
});
