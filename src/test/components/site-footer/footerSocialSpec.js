import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import TestWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const { React, createStubComponent } = betterMockComponentContext();

const SocialIconStub = createStubComponent();

const FooterSocial = proxyquire('../../../app/components/site-footer/footerSocial', {
    react: React,
    '@bxm/social/lib/components/socialIcons/socialIcon': SocialIconStub
});

const TestWrapper = TestWrapperFactory(FooterSocial);

const defaultSocialLinksMock = {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://instagram.com/',
    pinterest: 'https://au.pinterest.com/',
    twitter: 'https://twitter.com/'
};

describe('FooterSocial', () => {
    describe('rendering', () => {
        describe('with valid socialUrls prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({ socialUrls: defaultSocialLinksMock });
            });

            it('renders', () => {
                expect(wrapper.exists()).to.be.true;
            });

            it('has correct class for root', () => {
                expect(wrapper.hasClass('footer-social')).to.be.true;
            });

            it('has correct class for title text', () => {
                expect(wrapper.find('.footer-social__title').exists()).to.be.true;
            });

            it('has correct title text', () => {
                expect(wrapper.find('.footer-social__title').text()).to.eq('Follow us');
            });

            it('renders 4 <SocialIcon/>', () => {
                expect(wrapper.find(SocialIconStub)).to.have.length(4);
            });
        });

        describe('missing socialUrls prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({});
            });

            it('does not render', () => {
                expect(wrapper.find('.footer-social').exists()).to.be.false;
            });
        });
    });
});
