/* eslint-disable */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import canUseDOM from 'exenv';
import { provideContext } from '@bxm/flux';
import { handleHistory } from 'fluxible-router';
import AdManager from '@bxm/ad/lib/google/components/adManager';
import GoogleFont from './html/googleFont';
import Error from './pages/error';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
        const _LTracker = [];
    }

    static contextTypes = {
        config: PropTypes.object
    };

    componentDidMount () {

        const { config } = this.context;
        const isLogglyEnabled = config.isFeatureEnabled('loggly');

        if (isLogglyEnabled) {
            this._LTracker = window._LTracker || [];
            this._LTracker.push({
                'logglyKey': config.features.loggly.token,
                'subDomain': config.features.loggly.subDomain,
                'sendConsoleErrors' : true,
                'tag' : config.features.loggly.tag,
                'useUtfEncoding': true
            });
        }
    }


    static getDerivedStateFromError(error) {
        this._LTracker.push({ 'text': 'app.js/HTL - an error has been thrown by derivedStateFromError and the fallback UI is getting rendered',
                              'error': error});

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this._LTracker.push({ 'text': 'app.js/HTL - an error has been thrown by componentDidCatch and the fallback UI is getting rendered',
                              'error': error,
                              'errorInfo': errorInfo});

        this.setState({ hasError: true });
    }


    render() {
        const { children } = this.props;

        if (this.state.hasError) {
            // Render fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}
class Application extends Component {
    static propTypes = {
        currentRoute: PropTypes.shape({
            handler: PropTypes.func
        }),
        pageTitle: PropTypes.string,
        currentNavigateError: PropTypes.object
    };

    static defaultProps = {
        currentRoute: null,
        pageTitle: null,
        currentNavigateError: null
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    componentDidMount() {
        const { getStore } = this.context;
        const emailLinkTrackingData = getStore('PageStore').getEmailLinkTrackingData();

        if (emailLinkTrackingData) {
            window.dataLayer.push(emailLinkTrackingData);
        }
    }

    componentDidUpdate(prevProps) {
        const { pageTitle } = this.props;

        if (pageTitle !== prevProps.pageTitle) {
            document.title = pageTitle;
        }
    }

    render() {
        const { currentRoute, currentNavigateError } = this.props;
        const Handler = currentRoute ? currentRoute.handler : Error;
        const className = canUseDOM ? '' : 'no-js';

        return (
            <ErrorBoundary>
                <div className={className}>
                    <GoogleFont />
                    <Handler currentNavigateError={currentNavigateError} currentUrl={currentRoute && currentRoute.url} />
                </div>
            </ErrorBoundary>
        );
    }
}

export default provideContext(handleHistory(AdManager(Application)), {
    config: PropTypes.object
});
