import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();

const reactInlinesvgMock = Context.createStubComponent();

const breadCrumbs = proxyquire('../../../../app/components/listings/components/breadCrumbs', {
    'react-inlinesvg': reactInlinesvgMock
}).default;

const TestWrapper = new ShallowWrapperFactory(breadCrumbs);

describe('BreadCrumbs component', () => {
    describe('Given one links', () => {
        const props = {
            links: [
                {
                    title: 'directory',
                    url: '/directory'
                }
            ]
        };
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper(props);
        });

        it('there to be one link', () => {
            expect(wrapper.find('.directory-breadcrumbs__link')).to.have.lengthOf(1);
        });

        it('the first breadcrumb will link to the first provided link ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .first()
                    .prop('href')
            ).to.equal(props.links[0].url);
        });

        it('the first breadcrumb will contain a HomeIcon ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .first()
                    .childAt(0)
                    .name()
            ).to.equal('HomeIcon');
        });
    });

    describe('Given two links', () => {
        const props = {
            links: [
                {
                    title: 'directory',
                    url: '/directory'
                },
                {
                    title: 'Artist & Galleries',
                    url: '/artist-and-galleries'
                }
            ]
        };
        let wrapper, testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper(props);
        });

        it('there to be two links', () => {
            expect(wrapper.find('.directory-breadcrumbs__link')).to.have.lengthOf(2);
        });

        it('the first breadcrumb will link to the first provided link ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .first()
                    .prop('href')
            ).to.equal(props.links[0].url);
        });

        it('the first breadcrumb will contain a HomeIcon ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .first()
                    .childAt(0)
                    .name()
            ).to.equal('HomeIcon');
        });

        it('the second breadcrumb will link to the second provided link ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .at(1)
                    .prop('href')
            ).to.equal(props.links[1].url);
        });

        it('the second breadcrumb will contain a HomeIcon ', () => {
            expect(
                wrapper
                    .find('.directory-breadcrumbs__link')
                    .at(1)
                    .text()
            ).to.equal(props.links[1].title);
        });
    });
});
