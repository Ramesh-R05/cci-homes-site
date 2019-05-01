import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const ProductCardStub = Context.createStubComponent();
const ProductStub = Context.createStubComponent();
const SectionWrapperStub = Context.createStubComponentWithChildren();

const ProductSection = proxyquire('../../../../app/components/listings/sections/productSection', {
    '../components/productCard': ProductCardStub,
    '../components/sectionWrapper': SectionWrapperStub
});

const TestWrapper = new ShallowWrapperFactory(ProductSection);

describe('ProductSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let productWrapper;
            let titleRow;
            let titleColumn;
            let productsRow;
            let productCardColumn;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    businessName: listingMock.businessName,
                    products: listingMock.products
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                productWrapper = wrapper.find(ProductStub);
                titleRow = sectionWrapper.childAt(0);
                titleColumn = titleRow.childAt(0);
                productsRow = sectionWrapper.childAt(1);
                productCardColumn = productsRow.childAt(0);
            });

            it('renders the SectionWrapper component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('sets the correct section class on the SectionWrapper component', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('product-section');
            });

            it('renders the title row inside of the SectionWrapper with the correct classes', () => {
                expect(titleRow.prop('className')).to.eq('row product-section__title-row');
            });

            it('renders the title column within the title row with the correct classes', () => {
                expect(titleColumn.prop('className')).to.eq('columns small-12 product-section__title-column');
            });

            it('renders the product card column within the products row with the correct classes', () => {
                expect(productCardColumn.prop('className')).to.eq('columns small-12 medium-6 xlarge-3 product-section__product-column');
            });

            it('renders each productCard component with correct props inside the product card column', () => {
                productWrapper.forEach((product, i) => {
                    expect(product.find(ProductCardStub).props()).to.deep.eq({
                        url: listingMock.products[i].url,
                        name: listingMock.products[i].name,
                        image: listingMock.products[i].image
                    });
                });
            });
        });
    });
});
