import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';
import proxyquire, { noCallThru } from 'proxyquire';
import { shallow } from 'enzyme';

noCallThru();

const Context = betterMockComponentContext();
const { React } = Context;

const BrandLinkStub = Context.createStubComponentWithChildren();

const Source = proxyquire('../../../app/components/article/source', {
    '../brand/link': BrandLinkStub
}).default;

const config = {
    get: sinon.stub(),
    article: {
        sources: {
            belle: {
                logo: 'belle.svg'
            },
            'real living': {
                logo: 'real-living.svg'
            },
            'australian house and garden': {
                logo: 'australian-house-and-garden.svg'
            },
            'homes+': {
                logo: 'homes.svg'
            },
            'homes to love': {
                logo: 'homes-to-love.svg'
            }
        }
    }
};

const TestWrapper = new ShallowWrapperFactory(Source, {}, { config });

describe(`Source Component`, () => {
    describe(`when passing all props`, () => {
        let wrapper;
        let testProps;
        const configReturnValue = config.article.sources['australian house and garden'].logo;

        before(`rendering component`, () => {
            config.get.returns(configReturnValue);

            [wrapper, testProps] = TestWrapper({
                source: 'Australian House and Garden'
            });
        });

        after(() => {
            config.get.reset();
        });

        it(`should render the component`, () => {
            expect(wrapper.find('.article__source').exists()).to.be.true;
        });

        it(`should render the <BrandLink>'`, () => {
            expect(wrapper.find(BrandLinkStub).exists()).to.be.true;
        });

        it('should pass the correct props to the <BrandLink>', () => {
            expect(wrapper.find(BrandLinkStub).props().source).to.eq(testProps.source);
        });

        it('should render the brand logo image as a child of <BrandLink> with correct props passed', () => {
            const expectedProps = {
                src: `/assets/images/source/${configReturnValue}`,
                alt: testProps.source
            };

            const brandLink = wrapper.find(BrandLinkStub);
            expect(brandLink.find('img').props()).to.deep.eq(expectedProps);
        });
    });

    describe('when source is unknown', () => {
        let wrapper;

        before(() => {
            config.get.returns(false);

            [wrapper] = TestWrapper({
                source: 'not a source'
            });
        });

        it(`should not render`, () => {
            expect(wrapper.find('.article__source').exists()).to.be.false;
        });
    });

    describe(`when passing no props`, () => {
        let wrapper;

        before(() => {
            filterErrors();
            [wrapper] = TestWrapper();
        });

        after(() => {
            restoreErrors();
        });

        it(`should not render`, () => {
            expect(wrapper.find('.article__source').exists()).to.be.false;
        });
    });
});
