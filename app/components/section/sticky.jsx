import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import raf from '@bxm/ui/lib/common/requestAnimationFramePolyfill';
import {canUseDOM} from 'exenv';
import siteBreakpoints from '../../breakpoints';
import isEqual from 'lodash/lang/isEqual';
import forEach from 'lodash/collection/forEach';
import throttle from 'lodash/function/throttle';

class StickyBlock extends Component {
    constructor(...args) {
        super(...args);

        this.state = { carriagePosition: {} };
    }

    static propTypes = {
        breakpoints: PropTypes.array,
        carriageClasses: PropTypes.string,
        carriageYPosition: PropTypes.number,
        children: PropTypes.element,
        columnsCollapse: PropTypes.bool,
        columnGutterWidth: PropTypes.number,
        containerMarginBottom: PropTypes.number,
        containerClasses: PropTypes.string,
        pageYOffset: PropTypes.number
    }

    static defaultProps = {
        breakpoints: [],
        carriageClasses: '',
        carriageYPosition: 126,
        children: null,
        columnsCollapse: false, // works the same way as foundation $collapse
        columnGutterWidth: 30,
        containerMarginBottom: 0,
        containerClasses: '',
        pageYOffset: 75
    }

    getState = () => {
        if (!this.stickyBlock) {
            return {};
        }

        return {
            containerBottomEdgeYOffset: this.stickyBlock.getBoundingClientRect().bottom,
            containerTopEdgeYOffset: this.stickyBlock.getBoundingClientRect().top
        };
    }

    componentDidMount() {
        this.stickyBlock = ReactDOM.findDOMNode(this);
        this.carriage = ReactDOM.findDOMNode(this.refs.carriage);

        this.setState(this.getState());

        if (canUseDOM) {
            window.addEventListener('scroll', this.onScroll, false);

            this.throttledOnResize = throttle(() => {
                this.onResize();
            }, 250);
            window.addEventListener('resize', this.throttledOnResize, false);

            // fire the scroll event to ensure the carriage is visible if needed
            this.onScroll();
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            window.removeEventListener('scroll', this.onScroll, false);
            window.removeEventListener('resize', this.throttledOnResize, false);
        }
    }

    isWithinBreakpoints(breakpoints) {
        if (typeof window === 'undefined') {
            return false;
        }

        let isWithinBreakpoint = false;
        const viewportSize = window.innerWidth;

        if (siteBreakpoints) {
            breakpoints.forEach( (name) => {
                const breakpoint = {
                    min: parseInt(siteBreakpoints[name + 'RangeMin'], 10),
                    max: parseInt(siteBreakpoints[name + 'RangeMax'], 10)
                };

                if (viewportSize >= breakpoint.min && viewportSize <= breakpoint.max) {
                    isWithinBreakpoint = true;
                }
            });
        }
        return isWithinBreakpoint;
    }

    onScroll = () => {
        if (!canUseDOM || !this.isWithinBreakpoints(this.props.breakpoints)) {
            return false;
        }

        this.setState(this.getState());

        const newCarriagePosition = this.getCarriagePosition();

        // only update state if the carriage position has changed
        if (!isEqual(this.state.carriagePosition, newCarriagePosition)) {
            raf.requestAnimationFrame( () => {
                this.setState({carriagePosition: newCarriagePosition});
            });
        }
    }

    onResize = () => {
        let state = this.getState();
        state.windowWidth = window.innerWidth;

        this.setState(state);
    }

    /**
     * Get the height of the parent element
     *
     * @returns {string|number}
     */
    getParentHeight() {
        let parentHeight;

        if (!this.isWithinBreakpoints(this.props.breakpoints)) {
            parentHeight = 'auto';
        } else {
            parentHeight = this.getTallestSiblingHeight();
        }
        return parentHeight;
    }

    getContainerHeight() {
        let parentHeight = this.getParentHeight();

        if (isNaN(parentHeight)) {
            return this.props.containerMarginBottom;
        }

        return (parentHeight - this.props.containerMarginBottom);
    }

    getContainerWidth() {
        let stickyBlockWidth;

        if (!this.stickyBlock || !this.isWithinBreakpoints(this.props.breakpoints)) {
            return 'auto';
        }

        // optionally apply a columns collapse. works the same way as foundation grid-column($collapse:true)
        if (this.props.columnsCollapse) {
            stickyBlockWidth = this.stickyBlock.clientWidth;
        } else {
            stickyBlockWidth = (this.stickyBlock.clientWidth - this.props.columnGutterWidth);
        }

        return stickyBlockWidth;
    }

    /**
     * Get the height of the tallest sibling
     *
     * @returns {number}
     */
    getTallestSiblingHeight() {
        if (!this.stickyBlock || !this.stickyBlock.parentElement) {
            return null;
        }

        const parent = this.stickyBlock.parentElement;

        let tallestSiblingHeight = 0;

        forEach(parent.childNodes, (node) => {
            // ignore the height of the sticky block
            if (node.className.indexOf('sticky-block') > -1) {
                return true;
            }

            if (node.clientHeight > tallestSiblingHeight) {
                tallestSiblingHeight = node.clientHeight;
            }
        });

        return tallestSiblingHeight;
    }

    /**
     * Determine the top offset for the carriage within its parent container
     *
     * @returns {*}
     */
    getCarriagePosition() {
        const containerHeight = this.getContainerHeight();
        const carriageHeight = this.carriage.clientHeight;
        const hasGetComputedStyle = (canUseDOM && typeof window.getComputedStyle === 'function');

        let carriageStyle = {
            position: 'absolute',
            width: this.getContainerWidth()
        };

        // the yOffset the carriage should stick to in relation to the window
        const carriageStickingPoint = this.props.carriageYPosition;

        // the maximum offset that can be applied to the carriage
        const maximumContainerYOffset = -Math.abs((containerHeight - carriageHeight));

        // the yOffset of the top of the container in relation to the window
        const containerTopOffset = this.state.containerTopEdgeYOffset;

        let newCarriageTopOffset;

        if (containerTopOffset < carriageStickingPoint) {
            // scrollPos is greater than the sticking point and the carriage is sticky
            carriageStyle.position = 'fixed';
            newCarriageTopOffset = carriageStickingPoint;
        } else {
            carriageStyle.position = 'absolute';
            newCarriageTopOffset = 0;
        }

        // make sure the carriage doesn't leave its container
        if (containerTopOffset < 0 && (containerTopOffset - carriageStickingPoint) < maximumContainerYOffset) {
            carriageStyle.position = 'absolute';

            // fix for fixed width columns. prevents the carriage 'jumping' to the bottom position
            if (hasGetComputedStyle && getComputedStyle(this.stickyBlock).display === 'table-cell') {
                carriageStyle.bottom = this.props.containerMarginBottom + 'px';
            } else {
                carriageStyle.bottom = '0px';
            }
        } else {
            carriageStyle.top = newCarriageTopOffset + 'px';
        }

        return carriageStyle;
    }

    render() {
        const containerClasses = 'fixed-column fixed-column--sticky sticky-block ' + this.props.containerClasses;
        const containerHeight = this.getContainerHeight();

        const containerStyle = {
            height: containerHeight + 'px'
        };

        const carriageClasses = 'carriage ' + this.props.carriageClasses;
        const carriageStyle = this.state.carriagePosition;

        return (
            <div ref="stickyBlockContainer" className={containerClasses} style={containerStyle}>
                <div ref="carriage" className={carriageClasses} style={carriageStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default StickyBlock;
