import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';

class Application extends Component {

    static propTypes = {
        currentRoute: PropTypes.object
    };

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }

    render() {
        const Handler = this.props.currentRoute.handler;
        const className = canUseDOM ? '' : 'no-js';
        return (
            <div className={className}>
                <Handler />
            </div>
        );
    }
}

export default provideContext(handleHistory(Application), {
    config: PropTypes.object
});
