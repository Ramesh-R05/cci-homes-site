import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

const Context = betterMockComponentContext();
const { React } = Context;
noCallThru();

const Icon = proxyquire('../../../app/components/teaser/icon', {
    react: React
});

const TestWrapper = new ShallowWrapperFactory(Icon);

describe('TeaserIcon component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper();
            });

            it('does not render', () => {
                expect(wrapper.find('.teaser__icon').exists()).to.be.false;
            });
        });

        describe('with nodeType prop', () => {
            describe('set to gallery', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper({
                        icon: 'gallery'
                    });
                });

                it('renders the component', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.true;
                });

                it('renders the video icon', () => {
                    expect(wrapper.find('.icon-gallery').exists()).to.be.true;
                });
            });

            describe('set to video', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper({
                        icon: 'video'
                    });
                });

                it('renders the component', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.true;
                });

                it('renders the video icon', () => {
                    expect(wrapper.find('.icon-video').exists()).to.be.true;
                });
            });
        });

        describe('with video prop truthy', () => {
            let wrapper;

            before(() => {
                [wrapper] = TestWrapper({
                    video: {}
                });
            });

            it('renders the component', () => {
                expect(wrapper.find('.teaser__icon').exists()).to.be.true;
            });

            it('renders the video icon', () => {
                expect(wrapper.find('.icon-video').exists()).to.be.true;
            });
        });

        describe('with icon prop', () => {
            describe('set to gallery', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper({
                        icon: 'gallery'
                    });
                });

                it('renders the component', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.true;
                });

                it('renders the video icon', () => {
                    expect(wrapper.find('.icon-gallery').exists()).to.be.true;
                });
            });

            describe('set to video', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper({
                        icon: 'video'
                    });
                });

                it('renders the component', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.true;
                });

                it('renders the video icon', () => {
                    expect(wrapper.find('.icon-video').exists()).to.be.true;
                });
            });
        });

        describe('with invalid props', () => {
            describe('nodeType not passed', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper();
                });

                it('should not render', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.false;
                });
            });

            describe('nodeType unknown', () => {
                let wrapper;

                before(() => {
                    [wrapper] = TestWrapper({
                        nodeType: 'recipe'
                    });
                });

                it('should not render', () => {
                    expect(wrapper.find('.teaser__icon').exists()).to.be.false;
                });
            });
        });
    });
});
