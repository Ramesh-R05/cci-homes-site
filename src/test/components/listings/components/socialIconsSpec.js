import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const SocialIconStub = Context.createStubComponent();

const SocialIcons = proxyquire('../../../../app/components/listings/components/socialIcons', {
    '@bxm/social/lib/components/socialIcons/socialIcon': SocialIconStub
}).default;

const selectors = {
    root: '.social-icons',
    vertical: 'social-icons--vertical'
};

const TestWrapper = new ShallowWrapperFactory(SocialIcons);

const mockSocialLinks = [
    { name: 'facebook', url: listingMock.facebookUrl },
    { name: 'twitter', url: listingMock.twitterUrl },
    { name: 'pinterest', url: listingMock.pinterestUrl },
    { name: 'instagram', url: listingMock.pinterestUrl }
];

describe('SocialIcons component', () => {
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
                    links: mockSocialLinks
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders 4 SocialIcon components', () => {
                expect(wrapper.find(SocialIconStub)).to.have.length(4);
            });

            it('passes the correct props to each SocialIcon', () => {
                wrapper.find(SocialIconStub).forEach((comp, i) => {
                    expect(comp.props()).to.deep.eq(testProps.links[i]);
                });
            });
        });

        describe('with isVertial prop', () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper({
                    links: mockSocialLinks,
                    isVertical: true
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('applies the is-vertical modifier class to the root element', () => {
                const { root, vertical } = selectors;

                expect(wrapper.find(root).prop('className')).to.include(vertical);
            });
        });

        describe('with invalid props', () => {
            describe('links not passed', () => {
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
