import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';
import { betterMockComponentContext } from '@bxm/flux';
import { TemplateRenderer } from '../../../app/components/templates/templateRenderer';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

const Context = betterMockComponentContext();

const TestWrapper = new ShallowWrapperFactory(TemplateRenderer);

describe('templateRenderer Component', () => {
    describe('with valid required props', () => {
        let wrapper;
        let testProps;

        before(() => {
            [wrapper, testProps] = TestWrapper({
                toggleSideMenu: sinon.stub(),
                menuClasses: 'menu--is-open',
                Template: Context.createStubComponent(),
                templateProps: {
                    content: 'foo'
                }
            });
        });

        it('renders the Template prop as the component', () => {
            expect(wrapper.find(testProps.Template).exists()).to.be.true;
        });

        it('passes the toggleMenu prop as the toggleMenu instance method to the Template ', () => {
            expect(wrapper.find(testProps.Template).prop('toggleMenu')).to.eq(wrapper.instance().toggleMenu);
        });

        it('passes the templateProps to the Template component', () => {
            expect(wrapper.find(testProps.Template).props()).to.include({ ...testProps.templateProps });
        });
    });
    describe('when Template prop is not a function', () => {
        let wrapper;

        before(() => {
            filterErrors();

            [wrapper] = TestWrapper({
                Template: {}
            });
        });

        after(() => {
            restoreErrors();
        });

        it('does not render', () => {
            expect(wrapper.isEmptyRender()).to.be.true;
        });
    });
});
