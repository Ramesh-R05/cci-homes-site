import TestWrapperFactory from '../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';

import FooterLink from '../../../app/components/site-footer/footerLink';
import configMock from '../../mock/config';

function getLink() {
    return { ...configMock.footer.links.corporate[0] };
}

const TestWrapper = TestWrapperFactory(FooterLink);

describe('FooterLink', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(restoreErrors);

            it('does not render', () => {
                expect(wrapper.find('.footer-link').exists()).to.be.false;
            });
        });

        describe('with valid props', () => {
            let wrapper;
            let testProps;

            before(() => {
                filterErrors();
                [wrapper, testProps] = TestWrapper({ ...getLink(), gtmClass: 'gtm-footer-link-test', target: '_blank' });
            });

            after(restoreErrors);

            it('renders', () => {
                expect(wrapper.childAt(0).exists()).to.be.true;
            });

            it('has correct class for root', () => {
                expect(wrapper.hasClass('footer-link')).to.be.true;
            });

            it('applies the gtm class to the anchor element', () => {
                expect(wrapper.find('.footer-link__anchor').props().className).to.include(testProps.gtmClass);
            });

            it('applies the url prop to the href attribute on the anchor element', () => {
                expect(wrapper.find('.footer-link__anchor').props().href).to.eq(testProps.url);
            });

            it('applies the target prop to the target attribute on the anchor element', () => {
                expect(wrapper.find('.footer-link__anchor').props().target).to.eq(testProps.target);
            });

            it('sets the inner text to the value of the text prop', () => {
                expect(wrapper.find('.footer-link__anchor').text()).to.eq(testProps.title);
            });
        });

        describe('with invalid props', () => {
            describe('title prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({ ...getLink(), title: undefined });
                });

                after(restoreErrors);

                it('does not render', () => {
                    expect(wrapper.find('.footer-link').exists()).to.be.false;
                });
            });
            describe('gtmClass prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({ ...getLink(), gtmClass: undefined });
                });

                after(restoreErrors);

                it('does not render', () => {
                    expect(wrapper.find('.footer-link').exists()).to.be.false;
                });
            });
            describe('url prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({ ...getLink(), url: undefined });
                });

                after(restoreErrors);

                it('does not render', () => {
                    expect(wrapper.find('.footer-link').exists()).to.be.false;
                });
            });
            describe('title, url and gtmClass not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper({ url: undefined, title: undefined, gtmClass: undefined });
                });

                after(restoreErrors);

                it('does not render', () => {
                    expect(wrapper.find('.footer-link').exists()).to.be.false;
                });
            });
        });
    });
});
