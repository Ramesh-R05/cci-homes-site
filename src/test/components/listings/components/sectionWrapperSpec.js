import { betterMockComponentContext } from '@bxm/flux';
import SectionWrapper from '../../../../app/components/listings/components/sectionWrapper';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';

const Context = betterMockComponentContext();

const { React } = Context;

const selectors = {
    root: '.listing-section',
    greyBackground: 'listing-section--grey',
    topBorder: 'listing-section--top-border',
    container: '.container'
};

const TestWrapper = new ShallowWrapperFactory(SectionWrapper);

describe('SectionWrapper component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();

                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render without sectionClass', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.false;
            });
        });

        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        sectionClass: 'test-listing-section'
                    },
                    null,
                    <div>test child component</div>
                );
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('applies the section class to the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).prop('className')).to.include(testProps.sectionClass);
            });

            it('adapts the container class based on the section class prop', () => {
                const { container } = selectors;
                const sectionContainerClass = `${testProps.sectionClass}__container`;

                expect(wrapper.find(container).prop('className')).to.include(sectionContainerClass);
            });

            it('renders the children as a child of the container div', () => {
                const { container } = selectors;
                const childrenTextContent = testProps.children.props.children;

                expect(
                    wrapper
                        .find(container)
                        .children()
                        .text()
                ).to.eq(childrenTextContent);
            });
        });

        describe('with hasGreyBackground prop', () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper(
                    {
                        sectionClass: 'test-listing-section',
                        hasGreyBackground: true
                    },
                    null,
                    <div>test child component</div>
                );
            });

            it('renders the component', () => {
                const { root } = selectors;

                expect(wrapper.find(root).exists()).to.be.true;
            });

            it('applies the grey-background modifier class to the root section element', () => {
                const { root, greyBackground } = selectors;

                expect(wrapper.find(root).prop('className')).to.include(greyBackground);
            });
        });

        describe('with invalid props', () => {
            describe('sectionClass not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();

                    [wrapper] = TestWrapper();
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render without sectionClass', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });
            describe('children not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();

                    [wrapper] = TestWrapper();
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render without sectionClass', () => {
                    const { root } = selectors;

                    expect(wrapper.find(root).exists()).to.be.false;
                });
            });
        });
    });
});
