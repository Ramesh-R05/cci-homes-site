/**
 * Usage:
 *
 import watchViewport from './watchViewport';

 class YourComponent extends Component {
...
    componentWillReceiveProps(nextProps) {
        if (this.props.viewport !== nextProps.viewport) {
            this.yourActions();
        }
    }
...
 }

 export default watchViewport(YourComponent);
 *
 */

import React from 'react';
import debounce from 'lodash/function/debounce';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

export default (Component, debounceInt = 500) => class extends React.Component {
    constructor(props) {
        super(props);
        let viewport = {width: 320, height: 568};
        if (canUseDOM) viewport = this.getViewport();
        this.state = viewport;
    }

    componentDidMount() {
        this.debouncedOnResize = debounce(() => {
            this.onResize();
        }, debounceInt);
        window.addEventListener('resize', this.debouncedOnResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedOnResize, false);
    }

    getViewport() {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }

    onResize() {
        const viewport = this.getViewport();
        if (this.state.width !== viewport.width ||
            this.state.height !== viewport.height) {
            this.setState(viewport);
        }
    }

    render() {
        return <Component {...this.props} viewportWidth={this.state.width} viewportHeight={this.state.height} />;
    }
};
