import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import configMock from '../../mock/config';
import TestWrapperFactory from '../../utils/ShallowWrapperFactory';

noCallThru();

const { React, createStubComponent, createStubComponentWithChildren } = betterMockComponentContext();

const FooterColumnStub = createStubComponentWithChildren();
const FooterSocialStub = createStubComponent();
const FooterLinkStub = createStubComponent();
const NewsletterStub = createStubComponent();

const SiteFooter = proxyquire('../../../app/components/site-footer/site-footer', {
    react: React,
    './footerColumn': FooterColumnStub,
    './footerLink': FooterLinkStub,
    './footerSocial': FooterSocialStub,
    '../newsletter': NewsletterStub
}).default;

const TestWrapper = TestWrapperFactory(SiteFooter);

describe('SiteFooter component', () => {
    describe('context', () => {
        describe('has footer links in config', () => {
            let wrapper;
            let testContext;

            before(() => {
                [wrapper, , testContext] = TestWrapper({}, { config: configMock });
            });

            it('renders', () => {
                expect(wrapper.find('.site-footer').exists()).to.be.true;
            });

            it('renders three <FooterColumn/> components', () => {
                expect(wrapper.find(FooterColumnStub)).to.have.length(3);
            });

            it('renders the social container', () => {
                expect(wrapper.find('.site-footer__social').exists()).to.be.true;
            });

            it('renders the correct children for the social container', () => {
                const socialContainer = wrapper.find('.site-footer__social');

                expect(
                    socialContainer
                        .childAt(0)
                        .find(NewsletterStub)
                        .exists()
                ).to.be.true;

                expect(
                    socialContainer
                        .childAt(1)
                        .find(FooterSocialStub)
                        .exists()
                ).to.be.true;
            });

            it('renders the correct number of children for the brands <FooterColumn/>', () => {
                const brandsColumn = wrapper.find(FooterColumnStub).at(0);

                expect(brandsColumn.children()).to.have.length(testContext.config.brands.site.length);
            });

            it('passes the correct props to each child for the brands <FooterColumn/>', () => {
                const brandsColumn = wrapper.find(FooterColumnStub).at(0);

                brandsColumn.children().forEach((child, i) => {
                    expect(child.props().title).to.eq(testContext.config.brands.site[i].title);
                    expect(child.props().url).to.eq(testContext.config.brands.site[i].url);
                    expect(child.props().gtmClass).to.eq('gtm-footer-brand');
                });
            });

            it('renders the correct number of children for the network links <FooterColumn/>', () => {
                const networkColumn = wrapper.find(FooterColumnStub).at(1);
                expect(networkColumn.children()).to.have.length(testContext.config.brands.network.length);
            });

            it('passes the correct props to each child for the network links <FooterColumn/>', () => {
                const networkColumn = wrapper.find(FooterColumnStub).at(1);

                networkColumn.children().forEach((child, i) => {
                    expect(child.props().title).to.eq(testContext.config.brands.network[i].title);
                    expect(child.props().url).to.eq(testContext.config.brands.network[i].url);
                    expect(child.props().gtmClass).to.eq('gtm-footer-network');
                    expect(child.props().target).to.eq('_blank');
                });
            });

            it('renders the correct number of children for the corporate links <FooterColumn/>', () => {
                const corporateColumn = wrapper.find(FooterColumnStub).at(2);

                expect(corporateColumn.children()).to.have.length(testContext.config.footer.links.corporate.length); // the +1 is for the copyright element
            });

            it('passes the correct props to each child for the corporate links <FooterColumn/>', () => {
                const corporateColumn = wrapper.find(FooterColumnStub).at(2);

                corporateColumn
                    .children()
                    .slice(0, corporateColumn.children().length - 1)
                    .forEach((child, i) => {
                        expect(child.props().title).to.eq(testContext.config.footer.links.corporate[i].title);
                        expect(child.props().url).to.eq(testContext.config.footer.links.corporate[i].url);
                        expect(child.props().gtmClass).to.eq(testContext.config.footer.links.corporate[i].gtmClass);
                        expect(child.props().target).to.eq('_blank');
                    });
            });

            it('renders the copyright section with the correct text', () => {
                expect(wrapper.find('.site-footer__copyright-text').text()).to.include(`© Copyright ${new Date().getFullYear()} Are Media Pty Limited`);
            });
        });

        describe('missing footer links in config', () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper({}, { config: {} });
            });

            it('does not render', () => {
                expect(wrapper.find('.site-footer').exists()).to.be.false;
            });
        });
    });
});
