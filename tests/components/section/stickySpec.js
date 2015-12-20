import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const BreakpointsMock = {
    smallRangeMin: '0',
    smallRangeMax: '690px',
    mediumRangeMin: '691px',
    mediumRangeMax: '1023px'
};
const EnvironmentMock = { canUseDOM: true };
const AnimationFramePolyfillMock = { requestAnimationFrame: () => {} }

const proxyquire = require('proxyquire').noCallThru();
const RafStub = Context.createStubComponentWithChildren();
const Sticky = proxyquire('../../../app/components/section/sticky', {
    'react': React,
    'exenv': EnvironmentMock,
    '../../breakpoints': BreakpointsMock,
    '@bxm/ui/lib/common/requestAnimationFramePolyfill': AnimationFramePolyfillMock
});

describe('Sticky Block', () => {
    let reactModule;
    let domElement;

    afterEach(Context.cleanup);

    describe('Given the component has no children', () => {
        beforeEach( () => {
            reactModule = TestUtils.renderIntoDocument(
                <Sticky />
            );
            domElement = ReactDOM.findDOMNode(reactModule);
        });

        it(`should render the component`, () => {
            expect(domElement).to.exist;
            expect(domElement.querySelector('.carriage')).to.exist;
        });
    });

    describe('Given component has children', () => {
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        let childComponent;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Sticky>
                    <ChildrenComponentStub />
                </Sticky>
            );

            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(ReactDOM.findDOMNode(childComponent)).to.exist;
        });
    });

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

    describe('Given user scrolls the page', () => {
        let checkBreakpointsStub;
        let getCarriagePositionStub;
        let setStateSpy;

        let carriagePosition = {
            position: 'absolute',
            width: 300
        }

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Sticky breakpoints={['xlarge']} />
            );

            checkBreakpointsStub = sinon.stub(reactModule, 'isWithinBreakpoints').returns(true);
            getCarriagePositionStub = sinon.stub(reactModule, 'getCarriagePosition').returns(carriagePosition);

            setStateSpy = sinon.spy(reactModule, 'setState');

            domElement = ReactDOM.findDOMNode(reactModule);

            scrollTo(1);
        });

        after( () => {
            checkBreakpointsStub.restore();
            getCarriagePositionStub.restore();
            setStateSpy.restore();
        });

        it(`should call 'isWithinBreakpoints' method`, () => {
            expect(checkBreakpointsStub).to.have.been.called;
        });

        it(`should call 'getCarriagePosition' method`, () => {
           expect(getCarriagePositionStub).to.have.been.called;
        });

        it('only calls setState() if the state should change', () => {
            scrollTo(2);
            expect(setStateSpy).to.have.been.called;
        });

        describe('And it goes pass the top sticking point', () => {
            before( () => {
                carriagePosition = {
                    position: 'fixed',
                    width: 300
                };

                reactModule = TestUtils.renderIntoDocument(
                    <Sticky breakpoints={['xlarge']} carriageYPosition={150} />
                );
            });

            it('should fix the content', () => {
                reactModule.state.containerTopEdgeYOffset = 100;

                expect(reactModule.getCarriagePosition().position).to.equal('fixed');
            });
        });

        describe('And it goes less than or over the max sticking point', () => {
            before( () => {
                carriagePosition = {
                    position: 'absolute'
                };

                reactModule = TestUtils.renderIntoDocument(
                    <Sticky breakpoints={['xlarge']} carriageYPosition={150} />
                );
            });

            it('should not fix the content', () => {
                reactModule.state.containerTopEdgeYOffset = 200;

                expect(reactModule.getCarriagePosition().position).to.equal('absolute');
            });
        });
    });

    describe('Given current screen width is outside the desired breakpoint', () => {
        let getCarriagePositionStub;
        let setStateSpy;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Sticky breakpoints={['xlarge']} />
            );

            setStateSpy = sinon.spy(reactModule, 'setState');
            getCarriagePositionStub = sinon.stub(reactModule, 'getCarriagePosition')

            domElement = ReactDOM.findDOMNode(reactModule);
            resizeTo(768);
        });

        after( () => {
            setStateSpy.restore();
        });

        it('should only change the state once during resizing', () => {
            expect(setStateSpy).to.have.been.calledOnce;
        });

        it(`should NOT call 'getCarriagePosition' method`, () => {
            scrollTo(100);
           expect(getCarriagePositionStub).to.not.have.been.called;
        });

        it('should not fix the content', () => {
            expect(domElement.querySelector('.carriage').getAttribute('style')).to.be.null;
        });
    });

    describe('Given user resizes the page', () => {
        let setStateSpy;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Sticky breakpoints={['xlarge']} />
            );

            setStateSpy = sinon.spy(reactModule, 'setState');

            domElement = ReactDOM.findDOMNode(reactModule);
        });

        after( () => {
            setStateSpy.restore();
        });

        it('only calls setState() if the state should change', () => {
            resizeTo(768);

            expect(setStateSpy).to.have.been.called;
        });
    });
});
