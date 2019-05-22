import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';

noCallThru();

const Context = betterMockComponentContext();

const GenericSectionStub = Context.createStubComponentWithChildren();

const { NavigationTagSection } = proxyquire('../../../../app/components/section/navigationTag/section', {
    '../section': GenericSectionStub
});

const TestWrapper = new ShallowWrapperFactory(NavigationTagSection);

describe('NavigationTagSection', () => {
    let wrapper;
    let testProps;

    before(() => {
        [wrapper, testProps] = TestWrapper({
            articles: [{ article: '1' }, { article: '2' }],
            content: { valiue: 'something' },
            hero: { item: 'something' },
            galleries: ['gallery 1', 'gallery 2', 'gallery 3']
        });
    });

    it('should pass all props through to the GenericSection component', () => {
        expect(wrapper.find(GenericSectionStub).props()).to.deep.eq({ ...testProps });
    });
});
