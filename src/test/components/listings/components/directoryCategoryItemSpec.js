import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import breakpointsMock from '../../../mock/breakpoints';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const ResponsiveImageStub = Context.createStubComponent();
const imageResizeMock = {
    scale: {
        BOTH: 'BOTH'
    },
    anchor: {
        MC: 'MC'
    },
    mode: {
        CROP: 'CROP'
    }
};

const selectors = {
    root: '.directory-category-item',
    image: '.directory-category-item__image',
    button: '.directory-category-item__button',
    link: '.directory-category-item__link'
};

const DirectoryCategoryItem = proxyquire('../../../../app/components/listings/components/directoryCategoryItem', {
    '@bxm/ui/lib/common/ResponsiveImage': ResponsiveImageStub,
    '@bxm/ui/lib/common/ImageResize': imageResizeMock,
    '../../../breakpoints': breakpointsMock
});

const TestWrapper = new ShallowWrapperFactory(DirectoryCategoryItem);

const mockCategory = {
    url: '/directory/artists-and-galleries',
    title: 'Artists & Galleries',
    imageUrl:
        'http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/homes/2019/03/13/16207/1549584089322_RE1901Shop2181024ALWILLbannisters-3049copy.jpg'
};

describe('DirectoryCategoryItem component', () => {
    describe('rendering', () => {
        describe('with valid required category prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    category: {
                        url: mockCategory.url,
                        title: mockCategory.title,
                        imageUrl: mockCategory.imageUrl
                    }
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the title', () => {
                const { button } = selectors;

                expect(wrapper.find(button).exists()).to.be.true;
            });

            it('renders the value of the title prop to the correct location', () => {
                const { button } = selectors;

                expect(wrapper.find(button).text()).to.contain(testProps.category.title);
            });

            it('renders the link url attribute to the correct location', () => {
                const { link } = selectors;

                expect(wrapper.find(link).prop('href')).to.contain(testProps.category.url);
            });

            it('renders a ResponsiveImage with the correct props', () => {
                expect(wrapper.find(ResponsiveImageStub).props()).to.deep.eq({
                    sizes: {
                        s: { w: 690, h: 460 },
                        m: { w: 510, h: 340 },
                        l: { w: 682, h: 456 },
                        xl: { w: 632, h: 422 }
                    },
                    alt: testProps.category.title,
                    url: testProps.category.imageUrl,
                    ClassName: 'directory-category-item__image',
                    scale: imageResizeMock.scale.BOTH,
                    anchor: imageResizeMock.anchor.MC,
                    mode: imageResizeMock.mode.CROP,
                    breakpoints: breakpointsMock,
                    imageQuality: 75
                });
            });
        });

        describe('with partially valid required category prop', () => {
            describe('with missing category url prop', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({
                        category: {
                            url: null,
                            title: mockCategory.title,
                            imageUrl: mockCategory.imageUrl
                        }
                    });
                });

                it('does not render the component', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });

            describe('with missing category title prop', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({
                        category: {
                            url: mockCategory.url,
                            title: null,
                            imageUrl: mockCategory.imageUrl
                        }
                    });
                });

                it('does not render the component', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });

            describe('with missing category imageUrl prop', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper({
                        category: {
                            url: mockCategory.url,
                            title: mockCategory.title,
                            imageUrl: null
                        }
                    });
                });

                it('does not render the component', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });
        });

        describe('with missing required category prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    category: null
                });
            });

            it('does not render the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });
    });
});
