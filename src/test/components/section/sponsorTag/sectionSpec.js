import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const GenericSectionStub = Context.createStubComponentWithChildren();

const { SponsorTagSection } = proxyquire('../../../../app/components/section/sponsorTag/section', {
    '../section': GenericSectionStub
});

const TestWrapper = new ShallowWrapperFactory(SponsorTagSection);

describe('SponsorTagSection', () => {
    let wrapper;
    let testProps;

    before(() => {
        [wrapper, testProps] = TestWrapper({
            articles: [{ article: '1' }, { article: '2' }],
            content: { value: 'sponsor' }
        });
    });

    it('should pass all props through to the GenericSection component', () => {
        expect(wrapper.find(GenericSectionStub).props()).to.deep.eq({ ...testProps });
    });
});
