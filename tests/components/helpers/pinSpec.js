import {betterMockComponentContext} from '@bxm/flux';
import React, {Component} from 'react';

const Context = betterMockComponentContext();
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const mockBreakpoints = {
    smallRangeMin: '0',
    smallRangeMax: '690px',
    mediumRangeMin: '691px',
    mediumRangeMax: '1023px'
};

const sandbox = sinon.sandbox.create();
const environmentMock = { canUseDOM: true };
const pin = proxyquire('../../../app/components/helpers/pin', {
    'react': React,
    'react/addons': React,
    'react/lib/ExecutionEnvironment': environmentMock,
    '../../breakpoints': mockBreakpoints
});

describe(`Pin Helper`, () => {
    let config;
    let props;
    let PinnedComponent;
    let reactModule;
    let subComponent;

    after(() => {
        sandbox.restore();
    });

    describe('client initialisation', () => {
        before(() => {
            config = { small: { pinPoint: 100, pinOffset: -10 } };
            props = { foo: 'bar' };
            environmentMock.canUseDOM = true;
            resizeTo(420);
            scrollTo(100);
            renderWithConfigAndProps(config, props);
        });

        it('sets the "pinned" prop of the sub-component', () => {
            expect(subComponent.props.pinned).to.be.true;
        });

        it('sets the "pinOffset" prop of the sub-component', () => {
            expect(subComponent.props.pinOffset).to.eq(-10);
        });

        it('passes other props down to the subcomponent', () => {
            expect(subComponent.props.foo).to.eq('bar');
        });
    });

    describe('server initialisation', () => {
        before(() => {
            config = { small: { pinPoint: 100, pinOffset: -10 } };
            props = { foo: 'bar' };
            environmentMock.canUseDOM = false;
            renderWithConfigAndProps(config, props);
        });

        it('sets the "pinned" prop of the sub-component to false', () => {
            expect(subComponent.props.pinned).to.be.false;
        });

        it('sets the "pinOffset" prop of the sub-component to undefined', () => {
            expect(subComponent.props.pinOffset).to.be.undefined;
        });

        it('passes other props down to the subcomponent', () => {
            expect(subComponent.props.foo).to.eq('bar');
        });
    });

    describe('initialise with config function', () => {
        let testModule;

        function configFn(props) {
            return props.isExpanded ? {
                small: { pinPoint: 100, pinOffset: -10 }
            } : {
                small: { pinPoint: 50, pinOffset: 0 }
            };
        }

        class TestableComponent extends Component {
            constructor(props) {
                super(props);
                this.state = { props };
            }

            render() {
                return <PinnedComponent {...this.state.props}/>;
            }
        }

        before(() => {
            environmentMock.canUseDOM = true;
            resizeTo(420);
            scrollTo(50);
            PinnedComponent = pin(SubComponent, configFn);
            testModule = Context.mountComponent(TestableComponent, { isExpanded: false });
            subComponent = TestUtils.scryRenderedComponentsWithType(testModule, SubComponent)[0];
        });

        it('uses the correct config on init', () => {
            expect(subComponent.props.pinned).to.be.true;
        });

        it('updates the config when props are updated', () => {
            testModule.setState({ props: { isExpanded: true }});
            expect(subComponent.props.pinned).to.be.false;
        });
    });

    describe('event cleanup', () => {
        let container;
        let setStateSpy;

        before(() => {
            container = document.createElement('div');
            config = { small: { pinPoint: 100, pinOffset: -10 } };
            PinnedComponent = pin(SubComponent, config);
            environmentMock.canUseDOM = true;
            resizeTo(420);
            scrollTo(0);

            reactModule = React.render(<PinnedComponent/>, container);
            setStateSpy = sandbox.spy(reactModule, 'setState');
        });

        after(() => {
            setStateSpy.restore();
        });

        it('cleans up event listeners on unmount', () => {
            React.unmountComponentAtNode(container);
            scrollTo(100);
            resizeTo(690);
            expect(setStateSpy).not.to.have.been.called;
        });
    });

    describe('scroll', () => {
        before(() => {
            config = { small: { pinPoint: 100, pinOffset: -10 } };
            props = { foo: 'bar' };
            environmentMock.canUseDOM = true;
            resizeTo(420);
            scrollTo(0);
            renderWithConfigAndProps(config, props);
        });

        it('activates pin when scrolled past the pin point', () => {
            scrollTo(100);
            expect(subComponent.props.pinned).to.be.true;
        });

        it('deactivates pin when scrolled before the pin point', () => {
            scrollTo(99);
            expect(subComponent.props.pinned).to.be.false;
        });

        it('only calls setState() if the pin state should change', () => {
            scrollTo(0);
            const setStateSpy = sandbox.spy(reactModule, 'setState');

            scrollTo(1);
            expect(setStateSpy).not.to.have.been.called;

            scrollTo(690);
            expect(setStateSpy).to.have.been.calledOnce;

            setStateSpy.restore();
        });
    });

    describe('viewport resize', () => {
        before(() => {
            config = {
                small: { pinPoint: 100, pinOffset: -10 },
                medium: { pinPoint: 200 }
            };
            props = { foo: 'bar' };
            environmentMock.canUseDOM = true;
            resizeTo(420);
            scrollTo(0);
            renderWithConfigAndProps(config, props);
        });

        it('changes pinOffset for different viewport sizes', () => {
            resizeTo(691);
            expect(subComponent.props.pinOffset).to.eq(0);

            resizeTo(420);
            expect(subComponent.props.pinOffset).to.eq(-10);
        });

        it('changes pin state if resize causes it', () => {
            // Start by resizing window to medium width and
            // and scroll down, but not far enough to enable
            // pin on medium
            resizeTo(691);
            scrollTo(150);
            expect(subComponent.props.pinned).to.be.false;

            // Finally resize to small. Should be pinned
            resizeTo(420);
            expect(subComponent.props.pinned).to.be.true;
        });
    });

    function renderWithConfigAndProps(config, props) {
        PinnedComponent = pin(SubComponent, config);
        reactModule = Context.mountComponent(PinnedComponent, props);
        subComponent = TestUtils.scryRenderedComponentsWithType(reactModule, SubComponent)[0];
    }

    function scrollTo(offset) {
        window.pageYOffset = offset;
        triggerEvent('scroll');
    }

    function resizeTo(width) {
        window.innerWidth = width;
        triggerEvent('resize');
    }

    function triggerEvent(type, data) {
        if (window._listeners && window._listeners[type]) {
            window._listeners[type][false].forEach(l => l.call(window, data));
        }
    }
});

class SubComponent extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return <div {...this.props}></div>;
    }
}
