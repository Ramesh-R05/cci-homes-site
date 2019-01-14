import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;
const Uniheader = proxyquire('../../../app/components/header/uniheader', {
    react: React
});

const brandDataStub = {
    uniheader: [
        {
            imageUrl: '/assets/svgs/belle.svg',
            url: '/belle/',
            title: 'Belle',
            id: 'belle'
        },
        {
            imageUrl: '/assets/svgs/realliving_black.svg',
            url: '/real-living/',
            title: 'real living',
            id: 'realliving'
        },
        {
            imageUrl: '/assets/svgs/housegarden.svg',
            url: '/australian-house-and-garden/',
            title: 'Australian House and Garden',
            id: 'houseandgarden'
        }
    ]
};

const TestWrapper = new ShallowWrapperFactory(Uniheader, {}, { config: { brands: brandDataStub } });

describe('Uniheader component', () => {
    describe('rendering', () => {
        let wrapper;
        let testContext;

        before(() => {
            [wrapper, , testContext] = TestWrapper();
        });

        it('should render the component', () => {
            expect(wrapper.find('.uniheader').exists()).to.be.true;
        });

        it('should load an image for each brand in the config', () => {
            const image = wrapper.find('img');
            expect(image.length).to.equal(testContext.config.brands.uniheader.length);
        });

        it('should apply the correct url to anchor', () => {
            const anchors = wrapper.find('a');

            anchors.forEach((anchor, index) => {
                expect(anchor.props().href).to.eq(testContext.config.brands.uniheader[index].url);
            });
        });

        it('should apply the correct gtm class to anchor', () => {
            const anchors = wrapper.find('a');

            anchors.forEach((anchor, index) => {
                expect(anchor.props().className).to.eq(`gtm-uniheader-${testContext.config.brands.uniheader[index].id}`);
            });
        });
    });
});
