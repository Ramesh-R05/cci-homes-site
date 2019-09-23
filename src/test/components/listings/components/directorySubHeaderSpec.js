import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const BreadCrumbsMock = Context.createStubComponent();
const ListingNavWrapperNav = Context.createStubComponent();

const DirectorySubHeader = proxyquire('../../../../app/components/listings/components/directorySubHeader', {
    './breadCrumbs': BreadCrumbsMock,
    './listingNavWrapper': ListingNavWrapperNav
}).default;

const TestWrapper = new ShallowWrapperFactory(DirectorySubHeader);

describe('Directory Sub Header Component', () => {
    describe('Given a node type that is not in listingNodeTypes', () => {
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                content: {
                    nodeType: 'test-node',
                    breadcrumbs: [
                        {
                            title: 'directory',
                            url: '/directory'
                        },
                        {
                            title: 'Artist & Galleries',
                            url: '/artist-and-galleries'
                        }
                    ],
                    businessName: 'test-business'
                }
            });
        });

        it('class is directory-sub-header', () => {
            expect(wrapper.hasClass('directory-sub-header')).to.be.true;
        });

        it('has one child', () => {
            expect(wrapper.children()).to.have.lengthOf(1);
        });

        it('the first child is a BreadCrumbs', () => {
            expect(wrapper.find(BreadCrumbsMock)).to.have.length(1);
        });

        it('the breadcrumbs prop links matches provided', () => {
            expect(wrapper.find(BreadCrumbsMock).prop('links')).to.deep.equal([testProps.content.breadcrumbs[0]]);
        });
    });

    describe('Given a node type that is not in listingNodeTypes', () => {
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                content: {
                    nodeType: 'StandardListing',
                    breadcrumbs: [
                        {
                            title: 'directory',
                            url: '/directory'
                        },
                        {
                            title: 'Artist & Galleries',
                            url: '/artist-and-galleries'
                        }
                    ],
                    businessName: 'test-business'
                }
            });
        });

        it('class is directory-sub-header', () => {
            expect(wrapper.hasClass('directory-sub-header')).to.be.true;
        });

        it('has two children', () => {
            expect(wrapper.children()).to.have.lengthOf(2);
        });

        it('the first child is a BreadCrumbs', () => {
            expect(wrapper.find(BreadCrumbsMock)).to.have.length(1);
        });

        it('the breadcrumbs prop links matches provided', () => {
            expect(wrapper.find(BreadCrumbsMock).prop('links')).to.equal(testProps.content.breadcrumbs);
        });

        it('the second child is a ListingNavWrapper', () => {
            expect(wrapper.find(ListingNavWrapperNav)).to.have.length(1);
        });

        it('the ListingNavWrapper prop type matches provided nodeType', () => {
            expect(wrapper.find(ListingNavWrapperNav).prop('type')).to.equal(testProps.content.nodeType);
        });

        it('the ListingNavWrapper prop businessName matches provided', () => {
            expect(wrapper.find(ListingNavWrapperNav).prop('businessName')).to.equal(testProps.content.businessName);
        });
    });
});
