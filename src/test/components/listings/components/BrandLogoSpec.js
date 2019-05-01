import BrandLogo from '../../../../app/components/listings/components/BrandLogo';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import listingMock from '../../../mock/listing';

const selectors = {
    root: '.listing-brand-logo',
    anchor: '.listing-brand-logo__anchor',
    image: '.listing-brand-logo__image'
};

const TestWrapper = new ShallowWrapperFactory(BrandLogo);

describe('BrandLogo component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });

        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    url: listingMock.businessLogo.url,
                    link: listingMock.businessLogo.link,
                    title: listingMock.businessLogo.title,
                    caption: listingMock.businessLogo.caption
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the a tag', () => {
                const { anchor } = selectors;

                expect(wrapper.find(anchor).exists()).to.be.true;
            });

            it('passes the correct attributes to the a tag', () => {
                const { anchor } = selectors;

                expect(wrapper.find(anchor).props()).to.include({
                    href: testProps.link,
                    title: testProps.title
                });
            });

            it('renders the img tag', () => {
                const { image } = selectors;

                expect(wrapper.find(image).exists()).to.be.true;
            });

            it('passes the correct attributes to the img tag', () => {
                const { image } = selectors;

                expect(wrapper.find(image).props()).to.include({
                    src: testProps.url,
                    alt: testProps.caption
                });
            });
        });

        describe('with invalid props', () => {
            describe('url not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper();
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });
        });
    });
});
