import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const DirectorySubHeaderMock = Context.createStubComponent();
const SiteHeaderMock = Context.createStubComponent();

const DirectoryHeader = proxyquire('../../../../app/components/listings/components/DirectoryHeader', {
    '@bxm/site-header': SiteHeaderMock,
    './directorySubHeader': DirectorySubHeaderMock
}).default;

const TestWrapper = new ShallowWrapperFactory(DirectoryHeader);

describe('Directory Header', () => {
    describe('Given no node type', () => {
        const props = {
            content: {}
        };
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper(props);
        });

        it('will render isExpanded as false', () => {
            expect(wrapper.prop('isExpanded')).to.be.false;
        });

        it('will render headerThemeClassName as header--directory-header', () => {
            expect(wrapper.prop('headerThemeClassName')).to.equal('header__inner--directory-header');
        });

        it('will render SubHeaderComponent as the stub component', () => {
            expect(wrapper.prop('SubHeaderComponent')).to.equal(DirectorySubHeaderMock);
        });

        it('will render subHeaderComponentProps as equal to props', () => {
            expect(wrapper.prop('subHeaderComponentProps')).to.deep.equal(props);
        });

        it('will render showNav as undefined', () => {
            expect(wrapper.prop('showNav')).to.equal(undefined);
        });
    });

    describe('Given a node type that is not in listingNodeTypes', () => {
        const props = {
            content: {
                nodeType: 'TEST'
            }
        };
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper(props);
        });

        it('will render subHeaderComponentProps as equal to props', () => {
            expect(wrapper.prop('subHeaderComponentProps')).to.deep.equal(props);
        });

        it('will render showNav as undefined', () => {
            expect(wrapper.prop('showNav')).to.be.true;
        });
    });

    describe('Given a node type that is in listingNodeTypes', () => {
        const props = {
            content: {
                nodeType: 'StandardListing'
            }
        };
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper(props);
        });

        it('will render subHeaderComponentProps as equal to props', () => {
            expect(wrapper.prop('subHeaderComponentProps')).to.deep.equal(props);
        });

        it('will render showNav as undefined', () => {
            expect(wrapper.prop('showNav')).to.be.false;
        });
    });
});
