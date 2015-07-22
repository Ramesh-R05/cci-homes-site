import React, {Component} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import breakpoints from '../../breakpoints';
import cloneDeep from 'lodash/lang/cloneDeep';
import isEqual from 'lodash/lang/isEqual';
import isFunction from 'lodash/lang/isFunction';
import each from 'lodash/collection/each';
import find from 'lodash/collection/find';

/// ---------------------------------------------------------------------------- Event callbacks

const SCROLL_EVENTS = 'DOMMouseScroll keyup keydown mousewheel scroll touchmove'.split(/\s+/);

function scrollSubscribe(fn) {
    SCROLL_EVENTS.forEach(e => window.addEventListener(e, fn, false));
}

function scrollUnsubscribe(fn) {
    SCROLL_EVENTS.forEach(e => window.removeEventListener(e, fn, false));
}

function resizeSubscribe(fn) {
    window.addEventListener('resize', fn, false);
}

function resizeUnsubscribe(fn) {
    window.removeEventListener('resize', fn, false);
}

/// ---------------------------------------------------------------------------- HOC definition

export default (SubComponent, config) => class extends Component {
    constructor(props) {
        super(props);
        this.digestConfig(props);
    }

    digestConfig(props) {
        if (!canUseDOM) {
            this.state = { pinned: false };
            return;
        }

        if (isFunction(config)) {
            this.config = cloneDeep(config(props));
        } else if (!this.config) {
            this.config = cloneDeep(config);
        } else {
            return;
        }

        each(this.config, (value, key) => {
            value.viewportRangeMin = parseInt(breakpoints[`${key}RangeMin`], 10);
            value.viewportRangeMax = parseInt(breakpoints[`${key}RangeMax`], 10);
        });

        this.updateViewportSize();
    }

    componentWillReceiveProps(nextProps) {
        this.digestConfig(nextProps);
    }

    componentDidMount() {
        scrollSubscribe(this.updateStickState);
        resizeSubscribe(this.updateViewportSize);
    }

    componentWillUnmount() {
        scrollUnsubscribe(this.updateStickState);
        resizeUnsubscribe(this.updateViewportSize);
    }

    updateViewportSize = () => {
        const viewportConfig = find(this.config, (value) => {
            return window.innerWidth >= value.viewportRangeMin &&
                window.innerWidth <= value.viewportRangeMax;
        });

        if (viewportConfig) {
            this.pinPoint = viewportConfig.pinPoint;
            this.pinOffset = viewportConfig.pinOffset || 0;
            this.updateStickState();
        }
    };

    updateStickState = () => {
        let newState;
        if (window.pageYOffset < this.pinPoint) {
            newState = { pinned: false, pinOffset: this.pinOffset };
        } else {
            newState = { pinned: true, pinOffset: this.pinOffset };
        }

        if (!isEqual(this.state, newState)) {
            if (this.state) {
                this.setState(newState);
            } else {
                this.state = newState;
            }
        }
    };

    render() {
        return (
            <SubComponent
                {...this.props}
                pinned={this.state.pinned}
                pinOffset={this.state.pinOffset}
            />
        );
    }
};
