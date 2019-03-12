import React from 'react';
import TestWrapperFactory from '../../utils/ShallowWrapperFactory';
import FooterColumn from '../../../app/components/site-footer/footerColumn';
import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';

const TestWrapper = TestWrapperFactory(FooterColumn);

describe('FooterColumn', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(restoreErrors);

            it('does not render', () => {
                expect(wrapper.find('.footer-column').exists()).to.be.false;
            });
        });

        describe('with valid props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        titleText: 'footer column heading',
                        classModifier: 'test-element',
                        spanSmall: 12,
                        spanMedium: 4,
                        spanLarge: 6,
                        spanxLarge: 8
                    },
                    null,
                    [<div>A child element</div>]
                );
            });

            it('renders', () => {
                expect(wrapper.find('.footer-column').exists()).to.be.true;
            });

            it('applies the modifier class', () => {
                expect(wrapper.props().className).to.include(`footer-column--${testProps.classModifier}`);
            });

            it('renders the heading', () => {
                expect(wrapper.find('.footer-column__title').exists()).to.be.true;
            });

            it('sets the heading text to the value of the titleText prop', () => {
                expect(wrapper.find('.footer-column__title').text()).to.eq(testProps.titleText);
            });

            it('applies the grid class based on the spanSmall prop', () => {
                expect(wrapper.props().className).to.include(`small-${testProps.spanSmall}`);
            });

            it('applies the grid class based on the spanMedium prop', () => {
                expect(wrapper.props().className).to.include(`medium-${testProps.spanMedium}`);
            });

            it('applies the grid class based on the spanLarge prop', () => {
                expect(wrapper.props().className).to.include(`large-${testProps.spanLarge}`);
            });

            it('applies the grid class based on the spanxLarge prop', () => {
                expect(wrapper.props().className).to.include(`xLarge-${testProps.spanxLarge}`);
            });

            it('renders the children wrapped in the inner div', () => {
                expect(wrapper.find('.footer-column__inner').children()).to.have.length(testProps.children.length);
            });
        });

        describe('with invalid props', () => {
            describe('children prop not passed', () => {
                let wrapper;

                before(() => {
                    filterErrors();
                    [wrapper] = TestWrapper();
                });

                after(restoreErrors);

                it('does not render', () => {
                    expect(wrapper.find('.footer-column').exists()).to.be.false;
                });
            });
        });

        describe('with renderChildrenInList prop passed', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper(
                    {
                        titleText: 'footer column with list',
                        renderChildrenInList: true
                    },
                    null,
                    [<li>A list item</li>, <li>A list item</li>, <li>A list item</li>, <li>A list item</li>]
                );
            });

            it('renders', () => {
                expect(wrapper.find('.footer-column').exists()).to.be.true;
            });

            it('wraps the children in a <ul/>', () => {
                expect(wrapper.find('.footer-column__list').children()).to.have.length(testProps.children.length);
            });
        });

        describe('without the titleText prop and with children', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({}, null, [<div>A child element</div>]);
            });

            it('renders', () => {
                expect(wrapper.find('.footer-column').exists()).to.be.true;
            });

            it('does not render the title', () => {
                expect(wrapper.find('.footer-column__title').exists()).to.be.false;
            });
        });
    });
});
