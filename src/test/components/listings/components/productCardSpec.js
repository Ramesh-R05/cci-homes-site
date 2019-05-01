import ProductCard from '../../../../app/components/listings/components/productCard';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

const selectors = {
    root: '.product-card',
    name: '.product-card__name',
    imageWrapper: '.product-card__image-wrapper',
    image: '.product-card__image',
    button: '.product-card__button'
};

const TestWrapper = new ShallowWrapperFactory(ProductCard);

describe('ProductCard component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    url: listingMock.products[0].url,
                    name: listingMock.products[0].name,
                    image: listingMock.products[0].image
                });
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the product name', () => {
                const { name } = selectors;

                expect(wrapper.find(name).exists()).to.be.true;
            });

            it('renders the value of the name prop to the correct location', () => {
                const { name } = selectors;

                expect(wrapper.find(name).text()).to.contain(testProps.name);
            });

            it('renders the button', () => {
                const { button } = selectors;

                expect(wrapper.find(button).exists()).to.be.true;
            });

            it('renders the value of the url prop to the correct location', () => {
                const { button } = selectors;

                expect(
                    wrapper
                        .find(button)
                        .at(0)
                        .props().href
                ).to.contain(testProps.url);
            });

            it('renders the image wrapper', () => {
                const { imageWrapper } = selectors;

                expect(wrapper.find(imageWrapper).exists()).to.be.true;
            });
        });
    });
});
