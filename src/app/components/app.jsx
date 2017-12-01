import React, { Component, PropTypes } from 'react';
import { canUseDOM } from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import GoogleFont from './html/googleFont';
import DefaultTemplate from './templates/default';

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
        let Handler;
        if (this.props.currentRoute) {
            Handler = this.props.currentRoute.handler;
        } else {
            Handler = DefaultTemplate;
        }
        const className = canUseDOM ? '' : 'no-js';
        return (
            <div className={className}>
                <GoogleFont />
                <Handler
                    currentNavigateError={this.props.currentNavigateError}
                />
            </div>
        );
    }
}

export default provideContext(handleHistory(Application), {
    config: PropTypes.object
});
