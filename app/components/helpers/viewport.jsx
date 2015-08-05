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

export default (Component) => class extends React.Component {
    constructor(props) {
        super(props);
        let viewport = {width: 320, height: 568};
        if (canUseDOM) viewport = this.getViewport();
        this.state = {viewport: viewport};
    }

    componentDidMount() {
        this.debouncedOnResize = debounce(() => {
            this.onResize();
        }, 500);
        window.addEventListener('resize', this.debouncedOnResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedOnResize, false);
    }

    getViewport() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    onResize() {
        const viewport = this.getViewport();
        if (this.state.viewport.width !== viewport.width ||
            this.state.viewport.height !== viewport.height) {
            this.setState({viewport: viewport});
        }
    }

    render() {
        return <Component {...this.props} viewport={this.state.viewport} />;
    }
};
