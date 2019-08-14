import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import categoriesMock from '../../../mock/listingCategories';

const selectors = {
    root: '.directory-home',
    listItem: '.directory-home__list-item'
};

const Context = betterMockComponentContext();
const DirectoryCategoryItemStub = Context.createStubComponent();

const DirectoryHome = proxyquire('../../../../app/components/listings/components/directoryHome', {
    './directoryCategoryItem': DirectoryCategoryItemStub
}).default;

const TestWrapper = new ShallowWrapperFactory(DirectoryHome);

describe('DirectoryHome component', () => {
    describe('rendering', () => {
        describe('with valid required content prop', () => {
            let wrapper;
            let testProps;
            let directoryCategoryItemWrapper;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    content: {
                        categories: categoriesMock
                    }
                });

                directoryCategoryItemWrapper = wrapper.find(DirectoryCategoryItemStub);
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('renders the category list rows with the correct classes', () => {
                const { listItem } = selectors;

                wrapper.find(listItem).forEach(item => {
                    expect(item.prop('className')).to.eq('directory-home__list-item small-12 medium-4 columns');
                });
            });

            it('renders each DirectoryCategoryItem component with correct props', () => {
                directoryCategoryItemWrapper.forEach((category, i) => {
                    expect(category.find(DirectoryCategoryItemStub).props()).to.deep.eq({
                        category: categoriesMock[i]
                    });
                });
            });
        });

        describe('with missing required content prop', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    content: null
                });
            });

            it('does not render the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });
    });
});
